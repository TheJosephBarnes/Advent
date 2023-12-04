import { testInput, input } from "./day3_input";

const partInRange = (part, gear, width) => {
    const topLeft = gear.index - width - 1;
    const topRight = gear.index - width + 1;
    const sideLeft = gear.index - 1;
    const sideRight = gear.index + 1;
    const botLeft = gear.index + width - 1;
    const botRight = gear.index + width + 1;
    // console.log(`top ${topLeft} - ${topRight}`);
    // console.log(`left ${sideLeft}, right ${sideRight}`);
    // console.log(`bottom ${botLeft} - ${botRight}\n`);

    const isInTop = (part.start >= topLeft && part.start <= topRight) || (part.end >= topLeft && part.end <= topRight);
    const isOnSide = part.start === sideRight || part.end === sideLeft;
    const isOnBottom = (part.start >= botLeft && part.start <= botRight) || (part.end >= botLeft && part.end <= botRight);

    return isInTop || isOnSide || isOnBottom;
};

const getGearSum = (rawInput) => {
    let input = rawInput;
    let checksum = 0;
    const parts = input.match(/(\d+)/g);
    const gridWidth = input.indexOf('\n')+1;
    let gearList = [];
    while (input.indexOf('*') >= 0) {
        gearList.push({
            index: input.indexOf('*'),
            parts: []
        });
        input = input.replace('*', '.');
    }
    const partList = parts.map((partNumber) => {
        let start = input.indexOf(partNumber);
        let end = start+partNumber.length-1;
        input = input.replace(partNumber, new Array(partNumber.length + 1).join('.'));
        return {
            partNumber,
            start,
            end
        }
    });

    // console.log(gearList);
    gearList.forEach(gear => {
        partList.forEach(part => {
            // console.log(part);
            if (gear.parts.length < 2) {
                if (partInRange(part, gear, gridWidth)) {
                    gear.parts.push(part.partNumber);
                }
            }
        });
        // console.log(gear);
        if (gear.parts.length === 2) {
            checksum += gear.parts.reduce((a,b) => a*b);
        }
    });

    console.log(partList);
    console.log(gearList);

    return checksum;
};

console.log(getGearSum(testInput));
console.log(getGearSum(input));