import Chalk from "chalk";
import Figlet from "figlet";
import Gradient from "gradient-string";

const WIDTH = process.stdout.columns;
const HEIGHT = process.stdout.rows - 1;
const MAGIC_NUMBER = 11 / 42;
const WAVE_LENGTH = 4;
const WAVE_PERIOD = 4;

function chooseColour({ x, y, width, height }) {
  const wv = Math.floor(x / WAVE_LENGTH) % WAVE_PERIOD;

  if (y <= height / 3) {
    if (y == Math.floor(height / 3) - 1) {
      return wv == 0 ? "black" : "blue";
    } else if (y == Math.floor(height / 3)) {
      const isWave = wv == 0 || wv == 1 || wv == 3;
      return !isWave ? "blue" : "black";
    }

    return "blue";
  } else if (y <= (height / 3) * 2) {
    if (y == Math.floor(height / 3) * 2) {
      return wv == 0 ? "white" : "black";
    }

    return "black";
  } else {
    if (y < Math.floor(height / 3) * 2 + 2) {
      const isWave = wv == 0 || wv == 1 || wv == 3;
      return isWave ? "white" : "black";
    }
    return "white";
  }
}

function chooseSymbol({ x, y, width, height }) {
  const wv = Math.floor(x / WAVE_LENGTH) % WAVE_PERIOD;
  if (y == 0 || y == height - 2) {
    const isWave = wv == 0;
    if (y == 0) {
      return isWave ? "x" : " ";
    }

    return !isWave ? "x" : " ";
  } else if (y == 1 || y == height - 1) {
    const isWave = wv == 0 || wv == 1 || wv == 3;
    if (y == 1) {
      return isWave ? "x" : " ";
    }
    return !isWave ? "x" : " ";
  }
  return "x";
}

function drawFlag() {
  const width = Math.floor(WIDTH * 0.5);
  const height = Math.floor(width * MAGIC_NUMBER);

  const lines = [];
  for (let y = 0; y < height; y++) {
    lines.push([]);
    for (let x = 0; x < WIDTH; x++) {
      lines[y].push(" ");
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = chooseColour({ x, y, width, height });
      const symbol = chooseSymbol({ x, y, width, height });
      lines[y][x] = Chalk[color](symbol);
    }
  }

  process.stdout.write(lines.map((l) => l.join("")).join("\n"));

  return HEIGHT - height;
}

function drawMITSText(leftoverLines) {
  const width = Math.floor(WIDTH * 0.4);
  const gradient = Gradient(["#ce21b4", "#392ade"]);
  const mitsText = Figlet.textSync("MITS", {
    width,
    font: "3D Diagonal",
    horizontalLayout: "default",
    verticalLayout: "default",
  });
  const lines = mitsText.split("\n");
  const spacingAmt = leftoverLines - lines.length;
  for (let i = 0; i < spacingAmt; i++) {
    process.stdout.write(" ".repeat(WIDTH) + "\n");
  }
  for (let y = 0; y < lines.length; y++) {
    process.stdout.write(" ".repeat(WIDTH - width) + gradient(lines[y]) + "\n");
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const leftoverLines = drawFlag();
  drawMITSText(leftoverLines);
}

main();
