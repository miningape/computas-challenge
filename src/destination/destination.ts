import path from "path";
import { Stream } from "stream";

import { CliOptions } from "../misc/cli.options.js";
import { FileDestination } from "./file.destination.js";
import { StdoutDestination } from "./stdout.destination.js";

export abstract class Destination {
  abstract write(stream: Stream): Promise<void>;
}

export function getDestination({ to }: CliOptions): Destination {
  if (to === "stdout") {
    return new StdoutDestination();
  }

  const pathTo = path.resolve(process.cwd(), to);
  return new FileDestination(pathTo);
}
