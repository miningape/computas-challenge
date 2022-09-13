import { Stream } from "stream";

import { Destination } from "./destination.js";
import { Source } from "./source.js";

export class StdConnection implements Source, Destination {
  async get(): Promise<Stream> {
    return process.openStdin();
  }

  write(stream: Stream): Promise<void> {
    return new Promise((resolve, reject) => {
      stream.pipe(process.stdout);
      stream.on("error", reject);
      stream.on("end", () => {
        // Flush stdout since it wont display unless \n is present
        // TODO: Check if \n is last chars
        console.log();
        resolve();
      });
    });
  }
}
