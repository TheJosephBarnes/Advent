import { input, testInput } from "./day5_input";

const mapAtoB = (from, to, seed, rawDelta) => {
    let noChange = true;
    // console.log(rawDelta);
    rawDelta.forEach(deltaString => {
        const delta = deltaString.split(' ').map(a => parseInt(a));
        const leastSeed = delta[0];
        const mostSeed = delta[0]+delta[2]-1;
        const change = delta[0] - delta[1];
        // console.log(` ${seed[from]} ${from} is ${leastSeed} >= ${seed[from]} >= ${mostSeed}`);

        if (leastSeed <= seed[from] && seed[from] <= mostSeed && noChange) {
            seed[to] = seed[from] - change;
            // console.log(`    seed ${seed.seed} using delta ${leastSeed} -> ${to} ${seed[to]}`);
            noChange = false;
            // console.log(seed);
            // return true;
        }
    });

    if (noChange) {
        seed[to] = seed[from];
        // console.log(`    seed ${seed.seed} using default -> ${to} ${seed[to]}`);
    }

    return seed;
};

const isSeedValid = (seed, seedPairs) => {
    let valid = false;
    seedPairs.forEach(pair => {
        // const [min, range] = pair.split(' ').map(a => parseInt(a));
        const [min, range] = pair;
        if (min <= seed.seed && seed.seed < (min+range)) {
            valid = true;
        }
    });
    return valid;
};

const mapSeeds = (input) => {
    let validLocation = null;
    let [seeds, soil, fertilizer, water, light, temp, humidity, location] = input.split('\n\n');

    // console.log(seeds);
    const seedPairs = seeds.substring(seeds.indexOf(': ')+2, seeds.length).match(/(\d+ \d+)/g).map(a => a.split(' ').map(b => parseInt(b)));
    console.warn(seedPairs);

    const soilDelta = soil.substring(soil.indexOf('\n')+1, soil.length).split('\n');
    const fertilizerDelta = fertilizer.substring(fertilizer.indexOf('\n')+1, fertilizer.length).split('\n');
    const waterDelta = water.substring(water.indexOf('\n')+1, water.length).split('\n');
    const lightDelta = light.substring(light.indexOf('\n')+1, light.length).split('\n');
    const temperatureDelta = temp.substring(temp.indexOf('\n')+1, temp.length).split('\n');
    const humidityDelta = humidity.substring(humidity.indexOf('\n')+1, humidity.length).split('\n');
    const locationDelta = location.substring(location.indexOf('\n')+1, location.length).split('\n');

    for(var loc = 30000000; !validLocation; loc++) {
        let seed = {
            seed: null,
            soil: null,
            fertilizer: null,
            water: null,
            light: null,
            temperature: null,
            humidity: null,
            location: loc
        };
        
        seed = mapAtoB("location", "humidity", seed, locationDelta);
        seed = mapAtoB("humidity", "temperature", seed, humidityDelta);
        seed = mapAtoB("temperature", "light", seed, temperatureDelta);
        seed = mapAtoB("light", "water", seed, lightDelta);
        seed = mapAtoB("water", "fertilizer", seed, waterDelta);
        seed = mapAtoB("fertilizer", "soil", seed, fertilizerDelta);
        seed = mapAtoB("soil", "seed", seed, soilDelta);

        if (isSeedValid(seed, seedPairs)) validLocation = seed;
        // if (seed.location%100000 === 0) console.log(seed)
    };

    // console.log(seedMap.map(seed => seed.location).sort((a,b) => a-b), seedMap.length);
    // return seedMap.map(seed => seed.location).sort((a,b) => a-b)[0];
    return validLocation.location;
}

console.log(mapSeeds(testInput));
console.log(mapSeeds(input));