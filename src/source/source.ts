import { existsSync } from "fs";
import path from "path";
import { Stream } from "stream";

import { CliOptions } from "../misc/cli.options.js";
import { FileSource } from "./file.source.js";
import { StdinSource } from "./stdin.source.js";
import { StringSource } from "./string.source.js";

export abstract class Source {
  abstract get(): Promise<Stream>;
}

export function getSource({ from }: CliOptions): Source {
  if (from === "stdin") {
    return new StdinSource();
  }

  const pathTo = path.resolve(process.cwd(), from);
  const fileExists = existsSync(pathTo);
  if (fileExists) {
    return new FileSource(pathTo);
  }

  return new StringSource(from);
}
