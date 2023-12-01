const { readFileSync } = require("fs");

const lines = readFileSync("./day01.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const part1 = () => {
  const calibrationValues = [];

  lines.forEach((line) => {
    // Fetches all the digits of the line
    const numbers = line.match(/\d/g);
    // Save the number consisted of the first and last digit
    calibrationValues.push(
      Number(`${numbers[0]}${numbers[numbers.length - 1]}`)
    );
  });

  const calibrationSum = calibrationValues.reduce(
    (sum, value) => sum + value,
    0
  );

  console.log(`Sum of calibration values is: ${calibrationSum}`);
};

const part2 = () => {};

part1();
part2();
