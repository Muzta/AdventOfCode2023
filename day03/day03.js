const { readFileSync } = require("fs");

const matrix = readFileSync("day03.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n") // Split on newline
  .map((line) => line.trim().split("")); // Convert each line into array of char so a matrix is get

const part1 = () => {
  const isNumber = (cell) => !isNaN(cell);
  const isValidCell = (x, y) =>
    x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
  const isValidSymbol = (x, y) => {
    if (isValidCell(x, y)) {
      const cell = matrix[x][y];
      return !isNumber(cell) && cell !== ".";
    }
  };

  const partNumbers = [];
  let currentNumber = "";
  let validNumber = false; // This will track if a symbol for that number has been found

  matrix.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (isNumber(cell)) {
        // Add the current digit to the number
        currentNumber += cell;
        // Look for adjacent symbol only if hasnt been found yet, otherwise keep looking for more digits
        if (!validNumber) {
          rowLoop: for (let dx = -1; dx <= 1; dx++) {
            columnLoop: for (let dy = -1; dy <= 1; dy++) {
              // If a symbol has been found, stop looking mroe adjacents
              if (isValidSymbol(x + dx, y + dy)) {
                validNumber = true;
                break rowLoop;
              }
            }
          }
        }
      }
      //   Only if the current cell is not a digit...
      else if (!isNumber(cell)) {
        // ... add the part number if valid...
        if (validNumber) partNumbers.push(Number(currentNumber));
        // ... and reset values
        currentNumber = "";
        validNumber = false;
      }
    });
  });

  const sumOfParts = partNumbers.reduce((sum, number) => sum + number, 0);
  console.log(`Solution part 1 is: ${sumOfParts}`);
};

const part2 = () => {
  console.log(`Solution part 2 is: ${null}`);
};

part1();
part2();
