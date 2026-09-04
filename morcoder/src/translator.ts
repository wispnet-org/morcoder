import { morseToCharacter } from "./morse";

export function decodeMorse(morse: string): string {
    const characters = morse.trim().split(/\s+/);
    const translatedCharacters = characters.map(
    character => morseToCharacter[character] ?? "�"
);


    return translatedCharacters.join("");
}
