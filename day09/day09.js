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

const getNextValue = (listOfSequences) => {
  const listOfLastNumbers = listOfSequences.map((sequence) =>
    lodash.last(sequence)
  ); // Last number of each sequence
  const nextValue = lodash.sum(listOfLastNumbers);
  return nextValue;
};

const part1 = () => {
  const nextValues = [];

  lines.forEach((line) => {
    const numbers = line.split(" ").map(Number);
    const listOfSequences = generateSubsequences([numbers]); // Sequences in this line
    nextValues.push(getNextValue(listOfSequences));
  });

  const sumOfValues = lodash.sum(nextValues);
  console.log(`Solution part 1 is: ${sumOfValues}`);
};

const part2 = () => {
  console.log(`Solution part 2 is: ${null}`);
};

part1();
part2();
