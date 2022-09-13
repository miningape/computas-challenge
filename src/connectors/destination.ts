import path from "path";
import { Stream } from "stream";

import { CliOptions } from "../misc/cli.options.js";
import { FileConnection } from "./file.connection.js";
import { StdConnection } from "./std.connection.js";

export abstract class Destination {
  abstract write(stream: Stream): Promise<void>;
}

export function getDestination({ to }: CliOptions): Destination {
  if (to === "stdout") {
    return new StdConnection();
  }

  const pathTo = path.resolve(process.cwd(), to);
  return new FileConnection(pathTo);
}
