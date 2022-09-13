import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

export async function getAlphabet(alphabet: string): Promise<string> {
  const pathTo = path.resolve(process.cwd(), alphabet);
  const fileExists = existsSync(pathTo);
  if (fileExists) {
    const filebuf = await readFile(pathTo);
    return filebuf.toString();
  }

  return alphabet;
}
