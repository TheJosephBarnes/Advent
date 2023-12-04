const { testInput2_1, inputDay2 } = require("./day2_input");

const MAX = {
    RED: 12,
    GREEN: 13,
    BLUE: 14
};

const isRoundValid = (round: string) => {
    let isValid = true;
    const red = round.match(/(\d*) red/g);
    const green = round.match(/(\d*) green/g);
    const blue = round.match(/(\d*) blue/g);

    // console.warn(`Red ${red ? red[0] : "NaN"}, Green ${green ? green[0] : "NaN"}, Blue ${blue ? blue[0] : "NaN"}`);

    if (red && parseInt(red[0]) > MAX.RED) isValid = false;
    if (green && parseInt(green[0]) > MAX.GREEN) isValid = false;
    if (blue && parseInt(blue[0]) > MAX.BLUE) isValid = false;

    return isValid;
};

const isGameValid = (game: string) => {
    const [title, results] = game.split(':');
    // console.warn(`Title: ${title}`);
    const gameNumber = parseInt(title.match(/\s(\d*)/g)[0]);
    let isValid = true;
    const rounds = results.split(';');
    rounds.forEach(round => {
        if (!isRoundValid(round)) isValid = false;
    });

    return {gameNumber, isValid};
};

const getAllValidity = (input: string) => {
    const games = input.split(/\n/);
    let checksum = 0;
    games.forEach(game => {
        let results = isGameValid(game);
         if (results.isValid) {
            // console.warn(`Game #${results.gameNumber}`);
            checksum += results.gameNumber;
         }
    });
    return checksum;
};

// console.log(getAllValidity(testInput1));
console.log(getAllValidity(inputDay2));