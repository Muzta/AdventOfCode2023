const { readFileSync } = require("fs");

const lines = readFileSync("./day01.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const calibrationSum = (calibrationValues) => {
  return calibrationValues.reduce((sum, value) => sum + value, 0);
};

const part1 = () => {
  const calibrationValues = [];

  lines.forEach((line) => {
    try {
      // Retain only the digits of the line
      const numbers = line.match(/\d/g);
      // Save the number consisted of the first and last digit
      calibrationValues.push(
        Number(`${numbers[0]}${numbers[numbers.length - 1]}`)
      );
    } catch (error) {
      console.log(`Error "${error.message}" found. Cotinue with next lines`);
    }
  });

  console.log(`Solution part 1 is: ${calibrationSum(calibrationValues)}`);
};

// The same principle as the previous exercise is applied. Convert the first and last numeric elements found into digits, and proceed in a similar manner
const part2 = () => {
  const calibrationValues = [];
  const digits = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const replaceSubstringAtIndex = ({ line, numberToReplaceKey, index }) => {
    let firstPart = line.substr(0, index);
    let lastPart = line.substr(index + 1);
    const numberToReplaceValue = digits[numberToReplaceKey];

    return `${firstPart}${numberToReplaceValue}${lastPart}`;
  };

  // Find the index and corresponding numeric value in the line, whether its the first or last instance
  const findInstance = ({ line, type = "first" }) => {
    let instance = { index: null, numberKey: null };

    Object.keys(digits).forEach((number) => {
      const indexFound =
        type === "first" ? line.indexOf(number) : line.lastIndexOf(number);

      if (indexFound !== -1) {
        instance =
          // If instance hasnt been initialized yet, assing the current found values
          instance.index === null
            ? {
                index: indexFound,
                numberKey: number,
              }
            : // Otherwise, assign the values according if you want to find the first...
            type === "first"
            ? {
                index: Math.min(instance.index, indexFound),
                numberKey:
                  instance.index < indexFound ? instance.numberKey : number,
              }
            : // ...or last instance
              {
                index: Math.max(instance.index, indexFound),
                numberKey:
                  instance.index > indexFound ? instance.numberKey : number,
              };
      }
    });

    return instance;
  };

  lines.forEach((line) => {
    const firstInstance = findInstance({ line, type: "first" });
    const lastInstance = findInstance({ line, type: "last" });

    // Only if there are string numeric values to replace
    if (firstInstance.index !== null)
      line = replaceSubstringAtIndex({
        line,
        numberToReplaceKey: firstInstance.numberKey,
        index: firstInstance.index,
      });
    if (lastInstance.index !== null)
      line = replaceSubstringAtIndex({
        line,
        numberToReplaceKey: lastInstance.numberKey,
        index: lastInstance.index,
      });

    // Retain only the digits of the line
    const numbers = line.match(/\d/g);

    calibrationValues.push(
      Number(`${numbers[0]}${numbers[numbers.length - 1]}`)
    );
  });

  console.log(`Solution part 2 is: ${calibrationSum(calibrationValues)}`);
};

part1();
part2();
