import commandLineArgs, { OptionDefinition } from "command-line-args";

// TODO: Capitalise stream option, pipeline encodings, alternative encodings, regex style alphabet cycle patterns
export interface CliOptions {
  help: boolean;
  from: string;
  to: string;
  offset: number;
  alphabet: string;
}

export const cliOptionDefinitions: (OptionDefinition & {
  description?: string;
  typeLabel?: string;
})[] = [
  {
    name: "help",
    alias: "h",
    description: "Displays this guide.",
    defaultValue: false,
    type: Boolean,
  },
  {
    name: "from",
    alias: "f",
    description:
      "Where to fetch the data from. Flag not needed. If specified looks for a file, if one is not found it uses the input string. If not specified it uses stdin.",
    typeLabel: " {underline filepath} | {underline string} | default: stdin",
    defaultValue: "stdin",
    type: String,
    defaultOption: true,
  },
  {
    name: "to",
    alias: "t",
    description:
      "Where to send data to. If specified creates/overwrites file. If not specified writes to stdout.",
    typeLabel: " {underline filepath} | default: stdout",
    defaultValue: "stdout",
    type: String,
  },
  {
    name: "offset",
    alias: "o",
    description:
      "The cipher's offset. Defaults to 0. Example: With offset of 3: a->d, b->e, etc.",
    typeLabel: " {underline integer}",
    defaultValue: 0,
    type: Number,
  },
  {
    name: "alphabet",
    alias: "a",
    description:
      "The cipher's alphabet. When provided it specifies which characters are swapped and to which letter. For example: `aeiou` will shift only the vowels.",
    typeLabel: " {underline string}",
    defaultValue: "abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    type: String,
  },
];

export function getCliOptions() {
  try {
    return commandLineArgs(cliOptionDefinitions) as CliOptions;
  } catch (e: any) {
    if ((e.message || "").includes("Unknown value")) {
      console.error(
        `Encountered an error while reading arguments: ${e.message}`
      );
      console.error('Try using quotes ("") to group a string');
      return null;
    }

    throw e;
  }
}
