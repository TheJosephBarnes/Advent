import { testInput, input } from "./day14_input";

let startTime = Date.now();

const spinGrid = (grid, direction = "right") => {
    let height = grid.length;
    let width = grid[0].length;
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
    let grid = input.split('\n').map(row => row.split(''));
    // "left" is our north, so spin once 
    let startGrid = spinGrid(grid, "left");
    
    let repeatCheck = [startGrid];
    let repeatIndex = 0;
    let cycles = 0;

    for (cycles = 0; cycles < 1000000 && repeatIndex === 0; cycles++) {
        let newGrid = startGrid;
        //one spin in every direction per cycle
        for (let n = 0; n < 4; n++) {
            // tilt / move the rocks, then spin
            let shifted = moveRocks(newGrid);
            newGrid = spinGrid(shifted, "right");
        }

        let repeatCheckIndex = repeatCheck.map(g => g.toString()).indexOf(newGrid.toString());
        if (repeatCheckIndex >= 0) {
            repeatIndex = repeatCheckIndex;
        } else {
            repeatCheck.push(newGrid);
        }
        startGrid = newGrid;
    }

    startGrid = spinGrid(startGrid, "right");
    

    // why -2 ??
    let finalPlace = (1000000 - repeatIndex + 1)%(cycles - repeatIndex) - 3;
    let finalGrid = repeatCheck.slice(repeatIndex)[finalPlace];
    console.log(`${cycles} cycles in, repeat index ${repeatIndex} - final place ${finalPlace}`);
    return weighRocks(spinGrid(finalGrid, "right"))
}

console.log(tiltMap(testInput));
console.log(Date.now() - startTime, ' ms');
startTime = Date.now();
console.log(tiltMap(input));
console.log(Date.now() - startTime, ' ms');