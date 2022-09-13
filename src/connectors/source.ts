import { existsSync } from "fs";
import path from "path";
import { Stream } from "stream";

import { CliOptions } from "../misc/cli.options.js";
import { FileConnection } from "./file.connection.js";
import { StdConnection } from "./std.connection.js";
import { StringSource } from "./string.source.js";

export abstract class Source {
  abstract get(): Promise<Stream>;
}

export function getSource({ from }: CliOptions): Source {
  if (from === "stdin") {
    return new StdConnection();
  }

  const pathTo = path.resolve(process.cwd(), from);
  const fileExists = existsSync(pathTo);
  if (fileExists) {
    return new FileConnection(pathTo);
  }

  return new StringSource(from);
}
