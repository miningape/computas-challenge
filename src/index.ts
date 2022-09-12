import { Transform } from "stream";

function caesarCipher() {
  const alphabet = "abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const congruency = alphabet.length;
  const alphabetPositions = alphabet
    .split("")
    .reduce<Record<string, number>>((acc, cur, i) => {
      acc[cur] = i;
      return acc;
    }, {});

  const offset = 3;

  const cipher = new Transform({
    transform(chunk: string, encoding, callback) {
      callback(
        null,
        Buffer.from(
          chunk
            .toString()
            .split("")
            .map((char) =>
              alphabetPositions[char] !== undefined
                ? alphabet[(alphabetPositions[char] + offset) % congruency]
                : char
            )
            .join("")
        )
      );
    },
  });

  return cipher;
}

(async function main() {
  const stdin = process.openStdin();

  await new Promise<void>((resolve, reject) => {
    stdin.pipe(caesarCipher()).pipe(process.stdout);
    stdin.on("end", () => {
      resolve();
    });
    stdin.on("error", reject);
  });
})();
