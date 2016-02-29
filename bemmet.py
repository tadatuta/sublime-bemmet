import sublime
import sublime_plugin
import json
import re
from os.path import dirname, realpath, join

try:
	# Python 2
	from node_bridge import node_bridge
except:
	from .node_bridge import node_bridge

# monkeypatch `Region` to be iterable
sublime.Region.totuple = lambda self: (self.a, self.b)
sublime.Region.__iter__ = lambda self: self.totuple().__iter__()

BIN_PATH = join(sublime.packages_path(), dirname(realpath(__file__)), 'bemmet.js')

class bemmetCommand(sublime_plugin.TextCommand):
	def run(self, edit):
		if not self.has_selection():
			region = sublime.Region(0, self.view.sel()[0].begin())
			originalBuffer = self.get_abbr(self.view.substr(region).split('\n')[-1])
			region = sublime.Region(region.end() - len(originalBuffer), region.end())
			bemmeted = self.prefix(originalBuffer)
			self.view.sel().add(region)
			if bemmeted:
				self.view.run_command('insert_snippet', {'contents': bemmeted})
			return
		for region in self.view.sel():
			if region.empty():
				continue
			originalBuffer = self.view.substr(region)
			bemmeted = self.prefix(originalBuffer)
			if bemmeted:
				self.view.run_command('insert_snippet', {'contents': bemmeted})

	def prefix(self, data):
		try:
			return node_bridge(data, BIN_PATH)
		except Exception as e:
			sublime.error_message('bemmet\n%s' % e)

	def has_selection(self):
		for sel in self.view.sel():
			start, end = sel
			if start != end:
				return True
		return False

	def get_abbr(self, line):
		abbr = []
		braceCount = 0

		for s in line[::-1]:
			if s == '}':
				braceCount += 1

			if s == '{':
				braceCount -= 1

			if s == ' ' and not braceCount:
				break
			else:
				abbr.append(s)

		return ''.join(abbr[::-1])
