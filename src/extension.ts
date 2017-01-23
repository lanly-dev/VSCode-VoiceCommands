'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, TextEditor } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // console.log('Congratulations, your extension "new" is now active!');
    let vl = new VoiceListener(context);
    let init_disposable = commands.registerCommand('greeting', () => {
        // window.showInformationMessage("This is Voice Command! activated");
        if (process.platform === 'win32') {
            vl.run();
        }
        else {
            window.showInformationMessage("Sorry, this extension is only compatible with Windows OS");
        }
    });
    context.subscriptions.push(init_disposable);
}

class VoiceListener {

    private execFile;
    private child;
    private sttbar: SttBarItem;

    constructor(context: vscode.ExtensionContext) {
        this.execFile = require('child_process').spawn;
        this.sttbar = new SttBarItem();
        let disposable = commands.registerCommand('toggle', () => {
            if (this.sttbar.getSttText() == "on") {
                this.sttbar.off();
                this.killed();
            }
            else {
                this.sttbar.on();
                this.run();
            }
        });
        context.subscriptions.push(disposable);
        this.sttbar.setSttCmd('toggle');
    }
    run() {
        this.child = this.execFile(__dirname + '\\WordsMatching.exe', [__dirname]);
        this.child.stdout.on('data', function (data) {

            // vscode.window.showInformationMessage(data.toString());
            window.setStatusBarMessage(data.toString(), 1000);
            let centralCmd = new commandsClass();

            centralCmd.runCmd(data.toString().trim());
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
        this.statusBarItem.text = "💬 listening";
        this.statusBarItem.show();
        this.stt = 'on';
    }
    off() {
        this.statusBarItem.text = "✖️️ Stop";
        this.statusBarItem.show();
        this.stt = 'off';
    }

    //not in use, use setStatusBarMessage instead
    // note(text: string) {
    //     this.statusBarItem.text = text;
    //     this.statusBarItem.show();
    //     setTimeout(function () {
    //         this.statusBarItem.text = "$(zap) listening";
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
            case "copy":
                commands.executeCommand('editor.action.clipboardCopyAction');
                break;
            case "cut":
                commands.executeCommand('editor.action.clipboardCutAction');
                break;
            case "find":
                commands.executeCommand('actions.find');
                break;
            // case "format":
            //     commands.executeCommand('editor.action.formatDocument');
            //     break;
            case "go to line":
                commands.executeCommand('workbench.action.gotoLine');
                break;
            case "paste":
                commands.executeCommand('editor.action.clipboardPasteAction');
                break;
            case "quick open":
                commands.executeCommand('workbench.action.quickOpen');
                break;
            case "redo":
                commands.executeCommand('redo');
                break;
            case "search":
                commands.executeCommand('workbench.view.search');
                break;
            case "select all":
                commands.executeCommand('editor.action.selectAll');
                break;
            case "undo":
                commands.executeCommand('undo');
                break;
        }
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}