'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const jre = require("node-jre");
const vscode_1 = require("vscode");
function activate(context) {
    let init_disposable = vscode_1.commands.registerCommand('start', () => {
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
exports.activate = activate;
class VoiceListener {
    constructor(context, type) {
        this.sysType = type;
        this.execFile = require('child_process').spawn;
        this.sttbar = new SttBarItem();
        let disposable1 = vscode_1.commands.registerCommand('toggle', () => {
            if (this.sttbar.getSttText() == 'on') {
                this.sttbar.off();
                this.killed();
            }
            else {
                this.sttbar.on();
                this.run();
            }
        });
        let disposable2 = vscode_1.commands.registerCommand('stop_listen', () => {
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
            vscode_1.window.setStatusBarMessage(data.toString(), 1000);
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
    constructor() {
        this.statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left, 10);
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
    runCmd(theCmd) {
        switch (theCmd) {
            case 'copy':
                vscode_1.commands.executeCommand('editor.action.clipboardCopyAction');
                break;
            case 'cut':
                vscode_1.commands.executeCommand('editor.action.clipboardCutAction');
                break;
            case 'delete':
                vscode_1.commands.executeCommand('deleteLeft');
                break;
            case 'find':
                vscode_1.commands.executeCommand('actions.find');
                break;
            case 'format':
                vscode_1.commands.executeCommand('editor.action.formatDocument');
                break;
            case 'go to line':
                vscode_1.commands.executeCommand('workbench.action.gotoLine');
                break;
            case 'paste':
                vscode_1.commands.executeCommand('editor.action.clipboardPasteAction');
                break;
            case 'quick open':
                vscode_1.commands.executeCommand('workbench.action.quickOpen');
                break;
            case 'redo':
                vscode_1.commands.executeCommand('redo');
                break;
            case 'search':
                vscode_1.commands.executeCommand('workbench.view.search');
                break;
            case 'select all':
                vscode_1.commands.executeCommand('editor.action.selectAll');
                break;
            case 'stop listen':
                vscode_1.commands.executeCommand('stop_listen');
                break;
            case 'undo':
                vscode_1.commands.executeCommand('undo');
                break;
        }
    }
}
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map