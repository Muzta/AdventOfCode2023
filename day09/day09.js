const { readFileSync } = require("fs");
const lodash = require("lodash");

const lines = readFileSync("day09.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const generateSubsequences = (listOfSequences) => {
  const currentSequence = lodash.last(listOfSequences); // Work with the last sequence of the list
  if (currentSequence.every((number) => number === 0)) return listOfSequences;

  const newSequence = [];
  for (let i = 1; i < currentSequence.length; i++) {
    newSequence.push(currentSequence[i] - currentSequence[i - 1]);
  }

  listOfSequences.push(newSequence);
  return generateSubsequences(listOfSequences);
};

const getExtrapolatedValue = (listOfSequences, positionToWorkWith) => {
  const listOfEdgeNumbers = listOfSequences.map((sequence) =>
    positionToWorkWith === "last"
      ? lodash.last(sequence)
      : lodash.first(sequence)
  ); // Last number of each sequence

  if (positionToWorkWith === "last") return lodash.sum(listOfEdgeNumbers);
  else {
    // Replace each number, from bottom to start, by itself minus the next first number
    const begginingValues = lodash.forEachRight(
      listOfEdgeNumbers,
      (_, index) =>
        (listOfEdgeNumbers[index] -= listOfEdgeNumbers[index + 1] || 0)
    );
    return lodash.first(begginingValues);
  }
};

const part1 = () => {
  const nextValues = [];

  lines.forEach((line) => {
    const numbers = line.split(" ").map(Number);
    const listOfSequences = generateSubsequences([numbers]); // Sequences in this line
    nextValues.push(getExtrapolatedValue(listOfSequences, "last"));
  });

  const sumOfValues = lodash.sum(nextValues);
  console.log(`Solution part 1 is: ${sumOfValues}`);
};

const part2 = () => {
  const begginingValues = [];

  lines.forEach((line) => {
    const numbers = line.split(" ").map(Number);
    const listOfSequences = generateSubsequences([numbers]);
    begginingValues.push(getExtrapolatedValue(listOfSequences, "beggining"));
  });

  const sumOfValues = lodash.sum(begginingValues);
  console.log(`Solution part 2 is: ${sumOfValues}`);
};

part1();
part2();
