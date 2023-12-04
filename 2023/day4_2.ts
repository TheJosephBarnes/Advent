import { testInput, input } from "./day4_input";

const getWinners = (input) => {
    // let winnings = 0;
    const rawCards = input.split('\n');
    let cards = rawCards.map(raw => {
        const [,card, winners, ticket] = raw.match(/^Card[\s]+(\d+): ([\d\s]+) \| ([\d\s]+)$/);
        // console.log(`${card} - ${winners} , ${ticket}`);
        return {
            cardNumber: card,
            winners: winners.trim().split(/\s+/),
            ticket: ticket.trim().split(/\s+/),
            copies: 1,
        }
    });
    // console.log(cards);

    for(var i=0; i < cards.length; i++) {
        const card = cards[i];
        let extra = 0;
        card.ticket.forEach(num => {
            if (card.winners.indexOf(num) >= 0) {
                extra++;
                // console.log(`   match ${num}, sum is ${n}`);
            }
        });
        // console.log(`Card ${card.cardNumber} - ${extra} points`);
        // winnings += extra;
        // if (extra) cards = cards.concat(cards.slice(i, i+extra));
        for (var n = i+1; n <= i+extra; n++) {
            cards[n].copies += card.copies;
            // console.log(`    Card ${cards[n].cardNumber} gains ${card.copies} copies`);
        }
    }
    // console.log(cards.map(card => `Card ${card.cardNumber} - ${card.copies} copies`));
    return cards.map(a => a.copies).reduce((a,b) => a+b);
};

console.log(getWinners(testInput));
console.log(getWinners(input));
    // test.match(reg)[1].trim().split(/\s+/)