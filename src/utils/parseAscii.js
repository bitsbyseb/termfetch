import * as readline from 'node:readline/promises';
import { createReadStream } from 'node:fs';

/**
 * function that parse an ascii logo from local file
 * on user's storage,it returns an array with every
 * line of the ascii logo.
 * @param {string} path 
 */
async function parseAscii(path) {
    const intl = readline.createInterface(createReadStream(path));
    const lines = [];

    for await (let line of intl) {
        lines.push(line);
    }
    return lines;
}
export default parseAscii;