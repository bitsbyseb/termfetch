#!/usr/bin/env node
import os from "node:os";
import figlet from "figlet";
import chalk from "chalk";

const printProgramName = async () => {
  try {
    await figlet.text(
      "termfetch",
      {
        font: "Ghost",
      },
      (err, data) => {
        if (err) {
          throw new Error(err);
        }

        console.log("\n" + chalk.red(data));
      }
    );
  } catch (err) {
    process.stderr.write(chalk.bgRed(err));
  }
};

/**
 * @typedef {Object} ParseUptime
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds 
 */

/**
 * 
 * @param {number} seconds 
 * @returns {ParseUptime}
 */
const parseSeconds = (seconds) => {
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
  /**
   * this code of above is from
   * https://www.satsig.net/training/seconds-days-hours-minutes-calculator.htm
   */
};

const printProps = () => {
  for (let prop in properties) {
    if (prop === "INFO_USER") {
      let separator = '';
      for (let i = 0;i < properties[prop].length/2;i++) {
        separator += '-';
      }

      process.stdout.write(`${properties[prop]}\n${separator}`);
    } else {
      process.stdout.write(
        `\n${chalk.red(prop)}:${properties[prop]}`
      );
    }
  }
};

const secondsFormat = parseSeconds(os.uptime());

const properties = {
  INFO_USER: `${chalk.red(os.userInfo().username)}@${chalk.red(os.hostname())}`,
  "CPU(S)": `${os.cpus()[0].model} ${
    os
      .cpus()
      .reduce((accumulator, current) => (accumulator += current.speed), 0) /
    os.cpus().length /
    1000
  } GHZ  (${os.cpus().length}x)`,
  UPTIME:
    `${secondsFormat.days} Days ${secondsFormat.hours} Hours ${secondsFormat.minutes} mins ${secondsFormat.seconds} secs`
  ,
  OS: os.version(),
  ARCH: os.arch(),
  KERNEL_VERSION: os.release(),
  OS_TYPE: os.type(),
  MEMORY: `${parseInt((os.totalmem() - os.freemem()) / 1_000_000)} MIB / ${
    parseInt(os.totalmem() / 1_000_000)
  } MIB (${parseInt(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%)`,
};

const main = async () => {
  await printProgramName();
  printProps();
};

export default main;