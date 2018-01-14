# Voice Commands

This is an extension that take basic voice commands. [Github💡](https://github.com/lanly-dev/VSCode-VoiceCommands-Extension)

## Features

Basic commands include:
* copy
* cut
* delete
* find
* format
* go to line
* hello world
* paste
* quick open
* redo
* search
* select all
* stop listen
* undo

## Extension Settings

None

## Requirements
Other than Window OS, this extension needs JRE to run

## Known Issues

Context menu could hold the commands' actions

## Release Notes

### 1.0.0
- Initial release of voice commands
- Development SDK and packages: dotnet core 1.0, .NET framework 4.6
- Compatible with Window OS only

### 2.0.0
- Development SDK and packages: donet core 2.0, .NET framework 4.7.1, Sphinx4 alpha5
- Now the extension is cross-platform thanks to [CMUSphinx Voice Recognition](https://cmusphinx.github.io/)
- Note that this extension still uses the built-in [Microsoft Speech Platform](https://msdn.microsoft.com/en-us/library/office/hh361572(v=office.14).aspx) if it use in Window OS
