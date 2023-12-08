import { testInput, testInput2, input } from "./day8_input";

const readMap = (input) => {
    let [instructions, map] = input.split('\n\n');
    instructions = instructions.split('').map(a => {
        return a === 'L' ? 'left' : 'right';
    });
    map = map.split('\n').map(loc => {
        const [,location, left, right] = loc.match(/^(\w+) = \((\w+), (\w+)\)$/);
        return {
            location,
            left,
            right,
        };
    });

    let moves = 0;
    let place = map.map(a => a.location).indexOf('AAA');
    while (map[place].location !== 'ZZZ') {
        const destination = map[place][instructions[moves%instructions.length]];
        let next = map.map(a => a.location).slice(place, map.length).indexOf(destination);
        if (next === -1) {
            next = map.map(a => a.location).indexOf(destination);
        } else {
            next += place;
        }
        place = next;
        moves++;
    }
    return moves;
}

console.log(readMap(testInput));
console.log(readMap(testInput2));
console.log(readMap(input));