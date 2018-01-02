'use strict';

import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as jre from "node-jre";
import { window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, TextEditor } from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let init_disposable = commands.registerCommand('start', () => {
        // window.showInformationMessage('This is Voice Command! activated');
        if (process.platform === 'win32') {
            let vl = new VoiceListener(context, 'win');
            vl.run();
        }
        else {
            let vl = new VoiceListener(context, 'other');
            vl.run();
        }
    });
    context.subscriptions.push(init_disposable);
}

class VoiceListener {

    private sysType: String;
    private execFile;
    private child;
    private sttbar: SttBarItem;

    constructor(context: vscode.ExtensionContext, type: String) {
        this.sysType = type;
        this.execFile = require('child_process').spawn;
        this.sttbar = new SttBarItem();
        let disposable1 = commands.registerCommand('toggle', () => {
            if (this.sttbar.getSttText() == 'on') {
                this.sttbar.off();
                this.killed();
            }
            else {
                this.sttbar.on();
                this.run();
            }
        });
        let disposable2 = commands.registerCommand('stop_listen', () => {
            this.sttbar.off();
            this.killed();
        });
        context.subscriptions.push(disposable1);
        context.subscriptions.push(disposable2);
        this.sttbar.setSttCmd('toggle');
    }
    run() {
        if (this.sysType == 'win')
            // console.log(this.child = this.execFile(__dirname + '\\WordsMatching.exe'));
            this.child = this.execFile(__dirname + '\\WordsMatching.exe');
        else
            // console.log(jre.spawn([__dirname + '\\WordsListener.jar'], 'WordsListener', [], { encoding: 'utf8' }))
            this.child = jre.spawn([__dirname + '\\WordsListener.jar'], 'WordsListener', [], { encoding: 'utf8' });
        this.child.stdout.on('data', function (data) {
            window.setStatusBarMessage(data.toString(), 1000);
            let centralCmd = new commandsClass();
            // console.log(data.toString());
            centralCmd.runCmd(data.toString().trim());
        });

        this.child.stderr.on('data', function (data) {
            console.log(data.toString());
        });
    }
    killed() {
        this.child.kill();
    }
}

class SttBarItem {

    private statusBarItem: StatusBarItem;
    private stt: string;

    constructor() {
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 10);
        this.on();
        this.stt = 'on';
    }
    on() {
        this.statusBarItem.text = '💬 listening';
        this.statusBarItem.show();
        this.stt = 'on';
    }
    off() {
        this.statusBarItem.text = '✖️️ Stop';
        this.statusBarItem.show();
        this.stt = 'off';
    }

    //not in use, use setStatusBarMessage instead
    // note(text: string) {
    //     this.statusBarItem.text = text;
    //     this.statusBarItem.show();
    //     setTimeout(function () {
    //         this.statusBarItem.text = '$(zap) listening';
    //     }, 1000);
    // }

    getSttText() {
        return this.stt;
    }
    setSttCmd(cmd) {
        this.statusBarItem.command = cmd;
    }
}

class commandsClass {
    runCmd(theCmd: string) {
        switch (theCmd) {
            case 'copy':
                commands.executeCommand('editor.action.clipboardCopyAction');
                break;
            case 'cut':
                commands.executeCommand('editor.action.clipboardCutAction');
                break;
            case 'delete':
                commands.executeCommand('deleteLeft')
                break;
            case 'find':
                commands.executeCommand('actions.find');
                break;
            case 'format':
                commands.executeCommand('editor.action.formatDocument');
                break;
            case 'go to line':
                commands.executeCommand('workbench.action.gotoLine');
                break;
            case 'paste':
                commands.executeCommand('editor.action.clipboardPasteAction');
                break;
            case 'quick open':
                commands.executeCommand('workbench.action.quickOpen');
                break
            case 'redo':
                commands.executeCommand('redo');
                break;
            case 'search':
                commands.executeCommand('workbench.view.search');
                break;
            case 'select all':
                commands.executeCommand('editor.action.selectAll');
                break;
            case 'stop listen':
                commands.executeCommand('stop_listen');
                break;
            case 'undo':
                commands.executeCommand('undo');
                break;
        }
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}