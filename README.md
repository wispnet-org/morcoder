![Static Badge](https://img.shields.io/badge/license-GPLv3-green?style=flat)
![Static Badge](https://img.shields.io/badge/Visual_Studio_Code-Extension-blue?style=flat)

# morcoder

The first extension of its kind, **`morcoder`** is a Visual Studio Code extension that provides syntax highlighting and diagnostics for Morse code files.

## Features

**`morcoder`** is designed to highlight invalid Morse code, invalid Morse syntax, and non-Morse code characters, as well as provide hover-peek translations.

#### Functionality
- Displays translated word on hover.
- Gives errors for invalid Morse code.
- Gives warnings for non-Morse characters.

#### Example:
Hovering over `.... . .-.. ---` displays `HELLO`.

Invalid Morse such as `.--.-.---.`, etc. is displayed as `�` in hover-peek translation and is highlighted as an error.
#### Supported Filetypes
Recognizes the `.morse`, `.morc`, and `.mor` filetypes as Morse code files.
#### Recognized Character Set
A limited subset of the ITU Standard:
- A-Z
- 0-9
- Basic punctuation: ` . , ! ? " + - = / _ @ ) ( $ : ; `

## Known Issues

No known issues.

Found one? Report it on [GitHub](https://github.com/wispnet-org/morcoder/issues/).

## Release Notes

### 0.1.1

- Swapped letter-peeking hover functionality for word-peeking hover.
- Added translator fallback for unknown sequences, translating as `�` instead of not displaying.
- Added translator tolerance for extra whitespace between Morse characters.
- Updated project README.

### 0.1.0

Initial public release of **`morcoder`**!

## License

morcoder is licensed under the GNU General Public License v3.0 or later.
See [LICENSE.md](LICENSE.md) for the full license text.


