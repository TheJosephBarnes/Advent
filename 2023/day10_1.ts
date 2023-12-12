import { testInput, testInput2, input } from "./day10_input";

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
            item.steps = 0;
            start = item;
        }
        return item;
    }));

    let nextLocations = getBranches(start, grid);
    let longest = 0;

    while (nextLocations.length > 0) {
        longest = nextLocations.map(a => a.steps).sort().at(-1);
        nextLocations = nextLocations.map(a => getBranches(a, grid)).flat();
    }

    return longest;
}

console.log(mapLongest(testInput2));
console.log(mapLongest(testInput));