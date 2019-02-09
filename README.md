# Voice Commands

[![Version](https://vsmarketplacebadge.apphb.com/version-short/lanly-dev.voice-commands.svg)](https://marketplace.visualstudio.com/items?itemName=lanly-dev.voice-commands)

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
Other than Windows, this extension needs JRE (JDK for MacOS) to run

## Known Issues
Context menu could hold the commands' actions

## Release Notes

### 2.1.0
- Bugfix - Windows OS wasn't using MSP
- Activate Voice Commands from the start, removed the old command activation
- Update project's dependencies

### 2.0.0, 2.0.1
- Development SDK and packages: donet core 2.0, .NET framework 4.7.1, Sphinx4 alpha5
- Now the extension is cross-platform thanks to [CMUSphinx Voice Recognition](https://cmusphinx.github.io/)
- Note that this extension still uses the built-in [Microsoft Speech Platform](https://msdn.microsoft.com/en-us/library/office/hh361572(v=office.14).aspx) if it use in Windows OS

### 1.0.0
- Initial release of voice commands
- Development SDK and packages: dotnet core 1.0, .NET framework 4.6
- Compatible with Windows OS only