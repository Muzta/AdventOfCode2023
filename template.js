const { readFileSync } = require("fs");

const lines = readFileSync("day01.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const part1 = () => {};

const part2 = () => {};

part1();
part2();
