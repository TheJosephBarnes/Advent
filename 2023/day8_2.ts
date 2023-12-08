import { testInput3, input } from "./day8_input";

const readMap = (input) => {
    let [instructions, map] = input.split('\n\n');
    instructions = instructions.split('').map(a => {
        return a === 'L' ? 'left' : 'right';
    });
    map = map.split('\n').map((loc, index) => {
        const [,location, left, right] = loc.match(/^(\w+) = \((\w+), (\w+)\)$/);
        return {
            location,
            left,
            right,
            index,
            z: 0
        };
    });

    let moves = 0;
    let starts = map.filter(a => a.location[2] === 'A');
    let ends = [];
    let allZ = false;
    while (!allZ) {
        starts = starts.map(loc => {
            if (loc.z === 0) {
                const search = loc[instructions[moves%instructions.length]];
                let destination = map.slice(loc.index, map.length).find(a => a.location === search);
                if (!destination) destination = map.find(a => a.location === search);
                if (destination.location[2] === 'Z') {
                    destination.z = moves+1;
                    ends.push(destination);
                }
                return destination;
            } else {
                return loc;
            }
        });

        starts = starts.filter(loc => !loc.z);

        allZ = starts.length === 0;
        moves++;
    }

    const gcd = (a, b) => a ? gcd(b % a, a) : b;
    const lcm = (a, b) => a * b / gcd(a, b);

    return ends.map(a => parseInt(a.z)).reduce(lcm);
}

console.log(readMap(testInput3));
console.log(readMap(input));