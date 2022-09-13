import { getDestination } from "./connectors/destination.js";
import { getSource } from "./connectors/source.js";
import { caesarCipherTransform } from "./transform/caesar.transform.js";
import { getCliOptions } from "./misc/cli.options.js";
import { showCliUsageGuide } from "./misc/cli.guide.js";
import { getAlphabet } from "./misc/alphabet.js";

(async function main() {
  const options = getCliOptions();
  if (!options) {
    return;
  }

  if (options.help) {
    showCliUsageGuide();
    return;
  }

  const source = getSource(options);
  const destination = getDestination(options);

  const alphabet = await getAlphabet(options.alphabet);
  const stream = await source.get();
  await destination.write(
    stream.pipe(caesarCipherTransform(options.offset, alphabet))
  );
})();
