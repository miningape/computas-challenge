import { createReadStream } from "fs";
import { Stream } from "stream";
import { Source } from "./source.js";

export class FileSource implements Source {
  constructor(private filepath: string) {}

  async get(): Promise<Stream> {
    return createReadStream(this.filepath);
  }
}
