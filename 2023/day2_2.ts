import { testInput1, input1 } from "./day2_input";


// const isRoundValid = (round: string) => {
//     let isValid = true;
//     const red = round.match(/(\d*) red/g);
//     const green = round.match(/(\d*) green/g);
//     const blue = round.match(/(\d*) blue/g);

//     // console.warn(`Red ${red ? red[0] : "NaN"}, Green ${green ? green[0] : "NaN"}, Blue ${blue ? blue[0] : "NaN"}`);

//     if (red && parseInt(red[0]) > MAX.RED) isValid = false;
//     if (green && parseInt(green[0]) > MAX.GREEN) isValid = false;
//     if (blue && parseInt(blue[0]) > MAX.BLUE) isValid = false;

//     return isValid;
// };

const getGamePower = (game: string) => {
    const [title, results] = game.split(':');
    const gameNumber = parseInt(title.match(/\s(\d*)/g)[0]);
    // let gamePower = 0;
    let [redMax, greenMax, blueMax] = [0,0,0];

    const rounds = results.split(';');
    rounds.forEach(round => {
        const red = round.match(/(\d*) red/g);
        const green = round.match(/(\d*) green/g);
        const blue = round.match(/(\d*) blue/g);

        if (red && parseInt(red[0]) > redMax) redMax = parseInt(red[0]);
        if (green && parseInt(green[0]) > greenMax) greenMax = parseInt(green[0]);
        if (blue && parseInt(blue[0]) > blueMax) blueMax = parseInt(blue[0]);
    });

    return redMax*greenMax*blueMax;
};

const getAllValidity = (input: string) => {
    const games = input.split(/\n/);
    let checksum = 0;
    games.forEach(game => {
        checksum += getGamePower(game);
    });
    return checksum;
};

// console.log(getAllValidity(testInput1));
console.log(getAllValidity(input1));