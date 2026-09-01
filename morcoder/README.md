# morcoder README

The **`morcoder`** is a Visual Studio Code extension that provides syntax highlighting for Morse code files.

## Features

The **`morcoder`** is designed to highlight invalid Morse code, invalid Morse syntax, and non-Morse code characters. 

#### Functionality
- Displays translated character on hover.
- Gives errors for invalid Morse code.
- Gives warnings for non-Morse characters.

##### Example:
Hovering over `....` displays `H`.
Invalid morse such as `.--.-.---.`, etc. will be highlighted as errors.
#### Filetypes
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

### 0.1.0

Initial public release of **`morcoder`**.

## License

morcoder is licensed under the GNU General Public License v3.0 or later.
See [LICENSE.md](LICENSE.md) for the full license text.


