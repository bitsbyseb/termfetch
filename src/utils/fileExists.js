import { access, constants } from 'node:fs/promises';
// by default nodejs have an fs.exists file but it is very bad
// and its deprecated.
/**
 * 
 * @param {string} path 
 * @returns {Promise<boolean>}
 */
export async function fileExists(path) {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}