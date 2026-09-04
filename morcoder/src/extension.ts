import * as vscode from 'vscode';
import { parseMorse } from './parser';
import { morseToCharacter } from './morse';
import { decodeMorse } from './translator';
import {
    initializeStatusBar,
    updateStatusBar,
    hideStatusBar
} from './statusBar';

const diagnostics = vscode.languages.createDiagnosticCollection("morcoder");

export function activate(context: vscode.ExtensionContext) {
    console.log('morcoder is now active!');

    initializeStatusBar(context);

    context.subscriptions.push(
        diagnostics
    );

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(document => {
            updateDocument(document);
        })
    );

    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            updateDocument(event.document);
        })
    );

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (!editor || editor.document.languageId !== "morse") {
                hideStatusBar();
                return;
            }

            updateDocument(editor.document);
        })
    );

    if (vscode.window.activeTextEditor) {
        updateDocument(vscode.window.activeTextEditor.document);
    }

    context.subscriptions.push(
        vscode.languages.registerHoverProvider("morse", {
            provideHover(document, position) {
                const morseRange = getMorseWordRange(
                    document,
                    position
                );

                if (morseRange) {
                    const morse = document.getText(morseRange);
                    const decoded = decodeMorse(morse);

                    return new vscode.Hover(
                        `**${decoded}**\n\nMorse: \`${morse}\``,
                        morseRange
                    );
                }



                const invalidRange = document.getWordRangeAtPosition(
                    position,
                    /[^.\-\/\s]+/
                );

                if (invalidRange) {
                    const invalidText = document.getText(invalidRange);

                    return new vscode.Hover(
                        `\`${invalidText}\` isn't valid Morse syntax.` +
                        ` Did you mean to add a comment?\n\n` +
                        `Use \`#\`:\n\n` +
                        `\`# ${invalidText}\``,
                        invalidRange
                    );
                }
            }
        })
    );

    const disposable = vscode.commands.registerCommand(
        'morcoder.helloSam',
        () => {
            vscode.window.showInformationMessage('If it isn\'t Samuel Morse... ');
        }
    );

    context.subscriptions.push(disposable);

}

function updateDocument(document: vscode.TextDocument) {
    if (document.languageId !== "morse") {
        hideStatusBar();
        return;
    }

    const result = parseMorse(document);

    diagnostics.set(
        document.uri,
        result.diagnostics
    );

    updateStatusBar(
        result.characterCount,
        result.wordCount
    );
}

export function deactivate() {
    diagnostics.dispose();
}

function getMorseWordRange(
    document: vscode.TextDocument,
    position: vscode.Position
): vscode.Range | undefined {
    const line = document.lineAt(position.line);
    const text = line.text;
    const cursor = position.character;

    if (cursor >= text.length || !/[.-]/.test(text[cursor])) {
        return undefined;
    }

    const slash = text.lastIndexOf("/", cursor);
    const nextSlash = text.indexOf("/", cursor);

    const start = slash === -1 ? 0 : slash + 1;
    const end = nextSlash === -1 ? text.length : nextSlash;

    if (start >= end) {
        return undefined;
    }

    return new vscode.Range(
        position.line,
        start,
        position.line,
        end
    );
}


