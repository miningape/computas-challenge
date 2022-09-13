import { createReadStream } from "fs";
import { writeFile } from "fs/promises";
import { Stream } from "stream";

import { Destination } from "./destination.js";
import { Source } from "./source.js";

export class FileConnection implements Source, Destination {
  constructor(private filepath: string) {}

  async get(): Promise<Stream> {
    return createReadStream(this.filepath);
  }

  write(stream: Stream): Promise<void> {
    return writeFile(this.filepath, stream);
  }
}
