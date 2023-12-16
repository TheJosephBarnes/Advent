import { testInput, input } from "./day15_input";

let startTime = Date.now();

const getHash = (line) => {
    let hash = 0;
    line.split('').forEach(char => {
        hash = ((hash + char.charCodeAt())*17)%256
    });
    // console.warn(`line ${line} - hash ${hash}`);
    return hash;
}

const getHashSum =(input) => {
    const lines = input.split(',');
    let hashSum = 0;
    lines.forEach(line => {
        hashSum += getHash(line);
    });
    return hashSum;
}

console.log(getHashSum(testInput));
console.log(Date.now() - startTime, ' ms');
startTime = Date.now();
console.log(getHashSum(input));
console.log(Date.now() - startTime, ' ms');