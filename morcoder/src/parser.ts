import * as vscode from 'vscode';
import { morseToCharacter } from './morse';

export interface MorseParseResult {
    characterCount: number;
    wordCount: number;
    diagnostics: vscode.Diagnostic[];
}

export function parseMorse(document: vscode.TextDocument): MorseParseResult {
    const diagnostics: vscode.Diagnostic[] = [];

    let characterCount = 0;
    let wordCount = 0;

    for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
        const line = document.lineAt(lineNumber);
        const text = line.text;

        // Everything after # is a comment.
        const commentIndex = text.indexOf("#");

        const code = commentIndex === -1
            ? text
            : text.substring(0, commentIndex);

        // Check for invalid characters.
        const invalidPattern = /[^.\-\/\s]+/g;
        let invalidMatch: RegExpExecArray | null;

        while ((invalidMatch = invalidPattern.exec(code)) !== null) {
            const invalidText = invalidMatch[0];
            const start = invalidMatch.index;

            const range = new vscode.Range(
                lineNumber,
                start,
                lineNumber,
                start + invalidText.length
            );

            diagnostics.push(
                new vscode.Diagnostic(
                    range,
                    `Invalid characters: ${invalidText}`,
                    vscode.DiagnosticSeverity.Warning
                )
            );
        }

        // Check Morse sequences.
        const morsePattern = /[.-]+/g;
        let match: RegExpExecArray | null;

        while ((match = morsePattern.exec(code)) !== null) {
            const character = match[0];
            const start = match.index;

            if (!morseToCharacter[character]) {
                const range = new vscode.Range(
                    lineNumber,
                    start,
                    lineNumber,
                    start + character.length
                );

                diagnostics.push(
                    new vscode.Diagnostic(
                        range,
                        `Unknown Morse sequence: ${character}`,
                        vscode.DiagnosticSeverity.Error
                    )
                );
            } else {
                characterCount++;
            }
        }

        // Check word separators.
        for (let i = 0; i < code.length; i++) {
            if (code[i] !== "/") {
                continue;
            }

            let previous = i - 1;

            while (previous >= 0 && /\s/.test(code[previous])) {
                previous--;
            }

            let next = i + 1;

            while (next < code.length && /\s/.test(code[next])) {
                next++;
            }

            if (
                previous < 0 ||
                next >= code.length ||
                code[previous] === "/" ||
                code[next] === "/"
            ) {
                const range = new vscode.Range(
                    lineNumber,
                    i,
                    lineNumber,
                    i + 1
                );

                diagnostics.push(
                    new vscode.Diagnostic(
                        range,
                        "Word separator must be between Morse characters.",
                        vscode.DiagnosticSeverity.Warning
                    )
                );
            }
        }
    }

    const codeText = Array.from(
    { length: document.lineCount },
    (_, i) => document.lineAt(i).text.split("#")[0]
).join("\n");

const words = codeText
    .split(/[/\n]+/)
    .filter(word => /[.-]/.test(word));

wordCount = words.length;


    return {
        characterCount,
        wordCount,
        diagnostics
    };
}
