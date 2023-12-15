import { testInput, input } from "./day14_input";

let startTime = Date.now();

const flipGrid = (grid) => {
    let newGrid = [];
    for(var y = 0; y < grid.length; y++) {
        for(var x = 0; x < grid[y].length; x++) {
            if (!newGrid[x]) newGrid[x] = [];
            newGrid[x][y] = grid[y][x];
        }
    }
    return newGrid;
}

const tiltMap = (input) => {
    let map = flipGrid(input.split('\n').map(row => row.split('')));
    let weightMap = map.map(row => {
        let sorted = row.join('').split('#').map(sec => sec.split('').sort().reverse().join('')).join('#').split('');
        let weight = 0;
        sorted.forEach((spot, index) => {
            if (spot === 'O') weight += row.length - index;
        })
        return weight;
    });

    return weightMap.reduce((a,b) => a + b);
}

console.log(tiltMap(testInput));
console.log(Date.now() - startTime, ' ms');
startTime = Date.now();
console.log(tiltMap(input));
console.log(Date.now() - startTime, ' ms');