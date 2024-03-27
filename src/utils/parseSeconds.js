/**
 * @typedef {Object} ParseUptime
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds 
 */

/**
 * function that parse days,hours,minutes and seconds
 * from seconds value as integer, the value of returns
 * is an object that contains every time unity as prop.
 * @typedef {Object} ParseUptime
 * @param {number} seconds 
 * @returns {ParseUptime}
 */
const parseSeconds = (seconds) => {
    /**
     * the code of below is from
     * https://www.satsig.net/training/seconds-days-hours-minutes-calculator.htm
     */
    let day = 86400;
    let hour = 3600;
    let minute = 60;

    let daysOut = Math.floor(seconds / day);
    let hoursOut = Math.floor((seconds - daysOut * day) / hour);
    let minutesOut = Math.floor(
        (seconds - daysOut * day - hoursOut * hour) / minute
    );
    let secondsOut = Math.floor(
        seconds - daysOut * day - hoursOut * hour - minutesOut * minute
    );
    return {
        days: daysOut,
        hours: hoursOut,
        minutes: minutesOut,
        seconds: secondsOut,
    };
};

export default parseSeconds;