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
    // console.log(map);

    let moves = 0;
    let place = map.map(a => a.location).indexOf('AAA');
    while (map[place].location !== 'ZZZ') {
        // console.log(`now at - `, map[place]);
        const destination = map[place][instructions[moves%instructions.length]];
        // console.log(`  go ${instructions[moves%instructions.length]} to - `, destination);
        let next = map.map(a => a.location).slice(place, map.length).indexOf(destination);
        if (next === -1) {
            next = map.map(a => a.location).indexOf(destination);
        } else {
            next += place;
        }
        // console.log(`    index of next ${next}`);
        place = next;
        moves++;
    }
    return moves;
}

console.log(readMap(testInput));
console.log(readMap(testInput2));
console.log(readMap(input));