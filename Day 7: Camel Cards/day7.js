import fs from 'fs';

const cardStrengthA = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2",].reverse();
const cardStrengthB = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"].reverse();



function checkTypeA(dupMap) {
    // console.log(dupMap);
    
    const iterator1 = dupMap.values();
    let score = 0;
    let dups = [];
    for (let i = 0; i < dupMap.size; i++) {
        const dup = iterator1.next().value;
        dups.push(dup);
    }
    dups = dups.sort().reverse();
    // console.log(dups);
    for (let i = 0; i < dups.length; i++) {
        const dup = dups[i];
        if (dup === 5) {
            // console.log("Five of a kind");
            score = 7;
            break;
        } else if (dup === 4) {
            // console.log("Four of a kind");
            score = 6;
            break;
        } else if (dup === 3) {
            // console.log("Check Full house");
            if (dups[i+1] === 2) {
                // console.log("Full house");
                score = 5;
                break;
            } else {
                // console.log("Three of a kind");
                score = 4;
                break;
            }
        } else if (dup === 2) {
            // console.log("Check Two pair");
            if (dups[i+1] === 2) {
                // console.log("Two pair");
                score = 3;
                break;
            } else {
                // console.log("One pair");
                score = 2;
                break;
            }
        } else {
            score = 1;
        }
    }
    return score;
}

function checkTypeB(dupMap) {
    // console.log(dupMap);
    let jokerNum = 0;
    if (dupMap.get('J')) {
        jokerNum = dupMap.get('J');
        // console.log(`Have joker ${jokerNum}`);
        if (jokerNum === 5) {
            return 7;
        }
    }
    const iterator1 = dupMap.values();
    const iterator2 = dupMap.keys();
    let score = 0;
    let dups = [];
    for (let i = 0; i < dupMap.size; i++) {
        const dup = iterator1.next().value;
        const card = iterator2.next().value;
        if (card != "J")
        {
            dups.push(dup);
        }
    }
    dups = dups.sort().reverse();
    // console.log(dups);
    dups[0] = dups[0] + jokerNum;
    // console.log(dups);
    for (let i = 0; i < dups.length; i++) {
        const dup = dups[i];
        if (dup === 5) {
            // console.log("Five of a kind");
            score = 7;
            break;
        } else if (dup === 4) {
            // console.log("Four of a kind");
            score = 6;
            break;
        } else if (dup === 3) {
            // console.log("Check Full house");
            if (dups[i+1] === 2) {
                // console.log("Full house");
                score = 5;
                break;
            } else {
                // console.log("Three of a kind");
                score = 4;
                break;
            }
        } else if (dup === 2) {
            // console.log("Check Two pair");
            if (dups[i+1] === 2) {
                // console.log("Two pair");
                score = 3;
                break;
            } else {
                // console.log("One pair");
                score = 2;
                break;
            }
        } else {
            score = 1;
        }
    }
    return score;
}

function checkKindA(hand) {
    const cards = hand.split("");
    const dupMap = new Map();
    cards.map((card) => {
        // console.log(card);
        if (!dupMap.has(card)) {
            dupMap.set(card, 1);
            // console.log(dupMap);
        } else {
            dupMap.set(card, dupMap.get(card)+1);
        }
    })
    // console.log(dupMap);
    return checkTypeA(dupMap);
}

function checkKindB(hand) {
    const cards = hand.split("");
    const dupMap = new Map();
    cards.map((card) => {
        // console.log(card);
        if (!dupMap.has(card)) {
            dupMap.set(card, 1);
            // console.log(dupMap);
        } else {
            dupMap.set(card, dupMap.get(card)+1);
        }
    })
    // console.log(dupMap);
    return checkTypeB(dupMap);
}

function compareTwoHandA(hand1, hand2) {
    let winHand = 0;
    for (let i = 0; i < hand1.length; i++) {
        const strength1 = cardStrengthA.indexOf(hand1[i]);
        const strength2 = cardStrengthA.indexOf(hand2[i]);
        // console.log(`Compare ${hand1[i]} : ${strength1} and ${hand2[i]} : ${strength2}`);
        if (strength1 > strength2) {
            winHand = 1;
            break;
        } else if (strength2 > strength1) {
            winHand = -2;
            break;
        } 
    }
    return winHand;
}

function compareTwoHandB(hand1, hand2) {
    let winHand = 0;
    for (let i = 0; i < hand1.length; i++) {
        const strength1 = cardStrengthB.indexOf(hand1[i]);
        const strength2 = cardStrengthB.indexOf(hand2[i]);
        // console.log(`Compare ${hand1[i]} : ${strength1} and ${hand2[i]} : ${strength2}`);
        if (strength1 > strength2) {
            winHand = 1;
            break;
        } else if (strength2 > strength1) {
            winHand = -2;
            break;
        } 
    }
    return winHand;
}

function partOne(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().toString().split("\n");
    const data = lines.map((line) => {
        const hand = line.split(" ");
        // console.log(hand);
        const score = checkKindA(hand[0]);
        return {card : hand[0], bid : hand[1], score : score, rank : 0}
    })
    const dataByscore = data.sort((a, b) => a.score - b.score);
    const sortData = dataByscore.sort((a, b) => {
        if (a.score === b.score) {
            return compareTwoHandA(a.card, b.card);
        }
    });
    // console.log(sortData);
    let rank = 1;
    for (let i = 0; i < sortData.length; i++) {
        const hand = sortData[i];
        hand.rank = rank;
        rank++;
    }
    // console.log(sortData);
    const ans = sortData.reduce((a, c) => (a = a + (c.bid*c.rank)), 0)
    console.log(ans);
}   

// partOne("./input.txt")


function partTwo(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().toString().split("\n");
    const data = lines.map((line) => {
        const hand = line.split(" ");
        // console.log(hand);
        const score = checkKindB(hand[0]);
        return {card : hand[0], bid : hand[1], score : score, rank : 0}
    })
    // console.log(data);
    const dataByscore = data.sort((a, b) => a.score - b.score);
    const sortData = dataByscore.sort((a, b) => {
        if (a.score === b.score) {
            return compareTwoHandB(a.card, b.card);
        }
    });
    // console.log(sortData);
    let rank = 1;
    for (let i = 0; i < sortData.length; i++) {
        const hand = sortData[i];
        hand.rank = rank;
        rank++;
    }
    // console.log(sortData);
    const ans = sortData.reduce((a, c) => (a = a + (c.bid*c.rank)), 0)
    console.log(ans);
}   
partOne("./input.txt")

partTwo("./input.txt")