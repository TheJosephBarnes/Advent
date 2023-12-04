import { testInput, input1 } from "./day1_input";

const findDigitsInLine = (input) => {
    const digits = input.replace(/\D/g, '');
    // console.log(digits);
    const calibrationValue = digits[0] + digits[digits.length - 1];
    return parseInt(calibrationValue);
};

const getLineTotals = (input) => {
    let lines = input.split(/\n/g);
    let sum = 0;
    lines.forEach(line => {
        // console.log(`line - ${line}`);
        // console.log(findDigitsInLine(line));
        sum += findDigitsInLine(line);
    });
    return sum;
};

// console.log(getLineTotals(testInput));
console.log(getLineTotals(input1));