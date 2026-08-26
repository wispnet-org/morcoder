import * as vscode from 'vscode';

let statusBar: vscode.StatusBarItem;

export function initializeStatusBar(context: vscode.ExtensionContext) {
    statusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );

    context.subscriptions.push(statusBar);
}

export function updateStatusBar(characterCount: number, wordCount: number) {
    if (!statusBar) {
        return;
    }

    statusBar.text = `Morse: ${characterCount} chars • ${wordCount} words`;
    statusBar.show();
}

export function hideStatusBar() {
    if (!statusBar) {
        return;
    }

    statusBar.hide();
}
