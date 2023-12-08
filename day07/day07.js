const { readFileSync } = require("fs");
const lodash = require("lodash");

const lines = readFileSync("day07.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

let cardStrengths;

// Decide how strong the hand is according to its characters
const getHandStrength = (hand, exercise) => {
  const occurrencesByChar = lodash.countBy(hand.split(""));

  if (exercise === "Second") {
    // Sum the values of J occurrences to the highest-value card with most occurrences. If Five of Jokers, don't replace them
    if (occurrencesByChar["J"] && occurrencesByChar["J"] !== 5) {
      const occurrencesJ = occurrencesByChar["J"];
      delete occurrencesByChar["J"];

      // Find the key with the maximum value
      const maxKey = lodash.maxBy(lodash.keys(occurrencesByChar), (key) => [
        occurrencesByChar[key],
        cardStrengths.indexOf(key),
      ]);

      occurrencesByChar[maxKey] += occurrencesJ;
    }
  }

  const differentCharsValues = Object.values(occurrencesByChar);
  switch (differentCharsValues.length) {
    case 1:
      return 7; // Five of a kind
    case 2:
      return differentCharsValues.includes(4) ? 6 : 5; // Four of a kind or Full house
    case 3:
      return differentCharsValues.includes(3) ? 4 : 3; // Three of a kind or Two pair
    case 4:
      return 2; // One pair
    default:
      return 1; // High card
  }
};

// Custom comparator to apply to lines array
const compareHands = (exercise) => {
  // Strength of each single card
  cardStrengths =
    exercise === "Second"
      ? ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]
      : ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

  return (first, second) => {
    const firstHand = first.split(" ")[0].trim();
    const secondHand = second.split(" ")[0].trim();
    const firstStrength = getHandStrength(firstHand, exercise);
    const secondStrength = getHandStrength(secondHand, exercise);
    if (firstStrength > secondStrength) return 1;
    if (firstStrength < secondStrength) return -1;

    // If hands are the same type, highest first card wins
    // This is a simple "for" so it can exit the compareHands function as a whole, not possible with "forEach"
    for (let index = 0; index < first.length; index++) {
      const firstCard = first[index];
      const secondCard = second[index];
      const firstHandCardStrength = cardStrengths.indexOf(firstCard);
      const secondHandCardStrength = cardStrengths.indexOf(secondCard);

      if (firstHandCardStrength > secondHandCardStrength) return 1;
      if (firstHandCardStrength < secondHandCardStrength) return -1;
    }

    // If all cards are equal, return 0
    return 0;
  };
};

const getTotalWinnings = (hands) => {
  return hands
    .map((hand, index) => {
      const handBid = hand.split(" ")[1].trim(); // Take the bid...
      return handBid * (index + 1); // ... and multiply by its rank
    })
    .reduce((sum, bidRank) => sum + bidRank, 0); // And sum to get the total winnings
};

const part1 = () => {
  const sortedHands = lines.sort(compareHands("First")); // Sort the hands, from weaker to stronger
  const totalWinnings = getTotalWinnings(sortedHands);

  console.log(`Solution part 1 is: ${totalWinnings}`);
};

const part2 = () => {
  const sortedHands = lines.sort(compareHands("Second")); // Sort the hands, from weaker to stronger
  const totalWinnings = getTotalWinnings(sortedHands);

  console.log(`Solution part 2 is: ${totalWinnings}`);
};

part1();
part2();
