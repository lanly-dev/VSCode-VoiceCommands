'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process = require("child_process");
function activate(context) {
    let checkJRE = false;
    // window.showInformationMessage('This is Voice Command! activated');
    const spawn = child_process.spawn('java', ['-version']).on('error', err => showJErrorMsg());
    spawn.stderr.on('data', (data) => {
        if (data.indexOf('version') >= 0)
            checkJRE = true;
        spawn.kill();
    });
    spawn.on('exit', (code, signal) => {
        if (checkJRE == true) {
            if (process.platform == 'win32') {
                let vl = new VoiceListener(context, 'win');
                vl.run();
            }
            else {
                let vl = new VoiceListener(context, 'other');
                vl.run();
            }
        }
        else
            showJErrorMsg();
    });
    function showJErrorMsg() {
        vscode.window.showInformationMessage('Please install JRE(JDK for MacOS) in order to run this extension!!!');
    }
}
exports.activate = activate;
class VoiceListener {
    constructor(context, type) {
        this.sysType = type;
        this.execFile = child_process.spawn;
        this.sttbar = new SttBarItem();
        let disposable1 = vscode.commands.registerCommand('toggle', () => {
            if (this.sttbar.getSttText() == 'on') {
                this.sttbar.off();
                this.killed();
            }
            else {
                this.sttbar.on();
                this.run();
            }
        });
        let disposable2 = vscode.commands.registerCommand('stop_listen', () => {
            this.sttbar.off();
            this.killed();
        });
        context.subscriptions.push(disposable1);
        context.subscriptions.push(disposable2);
        this.sttbar.setSttCmd('toggle');
    }
    run() {
        if (this.sysType == 'win') {
            //   console.log('Using  Microsoft Speech Platform')
            this.child = this.execFile(__dirname + '/WordsMatching.exe').on('error', error => showError(error));
        }
        else {
            //   console.log('Using CMUSphinx Voice Recognition')
            this.child = this.execFile('java', ['-jar', __dirname + '/WordsListener.jar']).on('error', error => showError(error));
        }
        this.child.stdout.on('data', data => {
            vscode.window.setStatusBarMessage(data.toString(), 1000);
            let centralCmd = new commandsClass();
            // console.log(data.toString());
            centralCmd.runCmd(data.toString().trim());
        });
        this.child.stderr.on('data', data => {
            console.log(data.toString());
        });
        function showError(error) {
            vscode.window.showInformationMessage('Something went wrong with Voice Command!!! Sorry 😢');
        }
    }
    killed() {
        this.child.kill();
    }
}
class SttBarItem {
    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
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
    //     setTimeout(() => {
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
    runCmd(theCmd) {
        switch (theCmd) {
            case 'copy':
                vscode.commands.executeCommand('editor.action.clipboardCopyAction');
                break;
            case 'cut':
                vscode.commands.executeCommand('editor.action.clipboardCutAction');
                break;
            case 'delete':
                vscode.commands.executeCommand('deleteLeft');
                break;
            case 'find':
                vscode.commands.executeCommand('actions.find');
                break;
            case 'format':
                vscode.commands.executeCommand('editor.action.formatDocument');
                break;
            case 'go to line':
                vscode.commands.executeCommand('workbench.action.gotoLine');
                break;
            case 'paste':
                vscode.commands.executeCommand('editor.action.clipboardPasteAction');
                break;
            case 'quick open':
                vscode.commands.executeCommand('workbench.action.quickOpen');
                break;
            case 'redo':
                vscode.commands.executeCommand('redo');
                break;
            case 'search':
                vscode.commands.executeCommand('workbench.view.search');
                break;
            case 'select all':
                vscode.commands.executeCommand('editor.action.selectAll');
                break;
            case 'stop listen':
                vscode.commands.executeCommand('stop_listen');
                break;
            case 'undo':
                vscode.commands.executeCommand('undo');
                break;
        }
    }
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map