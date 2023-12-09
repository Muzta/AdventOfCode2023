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

const findStepsToLastNodeFirstExercise = ({
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

  const stepsRequired = findStepsToLastNodeFirstExercise({
    instructions,
    nodes,
    currentNode,
    lastNode,
  });

  console.log(`Solution part 1 is: ${stepsRequired}`);
};

const getLowestCommonMultiple = (numbers) => {
  let result = numbers[0];

  // Greatest common division
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  // LCM of two numbers
  const lcm = (a, b) => (a * b) / gcd(a, b);

  numbers.slice(1).forEach((number) => (result = lcm(result, number)));

  return result;
};

const findStepsToLastNodeSecondExercise = ({
  instructions,
  nodes,
  startingNodes,
  lastNode,
}) => {
  // Find the steps required by each starting node to reach a final node, and the calculate the LCM of them: the total steps would require full iterations of each node until a final node is reached
  // Now only the first final node is count as a full iteration, but it can be improved to get steps until each final node, and again do LCM of all of them
  const stepsToLastNodeList = []; // Steps required by each initial node to reach a "Z" node

  nodesLoop: for (let node of startingNodes) {
    let instructionCharIndex = 0; // Current instruction index to follow
    let nodeSteps = 0;

    while (true) {
      if (node.charAt(node.length - 1) === lastNode) {
        stepsToLastNodeList.push(nodeSteps);
        continue nodesLoop;
      }

      const currentInstruction = instructions.split("")[instructionCharIndex];
      node =
        currentInstruction === "R"
          ? nodes[node][1] // Take right node
          : nodes[node][0]; // Take left node

      nodeSteps++;

      instructionCharIndex === instructions.length - 1 // If no instructions left
        ? (instructionCharIndex = 0) // Starts again
        : instructionCharIndex++; // Else take next instruction
    }
  }

  return getLowestCommonMultiple(stepsToLastNodeList);
};

const part2 = () => {
  let instructions = "";
  let nodes = {};
  let finishedInstructions = false;
  let startingNodes = [];
  const lastNode = "Z";

  // Store instructions and nodes into their respective variables
  lines.forEach((line) => {
    if (!line) finishedInstructions = true;
    else {
      if (!finishedInstructions) instructions += line;
      else {
        const [nodeKey, nodeValue] = parseNode(line);
        nodes[nodeKey] = nodeValue;
        // If last char is "A", it's a starting node
        if (nodeKey.charAt(nodeKey.length - 1) === "A")
          startingNodes.push(nodeKey);
      }
    }
  });

  const stepsRequired = findStepsToLastNodeSecondExercise({
    instructions,
    nodes,
    startingNodes,
    lastNode,
  });

  console.log(`Solution part 2 is: ${stepsRequired}`);
};

part1();
part2();
