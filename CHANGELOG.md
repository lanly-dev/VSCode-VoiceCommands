# Change Log
All notable changes to the "voice-commands" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [Unreleased]
    - Depends on the popularity of this extension.
    - Possible future features: 
        * Enable/disable specific commands.
        * Add new commands.
        * Switch to better maintained library or intergate with virtual assisstant API.

## [1.0.0] - Jan 2017
### Added
    - Commands include: copy, cut, find, go to line, hello world, paste, quick open, redo, search, select all, and undo.
    - "hello world" command has no action.
    - Uses Microsoft Speech Platform.

## [2.0.0, 2.0.1] - Jan 2018
### Added
    - Cross-platform: 
        - Window OS still uses built-in Speech library.
        - Other OS uses JRE to run the CMUSphinx open source speech recognition.
    - New commands: delete, stop listen, format.