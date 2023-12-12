import { testInput5, testInput4, input } from "./day10_input";

let startTime = Date.now();

const getBranches = (node, grid) => {
    let branches = [];
    let [y,x] = node.location;

    if (node.connections.includes('top') && grid[y-1] && grid[y-1][x] && grid[y-1][x].connections.includes('bot') && grid[y-1][x].steps === null) {
        grid[y-1][x].steps = node.steps + 1;
        branches.push(grid[y-1][x]);
    }
    if (node.connections.includes('bot') && grid[y+1] && grid[y+1][x] && grid[y+1][x].connections.includes('top') && grid[y+1][x].steps === null) {
        grid[y+1][x].steps = node.steps + 1;
        branches.push(grid[y+1][x]);
    }
    if (node.connections.includes('left') && grid[y] && grid[y][x-1] && grid[y][x-1].connections.includes('right') && grid[y][x-1].steps === null) {
        grid[y][x-1].steps = node.steps + 1;
        branches.push(grid[y][x-1]);
    }
    if (node.connections.includes('right') && grid[y] && grid[y][x+1] && grid[y][x+1].connections.includes('left') && grid[y][x+1].steps === null) {
        grid[y][x+1].steps = node.steps + 1;
        branches.push(grid[y][x+1]);
    }
    return branches;
};

const mapLongest = (input) => {
    let start;
    const grid = input.split('\n').map((str, y) => str.split('').map((char, x) => {
        let connections = [];
        let location = [y,x];
        switch(char) {
            case 'F': {
                connections = ['bot', 'right'];
                break;
            }
            case 'L': {
                connections = ['top', 'right'];
                break;
            }
            case 'J': {
                connections = ['top','left'];
                break;
            }
            case '7': {
                connections = ['bot', 'left'];
                break;
            }
            case '|': {
                connections = ['bot', 'top'];
                break;
            }
            case '-': {
                connections = ['left', 'right'];
                break;
            }
            case 'S': {
                connections = ['left', 'right', 'top', 'bot'];
                break;
            }
            default: {
                connections = [];
                break;
            }
        }
        let item = {
            char,
            connections,
            location,
            steps: null,
        }

        if (char === 'S') {
            item.steps = 1;
            start = item;
        }
        return item;
    }));

    let nextLocations = getBranches(start, grid);
    while (nextLocations.length > 0) {
        nextLocations = nextLocations.map(a => getBranches(a, grid)).flat();
    }

    return grid.map(y => y.map(x =>  x.steps ? '+' : x.char).join('')).join('\n');
}

const floodOut = (node, grid) => {
    let branches = [];
    let [y,x] = node;
    grid[y][x] = '✴';

    if (grid[y-1] && grid[y-1][x] && grid[y-1][x] && grid[y-1][x] === '.') {
        grid[y-1][x] = 'O';
        branches.push([y-1,x]);
    }
    if (grid[y+1] && grid[y+1][x] && grid[y+1][x] && grid[y+1][x] === '.') {
        grid[y+1][x] = 'O';
        branches.push([y+1,x]);
    }
    if (grid[y] && grid[y][x-1] && grid[y][x-1] && grid[y][x-1] === '.') {
        grid[y][x-1] = 'O';
        branches.push([y,x-1]);
    }
    if (grid[y] && grid[y][x+1] && grid[y][x+1] && grid[y][x+1] === '.') {
        grid[y][x+1] = 'O';
        branches.push([y,x+1]);
    }
    grid[y][x] = ' ';
    return branches;
};

const mapChar = (char) => {
    switch(char) {
        case 'F': {
            return [
                '...',
                '.F-',
                '.|.'
            ];
        }
        case 'L': {
            return [
                '.|.',
                '.L-',
                '...'
            ];
        }
        case 'J': {
            return [
                '.|.',
                '-J.',
                '...'
            ];
        }
        case '7': {
            return [
                '...',
                '-7.',
                '.|.'
            ];
        }
        case '|': {
            return [
                '.|.',
                '.|.',
                '.|.'
            ];
        }
        case '-': {
            return [
                '...',
                '---',
                '...'
            ];
        }
        case 'S': {
            return [
                '.|.',
                '-S-',
                '.|.'
            ];
        }
        case '.': {
            return [
                '...',
                '...',
                '...'
            ];
        }
    }
}

const expand = (input) => {
    let output = '';

    input.split('\n').forEach(line => {
        let [line1, line2, line3] = ['', '', ''];
        line.split('').forEach(char => {
            let [one,two,three] = mapChar(char);
            line1 += one;
            line2 += two;
            line3 += three;
        });
        output += `${line1}\n${line2}\n${line3}\n`;
    });

    return output.slice(0,output.length - 1);
}

const validTile = (y,x,grid) => {
    let valid = false;

    if (grid[y-2] && grid[y+2]) {

        if (grid[y-1][x-1] === '.' &&
            grid[y+1][x+1] === '.' &&
            grid[y-1][x+1] === '.' &&
            grid[y+1][x-1] === '.'
            ) 
        {
            valid = true;
            grid[y][x] = 'X';
            grid[y-1][x-1] = ' ';
            grid[y-1][x] = ' ';
            grid[y-1][x+1] = ' ';
            grid[y][x-1] = ' ';
            grid[y][x+1] = ' ';
            grid[y+1][x-1] = ' ';
            grid[y+1][x] = ' ';
            grid[y+1][x+1] = ' ';
        }
    }

    return valid;
}

const mapLoop = (input) => {
    const expandedInput = mapLongest(expand(input));
    const grid = expandedInput.split('\n').map(str => str.split(''));

    // flood fill
    let startY = 0;
    let startX = 0;
    grid[startY][startX] = ' ';
    let nextLocations = floodOut([startY, startX], grid);
    let test = 0;
    while (nextLocations.length > 0) {
        // console.log(grid.map(a => a.map(b => b.steps).join('')).join('\n'));
        nextLocations = nextLocations.map(a => floodOut(a, grid)).flat();
        test++
        if (grid.flat().filter(a => a === '.').length === 0) console.warn(`dead after ${test}`);
    }

    let tiles = 0;

    //find valid tiles
    for (let y = 1; y < grid.length; y+=3) {
        for (let x = 1; x < grid[y].length; x+=3) {
            if (grid[y][x] !== ' ' && grid[y][x] !== '+') {
                tiles += validTile(y,x,grid) ? 1 : 0;
            }
        }
    }

    // return grid.flat().filter(a => a === '.').length;
    return tiles;
}

console.log(mapLoop(testInput4));
console.log(Date.now() - startTime, ' ms');
startTime = Date.now();
console.log(mapLoop(testInput5));
console.log(Date.now() - startTime, ' ms');
startTime = Date.now();
console.log(mapLoop(input));
console.log(Date.now() - startTime, ' ms');

// 391       low