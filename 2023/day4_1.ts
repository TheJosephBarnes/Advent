import { testInput, input } from "./day4_input";

const getWinners = (input) => {
    let winnings = 0;
    const rawCards = input.split('\n');
    const cards = rawCards.map(raw => {
        const [,card, winners, ticket] = raw.match(/^Card[\s]+(\d+): ([\d\s]+) \| ([\d\s]+)$/);
        // console.log(`${card} - ${winners} , ${ticket}`);
        return {
            cardNumber: card,
            winners: winners.trim().split(/\s+/),
            ticket: ticket.trim().split(/\s+/)
        }
    });
    // console.log(cards);

    cards.forEach(card => {
        let n = 0;
        card.ticket.forEach(num => {
            if (card.winners.indexOf(num) >= 0) {
                n++;
                // console.log(`   match ${num}, sum is ${n}`);
            }
        });
        const extra = !!n ? 2**(n-1) : 0;
        // console.log(`Card ${card.cardNumber} - ${extra} points`);
        winnings += extra;
    })

    return winnings;
};

console.log(getWinners(testInput));
console.log(getWinners(input));
    // test.match(reg)[1].trim().split(/\s+/)