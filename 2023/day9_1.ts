import { testInput, input } from "./day9_input";

const getNext = (line) => {
    let deltas = [line];
    let lastLine = false;
    let index = 1;

    while (!lastLine) {
        deltas[index] = [];
        for (let n = 0; n < deltas[index-1].length - 1; n++) {
            deltas[index][n] = deltas[index-1][n+1] - deltas[index-1][n];
        }
        lastLine = deltas[index].every( n => n == 0 );
        index++;
    }

    const next = deltas.reduceRight((acc, ind) => {
        const val = ind.at(-1);
        return val + acc;
    }, 0);

    return next;
}

const getOasis = (input) => {
    const sequences = input.split('\n').map(a => a.split(' ').map(b => parseInt(b)));
    let sum = 0;
    sequences.forEach(line => {
        const next = getNext(line);
        sum += next;
    });

    return sum;
}

console.log(getOasis(testInput));
console.log(getOasis(input));