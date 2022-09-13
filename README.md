# Caesar Cipher

This CLI application transforms strings by shifting their letters in the alphabet. See [https://en.wikipedia.org/wiki/Caesar_cipher](Wikipedia) for a more full description. This app can operate on stdin, stdout, files and strings, allowing for data to be `curl`ed `grep`ped and the ciphered all in one command.

For example the string "Hello, World!" gets transformed into "Ifmmp, Xptme!" when an offset of 1 is used since a->b, b->c, etc. and since it is circular we get z->a. Note also that any characters not in the alphabet (`,` & `!`) are passed directly to the output without being transformed.

## Running

To start the application:

1. Download this git repository
1. Install all dependencies with `yarn install` (or `npm install`).
1. Launch the application with `yarn start` (or `npm start`).

## CLI Options

- `-h, --help` A flag specifying whether to display a guide.
- `-o, --offset` A number specifying how much to shift each letter. Can be both negative and positive, positive indicating a rightward circular shift of the alphabet by the offset, negative indicating a leftward shift. Default: 0 - i.e. no transformation.
- `-f, --from` A string specifying where to get the source from, can be stdin, a filepath, or just the string to transform. Default: stdin.
- `-t, --to` A string specifying where to send the cipher text, can be stdout, or a filepath. Default: stdout.
- `-a, --alphabet` A string specifying what alphabet the cipher should use to transform the cipher input. For example `aeiou` will transform all vowels, meaning a string like "Hello, World!" becomes "Hillu, Wurld!". The alphabet both specifies which characters will be transformed and to which character. I.e. since `e` follows `a` in the example alphabet any `a` characters are transformed to `e` characters. Default: `abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`

## Example Usage

- REPL: `yarn start`. Opens a REPL that encodes any text input into the prompt after pressing enter with an offset of 0 (i.e. no transformation).
- REPL: `yarn start --from stdin --to stdout`. Same as above since `--from stdin` and `--to stdout` is default.
- REPL offset: `yarn start --offset 1`. Opens a REPL and encodes any input with an offset of 1 (i.e. "Hello, World!" becomes "Ifmmp, Xptme!")
- REPL to file: `yarn start --offset 1 --to out.txt`. Opens a REPL and encodes any input with an offset of 1 into a file. Will make/clear the file once then insert text into the file as it appears in the REPL. You may have to close/open the file to see any live changes as file editors often cache the contents of a file.
- PIPE: `echo "Hello, World!" | yarn start --offset 1` Prints "Ifmmp, Xptme!" to stdout then closes the app.
- PIPE to file: `curl example.com | yarn start --from stdin --to out.txt` Writes the HTML source of [example.com](example.com) without ciphering to `out.txt` it then closes the app.
- STRING: `yarn start --from "Hello, World!" --offset 1` Prints "Ifmmp, Xptme!" to stdout then closes the app since the source the data is from is the string "Hello, World!".
- STRING: `yarn start "Hello, World!" --offset 1` Same as above since any value without a flag is assumed to be attached to the `--from` flag.
- FILE to stdout: `yarn start input.txt` Reads `input.txt` and outputs the text shifted by 0 to the console. If `input.txt` does not exist the string `"input.txt"` is used instead.
- FILE to file: `yarn start --from input.txt --to output.txt --offset 1` Writes the ciphered contents of `input.txt` to `output.txt` using an offset of 1.
- ALPHABET: `yarn start "Hello, World!" --alphabet aeiou` Outputs `"Hillu, Wurld!"` to stdout. This is because only characters in the alphabet are ciphered, all other characters are passed directly to the output.

## Possible extensions

- Build a globally installed version that can be installed from `npm` and `yarn`. [https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs](See here).
- More default alphabets, for example only capital letters (`ABCDEFGHIJKLMNOPQRSTUVWXYZ`).
- Option to throw on unrecognised characters.
- Source to upper/lower case transform. Allowing a smaller subset of characters to be used.
- Alternatives beyond the caesar cipher. For example hashing (md5 and/or sha256), encrypting (AES and/or RSA), and other encodings like Base64, ASCII, etc.
- Pipeline encodings/encryptions.
- Regex style alphabets, allowing for (for example) sub-cycles.
- More destinations and sources, for example encrypting to/from network sockets.
- Checks for correct stream buffer type, i.e. not JPEG.
- Unit tests.
- Tests with non ANSI characters like emojis and Chinese characters
