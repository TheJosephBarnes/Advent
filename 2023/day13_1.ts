import { testInput, input } from "./day13_input";

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

const getMirrorLocation = (grid) => {
    let count = 0;
    for(var m = 1; m < grid[0].length && count === 0; m++) {
        let validM = grid.every(row => {
            let left = row.slice(0,m);
            let right = row.slice(m).reverse();
            if (left.length < right.length) {
                right = row.slice(m, 2*m).reverse();
            } else if (left.length > right.length) {
                left = row.slice(m - right.length, m);
            }
            return left.join('') === right.join('');
        });

        if (validM) count = m;
    }
    return count;
}

const findSymmetry = (pattern) => {
    let grid = pattern.split('\n').map(row => row.split(''));

    //check for vertical mirrors first
    let location = getMirrorLocation(grid);
    if (location) {
        return location;
    } else {
        //then, flip grid and check for horizontal mirrors
        grid = flipGrid(grid);
        location = getMirrorLocation(grid);
        return location*100;
    }
}

const findMirrors = (input) => {
    const patterns = input.split('\n\n');
    let total = 0;

    patterns.forEach((pattern, index) => {
        let count = findSymmetry(pattern);
        // console.log(`pattern ${index} - count ${count}`);
        total += count;
    });
    return total;
}

console.log(`test input - `,findMirrors(testInput));
console.log(Date.now() - startTime, ' ms');
startTime = Date.now();
console.log(`real input - `, findMirrors(input));
console.log(Date.now() - startTime, ' ms');