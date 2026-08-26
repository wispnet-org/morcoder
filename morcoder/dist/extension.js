/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const parser_1 = __webpack_require__(3);
const morse_1 = __webpack_require__(2);
const statusBar_1 = __webpack_require__(4);
const diagnostics = vscode.languages.createDiagnosticCollection("morcoder");
function activate(context) {
    console.log('morcoder is now active!');
    (0, statusBar_1.initializeStatusBar)(context);
    context.subscriptions.push(diagnostics);
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(document => {
        updateDocument(document);
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
        updateDocument(event.document);
    }));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        if (!editor || editor.document.languageId !== "morse") {
            (0, statusBar_1.hideStatusBar)();
            return;
        }
        updateDocument(editor.document);
    }));
    if (vscode.window.activeTextEditor) {
        updateDocument(vscode.window.activeTextEditor.document);
    }
    context.subscriptions.push(vscode.languages.registerHoverProvider("morse", {
        provideHover(document, position) {
            const morseRange = document.getWordRangeAtPosition(position, /[.-]+/);
            if (morseRange) {
                const morse = document.getText(morseRange);
                const character = morse_1.morseToCharacter[morse];
                if (!character) {
                    return new vscode.Hover(`\`${morse}\` is not a recognized Morse character.`, morseRange);
                }
                return new vscode.Hover(`**${character}**\n\nMorse: \`${morse}\``, morseRange);
            }
            const invalidRange = document.getWordRangeAtPosition(position, /[^.\-\/\s]+/);
            if (invalidRange) {
                const invalidText = document.getText(invalidRange);
                return new vscode.Hover(`\`${invalidText}\` isn't valid Morse syntax.` +
                    ` Did you mean to add a comment?\n\n` +
                    `Use \`#\`:\n\n` +
                    `\`# ${invalidText}\``, invalidRange);
            }
        }
    }));
}
function updateDocument(document) {
    if (document.languageId !== "morse") {
        (0, statusBar_1.hideStatusBar)();
        return;
    }
    const result = (0, parser_1.parseMorse)(document);
    diagnostics.set(document.uri, result.diagnostics);
    (0, statusBar_1.updateStatusBar)(result.characterCount, result.wordCount);
}
function deactivate() {
    diagnostics.dispose();
}


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.morseToCharacter = void 0;
exports.morseToCharacter = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    ".-.-.-": ".",
    "--..--": ",",
    "-.-.--": "!",
    "..--..": "?",
    ".-..-.": "\"",
    ".-.-.": "+",
    "-....-": "-",
    "-...-": "=",
    "-..-.": "/",
    "..--.-": "_",
    ".--.-.": "@",
    "-.--.": "(",
    "-.--.-": ")",
    "...-..-": "$",
    "...--..": ":",
    "-.-.-.": ";",
};


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseMorse = parseMorse;
const vscode = __importStar(__webpack_require__(1));
const morse_1 = __webpack_require__(2);
function parseMorse(document) {
    const diagnostics = [];
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
        let invalidMatch;
        while ((invalidMatch = invalidPattern.exec(code)) !== null) {
            const invalidText = invalidMatch[0];
            const start = invalidMatch.index;
            const range = new vscode.Range(lineNumber, start, lineNumber, start + invalidText.length);
            diagnostics.push(new vscode.Diagnostic(range, `Invalid characters: ${invalidText}`, vscode.DiagnosticSeverity.Warning));
        }
        // Check Morse sequences.
        const morsePattern = /[.-]+/g;
        let match;
        while ((match = morsePattern.exec(code)) !== null) {
            const character = match[0];
            const start = match.index;
            if (!morse_1.morseToCharacter[character]) {
                const range = new vscode.Range(lineNumber, start, lineNumber, start + character.length);
                diagnostics.push(new vscode.Diagnostic(range, `Unknown Morse sequence: ${character}`, vscode.DiagnosticSeverity.Error));
            }
            else {
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
            if (previous < 0 ||
                next >= code.length ||
                code[previous] === "/" ||
                code[next] === "/") {
                const range = new vscode.Range(lineNumber, i, lineNumber, i + 1);
                diagnostics.push(new vscode.Diagnostic(range, "Word separator must be between Morse characters.", vscode.DiagnosticSeverity.Warning));
            }
        }
    }
    const codeText = Array.from({ length: document.lineCount }, (_, i) => document.lineAt(i).text.split("#")[0]).join("\n");
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


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeStatusBar = initializeStatusBar;
exports.updateStatusBar = updateStatusBar;
exports.hideStatusBar = hideStatusBar;
const vscode = __importStar(__webpack_require__(1));
let statusBar;
function initializeStatusBar(context) {
    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusBar);
}
function updateStatusBar(characterCount, wordCount) {
    if (!statusBar) {
        return;
    }
    statusBar.text = `Morse: ${characterCount} chars • ${wordCount} words`;
    statusBar.show();
}
function hideStatusBar() {
    if (!statusBar) {
        return;
    }
    statusBar.hide();
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map