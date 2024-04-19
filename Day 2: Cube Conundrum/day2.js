import fs from 'fs';

const games = fs.readFileSync("./input.txt", 'utf-8').trim().toString().split("\n");

const limit = {
    "red" : 12,
    "green" : 13,
    "blue" : 14,
}

const impossibleCase = [];
const power = [];

for (let i = 0; i < games.length; i++) {
    // console.log(`game ${i}`);
    const game = games[i];
    const colonIndex = game.indexOf(":");
    const gameData = game.substring(colonIndex + 1);
    const set = gameData.split(';');
    const fewestNum = {
        "red" : 0,
        "green" : 0,
        "blue" : 0,
    }
    for (let j = 0; j < set.length; j++) {
        const colorAmount = set[j].split(",");
        // console.log(`set ${j} : ${colorAmount}`);
        // console.log(colorAmount);
        let results = {
            "red" : 0,
            "green" : 0,
            "blue" : 0,
        }
        for (let k = 0; k < colorAmount.length; k++) {
            let result = colorAmount[k].trim().split(" ");
            results[result[1]] = Number(result[0]);
            if (Number(result[0]) > limit[result[1]]) {
                // console.log(`${Number(result[0])} > ${limit[result[1]]}`);
                if (!impossibleCase.includes(i+1)) {
                    impossibleCase.push(Number(i)+1);
                }
            }
            if (Number(result[0]) > fewestNum[result[1]]) {
                fewestNum[result[1]] = Number(result[0]);
            }
        }
        // console.log(results);
    }
    // console.log("a");
    power.push(fewestNum['red']*fewestNum['blue']*fewestNum['green'])
}
// console.log(games.length);
// console.log(impossibleCase);

let ans1 = 0;

for (let i = 0; i < games.length; i++) {
    if (!impossibleCase.includes(i+1)) {
        ans1 = ans1 + i + 1;
    }
}

console.log(`Part 1 answer : ${ans1}`);

const ans2 = power.reduce((s, a) => s+a, 0)
console.log(`Part 2 answer : ${ans2}`);