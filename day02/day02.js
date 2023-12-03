const { readFileSync } = require("fs");

const lines = readFileSync("day02.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const part1 = ({ containedCubes }) => {
  const possibleIDs = [];

  let gameId = 1;
  for (let line of lines) {
    // Retain only the list of sets
    line = line.split(":")[1].trim();
    const setsOfCubes = line.split(";");
    let possible = true;

    for (const set of setsOfCubes) {
      // Save each set as a list of pairs, being the first element the number of cubes and the second one the color
      const cubes = set
        .split(",")
        .map((numberOfCubes) => numberOfCubes.trim().split(" "));

      // If any of this combination is not possible, stop searching in the line
      if (cubes.some((cube) => cube[0] > containedCubes[cube[1]])) {
        possible = false;
        break;
      }
    }

    if (possible) possibleIDs.push(gameId);

    gameId++;
  }

  const sum = possibleIDs.reduce((sum, id) => sum + id, 0);

  console.log(`Solution part 1 is: ${sum}`);
};

const part2 = () => {
  console.log(`Solution part 2 is: ${null}`);
};

part1({
  containedCubes: {
    red: 12,
    green: 13,
    blue: 14,
  },
});

part2();
