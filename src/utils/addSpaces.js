/**
 * returns the same arr but with the same length in all
 * elements.it add spaces when it detects a place that 
 * doesn't have the max length,the function doesn't change
 * the string content,it just make it more consistent.
 * @param {string[]} arr 
 * @param {number} maxLength
 * @returns {Promise<string[]>} 
 */
export async function addSpaces(arr, maxLength) {
    const charToInject = ' ';
    const result = [];
    for await (let line of arr) {
        if (line && maxLength > line.length) {
            result.push(line.concat(charToInject.repeat(maxLength-(line.length))));
        } else {
            result.push(line);
        }
    }
    return result;
}