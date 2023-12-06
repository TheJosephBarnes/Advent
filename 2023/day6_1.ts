import { input, testInput } from "./day6_input";

const getRecords = (input) => {
    const [rawTimes, rawLengths] = input.split('\n');
    const times = rawTimes.match(/(\d+)/g).map(a => parseInt(a));
    const lengths = rawLengths.match(/(\d+)/g).map(a => parseInt(a));
    let margin = 1;

    for (let race = 0; race < times.length; race++) {
        let wins = 0;
        for (let x = 0; x < times[race]; x++) {
            if (x*(times[race]-x) > lengths[race]) wins++;
        }
        margin *= wins;
    }
    return margin;
}

console.log(getRecords(testInput));
console.log(getRecords(input));