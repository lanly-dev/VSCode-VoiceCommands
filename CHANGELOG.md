# Change Log
All notable changes to the "voice-commands" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [2.1.2] - February 2020
### Changed
- Use Webpack
- tslint to eslint
- 13 files, 35.22MB, 1.42.0

## [2.1.1] - Sep 2019
### Changed
- Change to off mode when activate rather than listen right away
- Set MSP targets to .NET 4.5
- [New icon](icon/voicecmd3.png)
- 10 files, 35.12MB, 1.38.0

## [2.1.0] - Feb 2019
### Changed
- Extension activates from the start instead by typing VS Code command
### Fixed
- Windows OS uses MSP as of now
- 9 files, 35.15MB, 1.18.0

## [2.0.0, 2.0.1] - Jan 2018
### Added
- Cross-platform:
  - Windows OS still uses built-in Speech library.
  - Other OS uses JRE to run the CMUSphinx open source speech recognition.
- New commands: delete, stop listen, format.
- [New icon](icon/voicecmd2.png)
- 9 files, 35.15MB, 1.18.0

## [1.0.0] - Jan 2017
### Added
- Commands include: copy, cut, find, go to line, hello world, paste, quick open, redo, search, select all, and undo.
- "hello world" command has no action.
- Uses Microsoft Speech Platform.
- [Icon](icon/voicecmd1.png), [icon-remastered](icon/voicecmd1-remastered.png)
- 9 files, 26.87KB, 1.8.1