const { readFileSync } = require("fs");

const lines = readFileSync("day08.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const parseNode = (node) => {
  const [nodeKey, nodePairValue] = node
    .split("=")
    .map((element) => element.trim());
  const nodeValue = nodePairValue
    .slice(1, -1)
    .split(",")
    .map((element) => element.trim());
  return [nodeKey, nodeValue];
};

const findStepsToLastNode = ({
  instructions,
  nodes,
  currentNode,
  lastNode,
}) => {
  let instructionCharIndex = 0; // Current instruction index to follow
  let stepsRequired = 0;

  while (true) {
    if (currentNode === lastNode) break;

    const currentInstruction = instructions.split("")[instructionCharIndex];
    currentNode =
      currentInstruction === "R"
        ? nodes[currentNode][1] // Take right node
        : nodes[currentNode][0]; // Take left node

    stepsRequired++;

    instructionCharIndex === instructions.length - 1 // If no instructions left
      ? (instructionCharIndex = 0) // Starts again
      : instructionCharIndex++; // Else take next instruction
  }

  return stepsRequired;
};

const part1 = () => {
  let instructions = "";
  let nodes = {};
  let finishedInstructions = false;
  let currentNode = "AAA";
  const lastNode = "ZZZ";

  // Store instructions and nodes into their respective variables
  lines.forEach((line) => {
    if (!line) finishedInstructions = true;
    else {
      if (!finishedInstructions) instructions += line;
      else {
        const [nodeKey, nodeValue] = parseNode(line);
        nodes[nodeKey] = nodeValue;
      }
    }
  });

  const stepsRequired = findStepsToLastNode({
    instructions,
    nodes,
    currentNode,
    lastNode,
  });

  console.log(`Solution part 1 is: ${stepsRequired}`);
};

const part2 = () => {
  console.log(`Solution part 2 is: ${null}`);
};

part1();
part2();
