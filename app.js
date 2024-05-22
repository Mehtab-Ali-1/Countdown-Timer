#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
console.log(chalk.red(`\n\t\t*****  Wellcome to Countdown Timer  *****`));
console.log(chalk.bgRed(`\t\t                                         \n`));
const ans = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: chalk.cyan("Please enter your amount of seconds"),
    validate: (input) => {
        if (isNaN(input)) {
            return chalk.red("Please enter a valid number.");
        }
        else if (input > 60) {
            return chalk.red("Seconds must be in 60");
        }
        else {
            return true;
        }
    }
});
let input = ans.userInput;
function startTime(val) {
    const iniTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(iniTime);
    setInterval(() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currTime);
        if (timeDiff <= 0) {
            console.log(chalk.red(`Timer has expired.`));
            process.exit(0);
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.yellow(`${min.toString().padStart(2, "0")}`), `:`, chalk.yellow(`${sec.toString().padStart(2, "0")}`));
    }, 1000);
}
startTime(input);
