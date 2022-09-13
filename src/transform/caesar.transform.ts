import { Transform } from "stream";

export function caesarCipherTransform(offset: number, alphabet: string) {
  const congruency = alphabet.length;
  const alphabetPositions = alphabet
    .split("")
    .reduce<Record<string, number>>((acc, cur, i) => {
      acc[cur] = i;
      return acc;
    }, {});

  const cipher = new Transform({
    transform(chunk: Buffer, encoding, callback) {
      callback(
        null,
        chunk
          .toString()
          .split("")
          .map((char) => {
            const posInAlphabet = alphabetPositions[char];
            if (posInAlphabet === undefined) {
              return char;
            }

            const newPosInAlphabet = (posInAlphabet + offset) % congruency;

            if (newPosInAlphabet < 0) {
              return alphabet[congruency + newPosInAlphabet];
            }

            return alphabet[newPosInAlphabet];
          })
          .join("")
      );
    },
  });

  return cipher;
}
