import fs from "fs";

function partOne(file) {
  const lines = fs.readFileSync(file, "utf-8").trim().toString().split("\n");
  const winning = lines.map((line) => {
    const sep = line.split("|");

    const winnings = sep[0]
      .trim()
      .split(" ")
      .slice(2)
      .filter((n) => n != "");
    const number = sep[1]
      .trim()
      .split(" ")
      .filter((n) => n != "");

    let ans = 0;
    for (let i = 0; i < winnings.length; i++) {
      const match = number.includes(winnings[i]);
      if (match) {
        ans += 1;
      }
    }
    return ans;
  });

  const ans = winning.reduce((a, c) => {
    if (c != 0) {
      const point = 2 ** (c - 1);
      a = a + point;
    }
    return a;
  }, 0);
  console.log(ans);
}

// partOne("./input.txt");

function partTwo(file) {
  const cards = [];
  const lines = fs.readFileSync(file, "utf-8").trim().toString().split("\n");
  const winning = lines.map((line) => {
    cards.push(1);
    const sep = line.split("|");

    const winnings = sep[0]
      .trim()
      .split(" ")
      .slice(2)
      .filter((n) => n != "");
    const number = sep[1]
      .trim()
      .split(" ")
      .filter((n) => n != "");

    let ans = 0;
    for (let i = 0; i < winnings.length; i++) {
      const match = number.includes(winnings[i]);
      if (match) {
        ans += 1;
      }
    }
    return ans;
  });

  for (let i = 0; i < winning.length; i++) {
    for (let j = 0; j < winning[i]; j++) {
      cards[i + j + 1] += cards[i];
    }
  }
  const ans = cards.reduce((a, c) => (a = a + c), 0);
  console.log(ans);
}

partTwo("./input.txt");

// o : 1  1  1  1  1  1
// 4 : 1* 2  2  2  2  1
// 2 : 1* 2* 4  4  2  1
// 2 : 1* 2* 4* 8  6  1
// 1 : 1* 2* 4* 8* 14 1
// 0 : 1*
// 0
