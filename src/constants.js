import os from 'node:os';
import { join } from 'node:path';

export default {
    GLOBAL_ASCII:join(os.homedir(),'termfetch','asciiArt.txt'),
    LOCAL_ASCII:join(import.meta.filename.substring(0,import.meta.filename.length-16),'asciiArt.txt'),
}