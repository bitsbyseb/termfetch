import * as readline from 'node:readline/promises';
import { createReadStream } from 'node:fs';
import { maxLengthStr } from './maxLength.js';
import { addSpaces } from './addSpaces.js';
import { fileExists } from './fileExists.js';
import constants from '../constants.js';
/**
 * function that parse an ascii logo from local file
 * on user's storage,it returns an array with every
 * line of the ascii logo.
 */
async function parseAscii() {
    let path = constants.LOCAL_ASCII;
    const existsConfigFile = await fileExists(constants.GLOBAL_ASCII);

    if (existsConfigFile) {
        path = constants.GLOBAL_ASCII;
    }
    
    const intl = readline.createInterface(createReadStream(path));
    let lines = [];
    for await (let line of intl) {
        lines.push(line);
    }
    const finalResult = await addSpaces(lines,maxLengthStr(lines));
    return finalResult;
}
export default parseAscii;