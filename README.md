# sublime-bemmet

> Sublime plugin to expand [bemmet](https://github.com/tadatuta/bemmet) abbreviation into [BEMJSON](https://en.bem.info/technology/bemjson/).

## Install

Install `bemmet` with [Package Control](https://sublime.wbond.net) and restart Sublime.

**You need to have [Node.js](http://nodejs.org) installed.**  
Make sure it's in your $PATH by running `node -v` in your command-line.  
On OS X you need to make sure it's in `/usr/local/bin` or symlink it there.

## Getting started

In a BEMJSON file, open the Command Palette *(Cmd+Shift+P)* and choose `Expand bemmet abbreviation`. You can alternatively create one or more selections before running the command to only expand those parts.

### Keyboard shortcut

You can set up a keyboard shortcut to run the command by opening up "Preferences > Key Bindings - User" and adding your shortcut with the `bemmet` command.

Example:

```json
[
	{ "keys": ["super+b"], "command": "bemmet" }
]
```

### Autoindentation after abbreviation expantion

If you want to automatically indent expanded code, you may just run `reindent` command after `bemmet`. To do so open `Tools` -> `Create plugin`, paste following code:
```python
import sublime, sublime_plugin

class bemmetAndReindentCommand(sublime_plugin.WindowCommand):
    def run(self):
        self.window.run_command("bemmet")
        self.window.run_command("reindent", {"single_line": false})
```
and then update a key binding to run `bemmet_and_reindent`:
```json
[
    { "keys": ["super+b"], "command": "bemmet_and_reindent" }
]
```

## License

MIT © [Vladimir Grinenko](https://github.com/tadatuta/)
