import { testInput, input } from "./day3_input";

const getValidPart = (input, width, part) => {
    const index = input.indexOf(part);
    const row = Math.floor(index / width);
    const start = index%width;
    const end = (index + part.length)%width;
    let log = '';

    const leftBound = start === 0 ? start+1 : start;
    const rightBound = (end+1) === width ? end : end + 1;
    // console.log(`Part ${part} - row ${row}, from ${start} to ${end}`);
    // console.log(`left bound ${leftBound}, right bound ${rightBound}`);

    let chars = '';

    if (row !== 0) chars += input.substring((row-1)*width + leftBound-1, (row-1)*width + rightBound);
    log += `Part ${part} - ${chars}\n`;
    if (leftBound !== 0) chars += input.substring(row*width+leftBound-1, row*width+leftBound);
    log += `Part ${part} - ${chars}\n`;
    if (rightBound < width-1) chars += input.substring(row*width+rightBound-1, row*width+rightBound);
    log += `Part ${part} - ${chars}\n`;
    if ((row+1)*width <= input.length) chars += input.substring((row+1)*width + leftBound-1, (row+1)*width + rightBound);

    log += `Part ${part} - ${chars}`;
    chars = chars.replace(/[\d\s\.]+/g, '');
    // console.log(`Part ${part} - ${chars}`);
    const passed = chars.length > 0;
    log += `   Part ${passed ? "Pass" : "Fail"}`;
    if (false) {
        console.log(`left bound ${leftBound}, right bound ${rightBound}`);
        console.log(log);
    }

    return passed;
}

const getPartSum = (input) => {
    const parts = input.match(/(\d+)/g);
    const gridWidth = input.indexOf('\n')+1;
    // console.warn(`Test - ${input.substring(gridWidth, gridWidth*2)}`);
    let checksum = 0;

    // console.log(`Parts - ${parts}`);

    parts.forEach(part => {
        if(getValidPart(input, gridWidth, part)) {
            checksum += parseInt(part);
        }

        input = input.replace(part, new Array(part.length + 1).join('.'));
        // console.log(`${input}`);
    });
    return checksum;
};

// console.log(getPartSum(testInput));
console.log(getPartSum(input));