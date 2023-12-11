import { testInput, input } from "./day11_input";

const mapGalaxies = (input) => {
    let universe = input;
    let width = input.indexOf('\n')+1;
    let height = Math.floor(input.length/width);

    // find universe expanding
    let rows = [];
    input.split('\n').forEach((row, index) => {
        if (row.replaceAll('.', '').length === 0) rows.push(index);
    });
    let columns = [];
    for(var n = 0; n < width; n++) {
        let col: any = '';
        for(var step = n; step < input.length; step+= width) {
            col = col + input[step];
        }
        if (col.replaceAll('.', '').length === 0) columns.push(n);
    }

    //manually expand your universe
    rows.reverse().forEach(place => {
        let line = new Array(width).join('.')+ '\n';
        let insertPoint = place*width;
        universe = universe.slice(0,insertPoint) + line + universe.slice(insertPoint);
        height++;
    });

    columns.reverse().forEach(place => {
        universe = universe.split('\n').map(row => {
            return row.slice(0,place) + '.' + row.slice(place);
        }).join('\n');
        width++;
    });

    //find all galaxies
    let galaxies = [];
    let id = 1;
    for (var i = 0; i < universe.length; i++) {
        if (universe[i] === '#') {
            let x = i%width;
            let y = Math.floor(i/width);
            galaxies.push({
                id: id++,
                x,
                y,
            });
        }
    }

    //now actually solve the problem
    let lengths = 0;
    galaxies.forEach((galaxy, index) => {
        for(var n = index; n < galaxies.length; n++) {
            lengths += Math.abs(galaxy.x - galaxies[n].x) + Math.abs(galaxy.y - galaxies[n].y);
        }
    });

    return lengths;
}

console.log(mapGalaxies(testInput));
console.log(mapGalaxies(input));