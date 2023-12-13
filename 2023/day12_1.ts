import { testInput, input } from "./day12_input";

let startTime = Date.now();

const findOptions = (input) => {
    let rows = input.split('\n').map(row => {
        let count = 0;
        let [map, sequence] = row.split(' ');
        map = map.split('');
        sequence = sequence.split(',').map(n => parseInt(n));

        let blanks = map.filter(a => a === '?').length;

        for(let n = 0; n < 2**blanks; n++) {
            //create array with unique binary pattern
            let pattern = (n).toString(2).split('');
            let missing = new Array(blanks+1 - pattern.length).join('0').split('');
            pattern = missing.concat(pattern);

            let index = 0;
            let tester = '';
            for (let x = 0; x < map.length; x++) {
                if (map[x] === '?') {
                    tester += pattern[index++] === '1' ? '#' : '.';
                } else {
                    tester += map[x];
                }
            }

            //check generated pattern against validity sequence
            // console.log(tester);
            let mapCheck = tester.split(/\.+/g).map(a => a.length).filter(b => b != 0).toString();
            if (mapCheck == sequence.toString()) count++;
        }

        return {
            map,
            sequence,
            count,
        }
    });

    return rows.reduce((a,b) => a + b.count, 0);
}

console.log(findOptions(testInput));
console.log(Date.now() - startTime, ' ms');
startTime = Date.now();
console.log(findOptions(input));
console.log(Date.now() - startTime, ' ms');