const { readFileSync } = require("fs");

const lines = readFileSync("day06.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const part1 = () => {
  let raceTimes, raceDistances;

  lines.forEach((line) => {
    const [key, value] = line.split(":");
    const data = value.trim().split(" ").filter(Number);

    if (key.startsWith("Time")) raceTimes = data;
    else if (key.startsWith("Distance")) raceDistances = data;
  });

  const nWaysByRace = [];

  raceTimes.forEach((time, index) => {
    let minHoldButton;

    // Calculate min time holding the button to win the race
    for (let holdButton = 0; holdButton < time; holdButton++) {
      const travelSpeed = holdButton;
      const restTimeTravel = time - holdButton;

      // Check if this holding time ensures winning the race
      if (restTimeTravel * travelSpeed > raceDistances[index]) {
        minHoldButton = holdButton;
        break;
      }
    }

    // Total ways of winning this race is distance from min time holding to half the time available
    const timeHalved = Math.ceil(time / 2);
    const extraWayIfEven = time % 2 === 0 ? 1 : 0;
    const nWaysThisRace = (timeHalved - minHoldButton) * 2 + extraWayIfEven;

    nWaysByRace.push(nWaysThisRace);
  });

  const mulTotalWays = nWaysByRace.reduce((mul, ways) => mul * ways, 1);
  console.log(`Solution part 1 is: ${mulTotalWays}`);
};

const part2 = () => {
  console.log(`Solution part 2 is: ${null}`);
};

part1();
part2();
