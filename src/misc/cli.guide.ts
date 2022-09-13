import commandLineUsage from "command-line-usage";
import { cliOptionDefinitions } from "./cli.options.js";

const cliUsageGuideSections = [
  {
    header: "Caesar Cipher",
    content:
      "A caesar cipher shifts text according to a given offset.\n " +
      "- This can be used with both strings, stdin, stdout, and files\n " +
      "- Shifts the letters in the alphabet circularly. For example: with an offset of 1: a=b, b=c, etc. and x=a\n " +
      "- REPL when both stdin and stdout are specified\n " +
      "- Unrecognised characters are passed directly to the output",
  },
  {
    header: "Options",
    optionList: cliOptionDefinitions,
  },
  {
    header: "Examples",
    content: "`cipher 'Hello, World!' --offset 1` -> Ifmmp, Xptme!",
  },
];

export function showCliUsageGuide() {
  console.log("\n------------------------------------------------------------");
  console.log(commandLineUsage(cliUsageGuideSections));
}
