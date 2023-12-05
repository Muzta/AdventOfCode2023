const { readFileSync } = require("fs");

const lines = readFileSync("day05.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const part1 = () => {
  // Initialize the rangesMap
  let seeds,
    seedSoil,
    soilFert,
    fertWater,
    waterLight,
    lightTemp,
    tempHum,
    humLocation;

  const locations = [];

  // Convert each numeric line into an array of numbers...
  const parseList = (data) => data.split(" ").map(Number);
  // ... and each section into a list of lists
  const parseSection = (section) => section.map((line) => parseList(line));

  let currentSection = null; // Name of the current section
  let sectionLines = []; // Store the lines of numbers of this section

  lines.forEach((line, index) => {
    if (line.startsWith("seeds")) seeds = parseList(line.split(":")[1].trim());
    // If the line is a section name
    else if (/[a-zA-Z]/.test(line)) {
      // Store the ranges of the previous section into its corresponding variable
      if (currentSection) {
        switch (currentSection) {
          case "seed-to-soil":
            seedSoil = parseSection(sectionLines);
            break;
          case "soil-to-fertilizer":
            soilFert = parseSection(sectionLines);
            break;
          case "fertilizer-to-water":
            fertWater = parseSection(sectionLines);
            break;
          case "water-to-light":
            waterLight = parseSection(sectionLines);
            break;
          case "light-to-temperature":
            lightTemp = parseSection(sectionLines);
            break;
          case "temperature-to-humidity":
            tempHum = parseSection(sectionLines);
            break;
          default:
            break;
        }
      }

      // And start the new one
      currentSection = line.substring(0, line.indexOf(" ")).trim();
      sectionLines = [];
    }
    // If the line contains numbers and is not empty
    else if (line || index === lines.length - 1) {
      // Store the line in the section
      sectionLines.push(line);
      // In case it's the last line
      index === lines.length - 1
        ? (humLocation = parseSection(sectionLines))
        : null;
    }
  });

  const findConversion = (element, conversionMap) => {
    const conversionRange = conversionMap.find(
      (convert) => element >= convert[1] && element < convert[1] + convert[2]
    );
    const conversion = conversionRange
      ? element - conversionRange[1] + conversionRange[0]
      : element;
    return conversion;
  };

  seeds.forEach((seed) => {
    const soil = findConversion(seed, seedSoil);
    const fert = findConversion(soil, soilFert);
    const water = findConversion(fert, fertWater);
    const light = findConversion(water, waterLight);
    const temp = findConversion(light, lightTemp);
    const hum = findConversion(temp, tempHum);
    const location = findConversion(hum, humLocation);
    locations.push(location);
  });

  const lowestLocation = Math.min(...locations);

  console.log(`Solution part 1 is: ${lowestLocation}`);
};

const part2 = () => {
  console.log(`Solution part 2 is: ${null}`);
};

part1();
part2();
