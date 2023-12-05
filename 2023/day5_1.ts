import { input, testInput } from "./day5_input";

const mapAtoB = (from, to, seed, rawDelta) => {
    let noChange = true;
    rawDelta.forEach(deltaString => {
        const delta = deltaString.split(' ').map(a => parseInt(a));
        const leastSeed = delta[1];
        const mostSeed = delta[1]+delta[2]-1;
        const change = delta[1] - delta[0];
        console.log(` ${seed[from]} ${from} is ${leastSeed} >= ${seed[from]} >= ${mostSeed}`);

        if (leastSeed <= seed[from] && seed[from] <= mostSeed && noChange) {
            seed[to] = seed[from] - change;
            console.log(`    seed ${seed.seed} using delta ${leastSeed} -> ${to} ${seed[to]}`);
            noChange = false;
            // console.log(seed);
            // return true;
        }
    });

    if (noChange) {
        seed[to] = seed[from];
        console.log(`    seed ${seed.seed} using default -> ${to} ${seed[to]}`);
    }

    return seed;
};

const mapSeeds = (input) => {
    let [seeds, soil, fertilizer, water, light, temp, humidity, location] = input.split('\n\n');

    // console.log(seeds);
    let seedMap = seeds.substring(seeds.indexOf(': ')+2, seeds.length).split(' ').map(seedInput => {
        return {
            seed: parseInt(seedInput),
            soil: null,
            fertilizer: null,
            water: null,
            light: null,
            temperature: null,
            humidity: null,
            location: null
        }
    });
    // console.log(seedMap);

    const soilDelta = soil.substring(soil.indexOf('\n')+1, soil.length).split('\n');
    const fertilizerDelta = fertilizer.substring(fertilizer.indexOf('\n')+1, fertilizer.length).split('\n');
    const waterDelta = water.substring(water.indexOf('\n')+1, water.length).split('\n');
    const lightDelta = light.substring(light.indexOf('\n')+1, light.length).split('\n');
    const temperatureDelta = temp.substring(temp.indexOf('\n')+1, temp.length).split('\n');
    const humidityDelta = humidity.substring(humidity.indexOf('\n')+1, humidity.length).split('\n');
    const locationDelta = location.substring(location.indexOf('\n')+1, location.length).split('\n');

    seedMap.forEach(seed => {
        //seed to soil
        seed = mapAtoB("seed", "soil", seed, soilDelta);
        //soil to fertilizer
        seed = mapAtoB("soil", "fertilizer", seed, fertilizerDelta);
        seed = mapAtoB("fertilizer", "water", seed, waterDelta);
        seed = mapAtoB("water", "light", seed, lightDelta);
        seed = mapAtoB("light", "temperature", seed, temperatureDelta);
        seed = mapAtoB("temperature", "humidity", seed, humidityDelta);
        seed = mapAtoB("humidity", "location", seed, locationDelta);
    });

    console.log(seedMap.map(seed => seed.location).sort((a,b) => a-b));
    return seedMap.map(seed => seed.location).sort((a,b) => a-b)[0];
}

// console.log(mapSeeds(testInput));
console.log(mapSeeds(input));