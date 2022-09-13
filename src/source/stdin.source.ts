import { Stream } from "stream";
import { Source } from "./source.js";

export class StdinSource implements Source {
  async get(): Promise<Stream> {
    return process.openStdin();
  }
}
