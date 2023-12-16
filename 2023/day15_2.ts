import { testInput, input } from "./day15_input";

let startTime = Date.now();

const PARSER = /^(\w+)(=|-)(\d*)$/;

const getHash = (line) => {
    let hash = 0;
    line.split('').forEach(char => {
        hash = ((hash + char.charCodeAt())*17)%256
    });
    return hash;
}

const getLensMap =(input) => {
    const lines = input.split(',');
    let boxes = new Array(256);
    let lenses = [];


    const runCommand = (lens) => {
        if (!boxes[lens.hash]) boxes[lens.hash] = [];
        let currentBox = boxes[lens.hash];
        const lensIndex = currentBox.map(a => a.key).indexOf(lens.key);

        if (lens.command === "-" && lensIndex >= 0) {
            currentBox = currentBox.slice(0,lensIndex).concat(currentBox.slice(lensIndex+1));
        } else if (lens.command === '=') {
            if (lensIndex >= 0) {
                currentBox[lensIndex] = lens;
            } else {
                currentBox.push(lens);
            }
        }

        boxes[lens.hash] = currentBox;
    }

    lines.forEach(line => {
        const [,key,command,length] = line.match(PARSER);
        const hash = getHash(key);
        const lens = {
            key,
            hash,
            command,
            focus: parseInt(length)
        }
        lenses.push(lens);
        runCommand(lens);
    });

    // console.log(boxes);
    let sum = 0;
    boxes.forEach((box, index) => {
        box.forEach((lens, spot) => {
            sum += (index+1)*(spot+1)*lens.focus;
        });
    });

    return sum;
}

console.log(getLensMap(testInput));
console.log(Date.now() - startTime, ' ms');
startTime = Date.now();
console.log(getLensMap(input));
console.log(Date.now() - startTime, ' ms');