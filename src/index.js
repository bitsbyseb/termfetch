import os from "node:os";
import chalk from "chalk";
import parseSeconds from './utils/parseSeconds.js';
import parseAscii from "./utils/parseAscii.js";
import path, { join } from "node:path";

/**
 * returns the longer number between
 * two numbers
 * @param {number} num1 
 * @param {number} num2 
 * @returns {number}
 */
const longerNumber = (num1,num2) => {
  return num1 > num2 ? num1 : num2;
}

const printInfo = async () => {
  // yeah this line is very bad, but i dunno how call the main module directory
  const ascii = await parseAscii(join(import.meta.filename.substring(0,import.meta.filename.length-12),'asciiArt.txt'));
  const propertyKeys = Object.keys(properties);
  const length = longerNumber(propertyKeys.length,ascii.length);

  for (let i = 0;i<=length;i++) {
    let asciiLine = ascii[i];
    let key = propertyKeys[i];
    let value = properties[propertyKeys[i]];

    let propertyString = undefined;
    if (key && value) {
      propertyString = `${chalk.green(key) ?? ''}: ${value ?? ''}`
    }

    process.stdout.write(`\n${chalk.greenBright(asciiLine ?? '')} \t ${propertyString ?? ''}`);
  }
};

const secondsFormat = parseSeconds(os.uptime());

const properties = {
  INFO_USER: `${os.userInfo().username}@${os.hostname()}`,
  CPUS: `${os.cpus()[0].model} ${
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
  await printInfo();
};

export default main;