import { testInput2, input1 } from "./day1_input";

const getDigit = (digitText: string) => {
    // console.log(digitText);
    if (digitText?.length > 1) {
        if (digitText === "one") return 1;
        if (digitText === "two") return 2;
        if (digitText === "three") return 3;
        if (digitText === "four") return 4;
        if (digitText === "five") return 5;
        if (digitText === "six") return 6;
        if (digitText === "seven") return 7;
        if (digitText === "eight") return 8;
        if (digitText === "nine") return 9;
    } else {
        return parseInt(digitText);
    }
};

const findDigitsInLine = (input: string) => {
    const first = input.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/);
    const last = input.split('').reverse().join('').match(/(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/);
    // console.log(`${first[0]} - ${last[0]}`);
    const firstDigit = getDigit(first[0]);
    const lastDigit = getDigit(last[0].split('').reverse().join(''));
    return firstDigit*10 + lastDigit;
};

const getLineTotals = (input: string) => {
    let lines = input.split(/\n/g);
    let sum = 0;
    lines.forEach(line => {
        // console.log(`line - ${line}`);
        // console.log(findDigitsInLine(line));
        sum += findDigitsInLine(line);
    });
    return sum;
};

console.log(getLineTotals(`Test Output - ${testInput2}`));
console.log(getLineTotals(`Real Output - ${input1}`));