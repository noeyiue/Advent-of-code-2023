import fs from "fs";

function partOne(file) {
  const lines = fs.readFileSync(file, "utf-8").trim().toString().split("\n");
  const guides = lines[0];
//   console.log(guides);
  const dataMap = new Map();
  lines.splice(2).map((line) => {
    const [start, target] = line.split("=");
    const [targetL, targetR] = target
      .trim()
      .substring(1, target.length - 2)
      .split(", ");
    dataMap.set(start.trim(), { L: targetL, R: targetR });
  });
  // console.log(dataMap);
  let startLocation = "AAA";
  let navigateLocation = "";
  const target = "ZZZ";
  let step = 0;
  // console.log(dataMap.get(startLocation));
  while (target != navigateLocation) {
    const guide = guides[step % guides.length];
    // console.log(`Guide : ${guide}`);
    if (guide === "L") {
      navigateLocation = dataMap.get(startLocation).L;
    } else {
      navigateLocation = dataMap.get(startLocation).R;
    }
    // console.log(`${startLocation} => ${navigateLocation}`);
    startLocation = navigateLocation;
    step++;
  }
  console.log(step);
}

partOne('./input.txt');

// function checkIfEndPoints(locations) {
//     for (let i = 0; i < locations.length; i++) {
//         if (locations[i].trim().charAt(2) != 'Z') {
//             return false;
//         }
//     }
//     return true;
// }

function checkIfEndPoint(location) {
  if (location.trim().charAt(2) != "Z") {
    return false;
  }
  return true;
}

function move(map, start, guides) {
//   console.log(start);
  let step = 1;
  let end = "";
  while (!checkIfEndPoint(end)) {
    const guide = guides[(step - 1) % guides.length];
    if (guide === "L") {
      end = map.get(start).L;
    } else {
      end = map.get(start).R;
    }
    // console.log(`Step : ${step}, Start : ${start}, End : ${end}`);
    start = end;
    step++;
  }
  return step - 1;
}

const greatestCommonDivisor = (a, b) => {
  return b ? greatestCommonDivisor(b, a % b) : a;
};

const leastCommonMultiple = (a, b) => {
  return (a * b) / greatestCommonDivisor(a, b);
};

function partTwo(file) {
  const lines = fs.readFileSync(file, "utf-8").trim().toString().split("\n");
  const guides = lines[0];
  const dataMap = new Map();
  const startLocations = [];
  lines.splice(2).map((line) => {
    const [start, target] = line.split("=");
    const [targetL, targetR] = target
      .trim()
      .substring(1, target.length - 2)
      .split(", ");
    if (start.trim().charAt(2) === "A") {
      startLocations.push(start.trim());
    }
    dataMap.set(start.trim(), { L: targetL, R: targetR });
  });
  const lcmElement = startLocations.map((startLoaction) => {
    return move(dataMap, startLoaction, guides);
  });
  const lcm = lcmElement.reduce((a, b) => leastCommonMultiple(a, b));
  console.log(lcm);
}

partTwo("./input.txt");
