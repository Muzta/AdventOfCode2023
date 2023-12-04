const { readFileSync } = require("fs");

const lines = readFileSync("day04.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const part1 = () => {
  const cardPoints = [];

  lines.forEach((line) => {
    line = line.split(":")[1].trim();
    // Store the lists of the non-repeated numbers and filter numeric values to avoid double-space
    const winningNumbers = line.split("|")[0].trim().split(" ").filter(Number);
    const myNumbers = line.split("|")[1].trim().split(" ").filter(Number);
    // Number of common numbers in both sides
    const nCommon = [...myNumbers].filter((number) =>
      winningNumbers.includes(number)
    );

    if (nCommon.length > 0) cardPoints.push(2 ** (nCommon.length - 1));
  });

  const totalPoints = cardPoints.reduce((sum, points) => sum + points, 0);

  console.log(`Solution part 1 is: ${totalPoints}`);
};

const part2 = () => {
  console.log(`Solution part 2 is: ${null}`);
};

part1();
part2();
