const { readFileSync } = require("fs");

const lines = readFileSync("day01.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const part1 = () => {
  console.log(`Solution part 1 is: ${null}`);
};

const part2 = () => {
  console.log(`Solution part 2 is: ${null}`);
};

part1();
part2();
