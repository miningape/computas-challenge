import { Readable, Stream } from "stream";

import { Source } from "./source.js";

export class StringSource implements Source {
  constructor(private source: string) {}

  async get(): Promise<Stream> {
    return Readable.from([...this.source]);
  }
}
