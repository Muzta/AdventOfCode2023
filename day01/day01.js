const { readFileSync } = require("fs");

const lines = readFileSync("./day01.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const part1 = () => {
  const calibrationValues = [];

  lines.map((line) => {
    let firstDigit, lastDigit;

    for (let i = 0; i < line.length; i++) {
      if (firstDigit && lastDigit) break;

      // Check if a number has been already found. If not, assign current one if it's a digit
      if (!firstDigit && !isNaN(line[i])) firstDigit = line[i];
      if (!lastDigit && !isNaN(line[line.length - 1 - i]))
        lastDigit = line[line.length - 1 - i];
    }

    calibrationValues.push(Number(`${firstDigit}${lastDigit}`));
  });

  const calibrationSum = calibrationValues.reduce(
    (accumulator, value) => accumulator + value,
    0
  );

  console.log(`Sum of calibration values is: ${calibrationSum}`);
};

const part2 = () => {};

part1();
part2();
