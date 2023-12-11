import { testInput, input } from "./day11_input";


const mapGalaxies = (input, expanse) => {
    let universe = input;
    let width = input.indexOf('\n')+1;

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

    //find all galaxies
    let galaxies = [];
    let id = 1;
    for (var i = 0; i < universe.length; i++) {
        if (universe[i] === '#') {
            let y = i%width;
            let x = Math.floor(i/width);
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
            let minX = galaxy.x < galaxies[n].x ? galaxy.x : galaxies[n].x;
            let maxX = galaxy.x >= galaxies[n].x ? galaxy.x : galaxies[n].x;
            for(let x = minX+1; x <= maxX; x++) {
                if (rows.indexOf(x) > -1) {
                    lengths += expanse;
                } else {
                    lengths++;
                }
            }

            let minY = galaxy.y < galaxies[n].y ? galaxy.y : galaxies[n].y;
            let maxY = galaxy.y >= galaxies[n].y ? galaxy.y : galaxies[n].y;
            for(let y = minY+1; y <= maxY; y++) {
                if (columns.indexOf(y) > -1) {
                    lengths += expanse;
                } else {
                    lengths++;
                }
            }
        }
    });

    return lengths;
}

console.log(mapGalaxies(testInput, 100));
console.log(mapGalaxies(input, 1000000));