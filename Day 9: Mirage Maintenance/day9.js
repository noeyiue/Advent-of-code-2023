import fs from 'fs';

function checkAllZero(array) {
    return array.every((value) => value === 0);
}


function findDifferent(differents, history) {
    // console.log(history);
    let different = [];
    for (let i = 0; i < history.length-1; i++) {
        const num = history[i];
        const nextNum = history[i+1];
        different.push(nextNum-num);
    }
    differents.push(different);
    // console.log(differents);
    if (checkAllZero(different)) {
        // console.log("All Zero");
        return differents;
    }
    else {
        return findDifferent(differents, different);
    }
}

function findNextValues(lines, sequences) {
    const nextValues = lines.map((line, index) => {
        // console.log(line);
        line = line.split(" ");
        const numLength = sequences[index].length;
        const lastNum = [Number(line[line.length-1])];
        for (let i = 0; i < numLength; i++) {
            // console.log(sequences[index][i]);
            const l = sequences[index][i].length;
            lastNum.push(sequences[index][i][l-1]);
        }
        // console.log(lastNum);
        return lastNum.reduce((a, c) => a = a + c, 0);
    })
    return nextValues;
}

function partOne(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().toString().split("\n");
    const sequences = lines.map((line) => {
        let differents = [];
        return findDifferent(differents, line.split(" "));
    });
    const nextValues = findNextValues(lines, sequences);
    const ans = nextValues.reduce((a, c) => a = a + c, 0);
    console.log(ans);
}

partOne('./input.txt');

function findBeginningValues(lines, sequences) {
    const beginValues = lines.map((line, index) => {
        line = line.split(" ");
        // console.log(line);
        const numLength = sequences[index].length;
        const firstNum = [Number(line[0])];
        // console.log(firstNum);
        for (let i = 0; i < numLength-1; i++) {
            if (i%2 === 0) {
                firstNum.push(-1 * sequences[index][i][0]);
            } else {
                firstNum.push(sequences[index][i][0]);
            }
            // console.log(sequences[index][i]);
        }
        // console.log(firstNum);
        return firstNum.reduce((a, c) => a = a + c, 0);
    })
    return beginValues;
}

function partTwo(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().toString().split("\n");
    const sequences = lines.map((line) => {
        let differents = [];
        return findDifferent(differents, line.split(" "));
    });
    const nextValues = findBeginningValues(lines, sequences);
    const ans = nextValues.reduce((a, c) => a = a + c, 0);
    console.log(ans);
}

partTwo('./input.txt');
