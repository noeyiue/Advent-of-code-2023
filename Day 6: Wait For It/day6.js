import fs from "fs";

function partOne(file) {
  const lines = fs.readFileSync(file, "utf-8").trim().split("\n");
  const parsedData = lines.map((line) => {
    const [, valuesString] = line.split(":");
    const values = valuesString
      .trim()
      .split(" ")
      .filter((val) => val !== "");
    return values;
  });
  const round = parsedData[0].length;
  const times = parsedData[0];
  const distances = parsedData[1];
  let ans = 1;
  for (let i = 0; i < round; i++) {
    const time = times[i];
    const distance = distances[i];
    let leastTime = 0;
    // console.log(`Round ${i} time ${time} distance ${distance}`);
    // find least time
    for (leastTime = 1; leastTime < time; leastTime++) {
      const traveltime = time - leastTime;
      const currentDistance = traveltime * leastTime;
      if (currentDistance > distance) {
        // console.log(`Pressed btn ${leastTime} seconds => ${currentDistance} millimeters`);
        break;
      }
    }
    // find max time
    let mostTime = time;
    for (mostTime = time; mostTime > 0; mostTime--) {
      const traveltime = time - mostTime;
      const currentDistance = traveltime * mostTime;
      if (currentDistance > distance) {
        // console.log(`Pressed btn ${mostTime} seconds => ${currentDistance} millimeters`);
        break;
      }
    }
    const waysTowin = mostTime - leastTime + 1;
    // console.log(waysTowin);
    ans = ans * waysTowin;
  }
  console.log(ans);
}

partOne("./input.txt");

function partTwo(file) {
  const lines = fs.readFileSync(file, "utf-8").trim().split("\n");
  const parsedData = lines.map((line) => {
    const [, valuesString] = line.split(":");
    const values = valuesString
      .trim()
      .split(" ")
      .filter((val) => val !== "");
    const concatenatedString = values.join("");
    return concatenatedString;
  });
//   console.log(parsedData);

  const time = parsedData[0];
  const distance = parsedData[1];

  let leastTime = 0;

  // find least time
  for (leastTime = 1; leastTime < time; leastTime++) {
    const traveltime = time - leastTime;
    const currentDistance = traveltime * leastTime;
    if (currentDistance > distance) {
    //   console.log(
    //     `Pressed btn ${leastTime} seconds => ${currentDistance} millimeters`
    //   );
      break;
    }
  }
  // find max time
  let mostTime = time;
  for (mostTime = time; mostTime > 0; mostTime--) {
    const traveltime = time - mostTime;
    const currentDistance = traveltime * mostTime;
    if (currentDistance > distance) {
    //   console.log(
    //     `Pressed btn ${mostTime} seconds => ${currentDistance} millimeters`
    //   );
      break;
    }
  }
  const waysTowin = mostTime - leastTime + 1;

  console.log(waysTowin);
}

partTwo("./input.txt");
