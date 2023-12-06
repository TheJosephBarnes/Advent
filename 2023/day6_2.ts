import { input, testInput } from "./day6_input";

const getRecord = (input) => {
    const [rawTime, rawLength] = input.split('\n');
    const time = parseInt(rawTime.replace(/\D/g, ''));
    const length = parseInt(rawLength.replace(/\D/g, ''));

    console.log(`Time ${time}ms, distance ${length}mm`);
    let wins = 0;

    for (let x = 0; x < time; x++) {
        if (x*(time-x) > length) wins++;
    }
    return wins;
}

console.log(getRecord(testInput));
console.log(getRecord(input));