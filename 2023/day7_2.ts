import { testInput, input } from "./day7_input";

const getRank = (hand) => {
    // split up by card type and sort from largest group to smallest
    let groups = hand.split('').sort().join('').match(/(.)\1*/g).sort((a,b) => b.length - a.length);

    // deal with wild cards
    const wilds = groups.findIndex(group => group.indexOf('J') >= 0);
    if (wilds !== -1) {
        const replace = groups.splice(wilds, 1);
        if (groups[0]) {
            groups[0] = groups[0].concat(replace);
        } else {
            groups = replace;
        }
    }

    // sort and filter by hand type
    if (groups.length === 5) {
        // high card
        return 0;
    } else if (groups.length === 4) {
        // single pair
        return 1;
    } else if (groups.length === 3) {
        if (groups[0].length === 2) {
            // two pair
            return 2;
        } else if (groups[0].length === 3) {
            // three of a kind
            return 3;
        }
    } else if (groups.length === 2) {
        if (groups[0].length === 3) {
            // full house
            return 4;
        } else if (groups[0].length === 4) {
            // four of a kind
            return 5;
        }
    } else {
        // five of a kind
        return 6;
    }
};

const getTieBreak = (card) => {
    return parseInt(card.replace('T', '10').replace('J', '1').replace('Q', '12').replace('K', '13').replace('A', '14'));
}

const higherHand = (hand, opponent) => {
    if (hand.rank > opponent.rank) {
        return true;
    } else if (hand.rank === opponent.rank) {
        if (getTieBreak(hand.hand[0]) > getTieBreak(opponent.hand[0])) {
            return true;
        } else if (getTieBreak(hand.hand[0]) === getTieBreak(opponent.hand[0])) {
            if (getTieBreak(hand.hand[1]) > getTieBreak(opponent.hand[1])) {
                return true;
            } else if (getTieBreak(hand.hand[1]) === getTieBreak(opponent.hand[1])) {
                if (getTieBreak(hand.hand[2]) > getTieBreak(opponent.hand[2])) {
                    return true;
                } else if (getTieBreak(hand.hand[2]) === getTieBreak(opponent.hand[2])) {
                    if (getTieBreak(hand.hand[3]) > getTieBreak(opponent.hand[3])) {
                        return true;
                    } else if (getTieBreak(hand.hand[3]) === getTieBreak(opponent.hand[3])) {
                        if (getTieBreak(hand.hand[4]) > getTieBreak(opponent.hand[4])) {
                            return true;
                        }
                    }
                }
            }
        }
    } else {
        return false;
    }
}

const findWinners = (input) => {
    const hands = input.split('\n');
    let results = [];

    hands.forEach(raw => {
        const [hand, bid] = raw.split(' ');
        const rank = getRank(hand);
        let result = {
            bid: parseInt(bid),
            hand,
            rank,
        };

        if (results.length === 0) {
            results.push(result);
        } else {
            for (let n=0; n <= results.length; n++) {
                if (!results[n]) {
                    // last index
                    results.push(result);
                    n++;
                } else if (!higherHand(result, results[n])) {
                    results = results.slice(0,n).concat([result], results.slice(n,results.length));
                    n = results.length + 1;
                }
            }
        }
    });

    let winnings = 0;
    results.forEach((hand, place) => {
        // console.log(`place ${place}`, hand);
        winnings += hand.bid * (place+1);
    });
    return winnings;
}

console.log(findWinners(testInput));
console.log(findWinners(input));