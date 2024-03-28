/**
 * returns the biggest length from a string array
 * @param {string[]} arr 
 * @returns {number}
 */
export function maxLengthStr(arr) {
    let result = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element && element.length > result) {
            result = element.length;
        }
        continue;
    }
    return result;
}