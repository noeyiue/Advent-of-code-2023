import fs from "fs";

function mapToCondition(line) {
  const con = [];
  const conditions = line.split(" ");
  const destination = Number(conditions[0]);
  const source = Number(conditions[1]);
  const range = Number(conditions[2]);
  con.push({ min: source, max: source + range, target: destination - source });
  return con;
}

function partOne(file) {
  const lines = fs.readFileSync(file, "utf-8").trim().toString().split("\n\n");
  const seeds = lines[0].split(" ").slice(1);
  const con = lines.slice(1).map((line) =>
    line
      .split("\n")
      .slice(1)
      .map((l) => mapToCondition(l))
  );
  const location = [];
  for (let i = 0; i < seeds.length; i++) {
    const seed = Number(seeds[i]);
    let currentNum = seed;
    // console.log(`seed: ${seeds[i]}`);
    for (let j = 0; j < con.length; j++) {
      // console.log(`step: ${j}`);
      for (let k = 0; k < con[j].length; k++) {
        let c = con[j][k];
        if (currentNum >= c[0].min && currentNum < c[0].max) {
          currentNum = currentNum + c[0].target;
          break;
        } else {
          currentNum = currentNum;
        }
        // console.log(c);
        // console.log(currentNum);
      }
      // console.log(`RESULT step ${j} : ${currentNum}`);
    }
    location.push(currentNum);
  }
  const ans = location.sort()[0];
  console.log(ans);
}

partOne("./input.txt");

// function partTwo(file) {
//   const lines = fs.readFileSync(file, "utf-8").trim().toString().split("\n\n");
//   const seeds = lines[0].split(" ").slice(1);

//   const con = lines.slice(1).map((line) =>
//     line
//       .split("\n")
//       .slice(1)
//       .map((l) => mapToCondition(l))
//   );

//   let minimum = Infinity;
//   for (let i = 0; i < seeds.length; i += 2) {
//     const seed = Number(seeds[i]);
//     const addition = Number(seeds[i + 1]);


//     for (let a = 0; a < addition; a++) {
//       let currentNum = seed + a;
//       console.log(`seed = ${currentNum}`);
//       con.map((c) => {
//         const match = c.find(line => { 
//           return currentNum >= line[0].min && currentNum < line[0].max 
//         })
//         if (match) {
//           currentNum = currentNum + match[0].target;
//           // console.log(match);
//           // console.log(currentNum);
//         } else {
//           // console.log("Not Match");
//           currentNum = currentNum;
//           // console.log(currentNum);
//         }
//       })
//       if (currentNum < minimum) {
//         minimum = currentNum;
//       }
//       }
//     }
//     console.log(minimum);
//   }

// partTwo("./input.txt");
