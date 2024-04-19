import fs from 'fs';

function partOne(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().toString().split("\n");
    const values = lines.map((line) => {
        const firstnum = line.split("").find((v) => !Number.isNaN(Number(v)));
        const lastnum = line.split("").findLast((v) => !Number.isNaN(Number(v)));
        return Number(firstnum + lastnum);
    })
    const initialValues = 0;
    const ans = values.reduce((accumulator, currentValue) => accumulator + currentValue, initialValues);
    console.log(ans);
}

partOne("./input.txt");

function partTwo(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().toString().split("\n");
    console.log(lines);
    const numLines = lines.map((line) => {
        return line.replaceAll("one","o1ne").replaceAll("two","t2wo").replaceAll("three","t3hree").replaceAll("four","f4our").replaceAll("five","f5ive").replaceAll("six","s6ix").replaceAll("seven","s7even").replaceAll("eight","e8ight").replaceAll("nine","n9ine");
    });
    console.log(numLines);
    const values = numLines.map((line) => {
        const firstnum = line.split("").find((v) => !Number.isNaN(Number(v)));
        const lastnum = line.split("").findLast((v) => !Number.isNaN(Number(v)));
        return Number(firstnum + lastnum);
    })
    console.log(values);
    const initialValues = 0;
    const ans = values.reduce((accumulator, currentValue) => accumulator + currentValue, initialValues);
    console.log(ans);
}

partTwo("./input.txt");
