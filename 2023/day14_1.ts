import { testInput, input } from "./day14_input";

let startTime = Date.now();

const spinGrid = (grid, direction = "right") => {
    let height = grid.length;
    let width = grid[0].length;
    // let newGrid = new Array(width).fill(new Array(height));
    let newGrid = [];
    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            if (direction === "right") {
                if (!newGrid[x]) newGrid[x] = [];
                newGrid[x][height-y-1] = grid[y][x];
            } else {
                if (!newGrid[width-x-1]) newGrid[width-x-1] = [];
                newGrid[width-x-1][y] = grid[y][x];
            }
        }
    }
    return newGrid;
}

const moveRocks = (grid) => {
    let replacement = [];
    grid.forEach((row, y) => {
        let hardPlace = 0;
        replacement[y] = [];
        row.forEach((char, x) => {
            if (char === '#') {
                replacement[y][x] = '#';
                hardPlace = x+1;
            } else if (char === 'O') {
                replacement[y][x] = '.';
                replacement[y][hardPlace] = 'O';
                hardPlace++;
            } else {
                replacement[y][x] = '.'
            }
        });
    });
    return replacement;
}

const weighRocks = (grid) => {
    let weight = 0;
    grid.forEach((row, index) => {
        let stones = row.filter(a => a === 'O').length;
        let height = grid.length - index;
        weight += (stones * height);
    });
    return weight;
}

const tiltMap = (input) => {
    let grid = spinGrid(input.split('\n').map(row => row.split('')), "left");
    grid = spinGrid(moveRocks(grid), "right");
    return weighRocks(grid);
}

console.log(tiltMap(testInput));
console.log(Date.now() - startTime, ' ms');
startTime = Date.now();
console.log(tiltMap(input));
console.log(Date.now() - startTime, ' ms');