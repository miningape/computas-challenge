import { writeFile } from "fs/promises";
import { Stream } from "stream";
import { Destination } from "./destination.js";

export class FileDestination implements Destination {
  constructor(private filepath: string) {}

  write(stream: Stream): Promise<void> {
    return writeFile(this.filepath, stream);
  }
}
