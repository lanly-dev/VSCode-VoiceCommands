'use strict';
const vscode_1 = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // console.log('Congratulations, your extension "new" is now active!');
    let vl = new VoiceListener(context);
    let init_disposable = vscode_1.commands.registerCommand('greeting', () => {
        // window.showInformationMessage("This is Voice Command! activated");
        if (process.platform === 'win32') {
            vl.run();
        }
        else {
            vscode_1.window.showInformationMessage("Sorry, this extension is only compatible with Windows OS");
        }
    });
    context.subscriptions.push(init_disposable);
}
exports.activate = activate;
class VoiceListener {
    constructor(context) {
        this.execFile = require('child_process').spawn;
        this.sttbar = new SttBarItem();
        let disposable = vscode_1.commands.registerCommand('toggle', () => {
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
            vscode_1.window.setStatusBarMessage(data.toString(), 1000);
            let centralCmd = new commandsClass();
            centralCmd.runCmd(data.toString().trim());
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
    runCmd(theCmd) {
        switch (theCmd) {
            case "copy":
                vscode_1.commands.executeCommand('editor.action.clipboardCopyAction');
                break;
            case "cut":
                vscode_1.commands.executeCommand('editor.action.clipboardCutAction');
                break;
            case "find":
                vscode_1.commands.executeCommand('actions.find');
                break;
            // case "format":
            //     commands.executeCommand('editor.action.formatDocument');
            //     break;
            case "go to line":
                vscode_1.commands.executeCommand('workbench.action.gotoLine');
                break;
            case "paste":
                vscode_1.commands.executeCommand('editor.action.clipboardPasteAction');
                break;
            case "quick open":
                vscode_1.commands.executeCommand('workbench.action.quickOpen');
                break;
            case "redo":
                vscode_1.commands.executeCommand('redo');
                break;
            case "search":
                vscode_1.commands.executeCommand('workbench.view.search');
                break;
            case "select all":
                vscode_1.commands.executeCommand('editor.action.selectAll');
                break;
            case "undo":
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