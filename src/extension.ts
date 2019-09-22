'use strict'

import { ExtensionContext, StatusBarItem, StatusBarAlignment, commands, window, } from 'vscode'
import { spawn } from 'child_process'
import { platform } from 'os'
import { join } from 'path'

export function activate(context: ExtensionContext) {
  let checkJRE = false
  // window.showInformationMessage('This is Voice Command! activated');
  const checkJREprocess = spawn('java', ['-version']).on('error', err => showJErrorMsg())
  checkJREprocess.stderr.on('data', (data: Buffer) => {
    // console.log(data.toString())
    if (data.indexOf('version') >= 0) checkJRE = true
    checkJREprocess.kill()
  })
  checkJREprocess.on('exit', (code, signal) => {
    if (checkJRE === true) new VoiceListener(context, platform())
    else showJErrorMsg()
  })

  function showJErrorMsg() {
    window.showInformationMessage('Please install JRE(JDK for MacOS) in order to run this extension!!!')
  }
}

class VoiceListener {
  private sysType: String
  // @ts-ignore
  private execFile
  // @ts-ignore
  private child
  private sttbar: SttBarItem

  constructor(context: ExtensionContext, type: String) {
    this.sysType = type
    this.execFile = spawn
    this.sttbar = new SttBarItem()
    const d1 = commands.registerCommand('toggle', () => {
      if (this.sttbar.getSttText() === 'on') {
        this.sttbar.off()
        this.killed()
      } else {
        this.sttbar.on()
        this.run()
      }
    })
    const d2 = commands.registerCommand('stop_listen', () => {
      this.sttbar.off()
      this.killed()
    })
    context.subscriptions.concat([d1, d2])
    this.sttbar.setSttCmd('toggle')
  }

  run() {
    if (this.sysType === 'win32') {
      // console.log('Using Microsoft Speech Platform')
      this.child = this.execFile(join(__dirname, 'WordsMatching.exe')).on('error', (error: any) => showError(error))
    } else {
      // console.log('Using CMUSphinx Voice Recognition')
      this.child = this.execFile('java', ['-jar', join(__dirname, 'WordsListener.jar')]).on('error', (error: any) => showError(error))
    }
    this.child.stdout.on('data',
      (data: Buffer) => {
        window.setStatusBarMessage(data.toString(), 1000)
        let centralCmd = new CommandsClass()
        // console.log(data.toString());
        centralCmd.runCmd(data.toString().trim())
      })

    this.child.stderr.on('data', (data: any) => console.log(data.toString()))

    function showError(error: any) {
      window.showInformationMessage(`Something went wrong with Voice Commands!!! Sorry 😢 - ${error}`)
    }
  }

  killed() {
    this.child.kill()
  }
}

class SttBarItem {
  private statusBarItem: StatusBarItem
  private stt: string

  constructor() {
    this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 10)
    this.stt = "off"
    this.off()
  }

  on() {
    this.statusBarItem.text = '💬 listening'
    this.statusBarItem.show()
    this.stt = 'on'
  }

  off() {
    this.statusBarItem.text = '✖️️ Stop'
    this.statusBarItem.show()
    this.stt = 'off'
  }

  //not in use, use setStatusBarMessage instead
  // note(text: string) {
  //     this.statusBarItem.text = text;
  //     this.statusBarItem.show();
  //     setTimeout(() => {
  //         this.statusBarItem.text = '$(zap) listening';
  //     }, 1000);
  // }

  getSttText() {
    return this.stt
  }

  setSttCmd(cmd: string | undefined) {
    this.statusBarItem.command = cmd
  }
}

class CommandsClass {
  runCmd(theCmd: string) {
    switch (theCmd) {
      case 'copy':
        commands.executeCommand('editor.action.clipboardCopyAction')
        break
      case 'cut':
        commands.executeCommand('editor.action.clipboardCutAction')
        break
      case 'delete':
        commands.executeCommand('deleteLeft')
        break
      case 'find':
        commands.executeCommand('actions.find')
        break
      case 'format':
        commands.executeCommand('editor.action.formatDocument')
        break
      case 'go to line':
        commands.executeCommand('workbench.action.gotoLine')
        break
      case 'paste':
        commands.executeCommand('editor.action.clipboardPasteAction')
        break
      case 'quick open':
        commands.executeCommand('workbench.action.quickOpen')
        break
      case 'redo':
        commands.executeCommand('redo')
        break
      case 'search':
        commands.executeCommand('workbench.view.search')
        break
      case 'select all':
        commands.executeCommand('editor.action.selectAll')
        break
      case 'stop listen':
        commands.executeCommand('stop_listen')
        break
      case 'undo':
        commands.executeCommand('undo')
        break
    }
  }
}

// this method is called when your extension is deactivated
export function deactivate() { }