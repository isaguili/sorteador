//dom elements
//numbers
const numberInputs = document.querySelectorAll(".number-input");
const quantityInput = document.getElementById("quantity-input");
const inputMin = document.getElementById("input-min");
const inputMax = document.getElementById("input-max");

//buttons
const allowRepetitionCheckbox = document.getElementById(
  "allow-repeats-checkbox"
);
const btnDraw = document.getElementById("btn-draw");
const btnDrawAgain = document.getElementById("btn-repeat-draw");
const btnReset = document.getElementById("btn-reset");

//containers
const drawingContainer = document.getElementById("drawing-container");
const resultsContainer = document.getElementById("results-container");
const drawnNumbersDisplay = document.getElementById("drawn-numbers-display");
const errorMessageContainer = document.querySelector("#error-message");

//error message
const hideMessageBtn = document.getElementById("hide-error-message");

//variables
let drawingAcc = 1;

//events
//prevent comma and period input in numeric field
numberInputs.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "," || e.key === ".") {
      e.preventDefault();
    }
  });
});

//draw buttons
btnDraw.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    if (quantityInput.value <= 0) {
      throw new Error(
        "A quantidade de números sorteados não pode ser igual a 0."
      );
    } else if (
      allowRepetitionCheckbox.checked &&
      quantityInput.value > inputMax.value - inputMin.value + 1
    ) {
      throw new Error(
        "A quantidade de números sorteados não pode ser maior que o intervalo de números possíveis sem repetição."
      );
    } else if (inputMin.value > inputMax.value) {
      throw new Error(
        "O número inserido no campo “DE” deve sempre ser menor que o número inserido no campo “ATÉ”"
      );
    } else if (inputMin.value === "" || inputMax.value === "") {
      throw new Error(
        "Os campos “DE” e “ATÉ” não podem estar vazios."
      );
    } else {
      const drawnNumbers = createArray();
      updateDisplayNumbers(drawnNumbers);
      showResultContainer();
    }
  } catch (error) {
    showErrorMessage(error.message);
  }
});

btnDrawAgain.addEventListener("click", () => {
  clearDrawnNumbersDisplay();
  const drawnNumbers = createArray();
  updateDisplayNumbers(drawnNumbers);
  showResultContainer();
  updateDrawingAcc();
});

//close error message
hideMessageBtn.onclick = () => {
  errorMessageContainer.classList.add("hidden");
};

// functions
function createArray() {
  const minValue = parseInt(inputMin.value);
  const maxValue = parseInt(inputMax.value);
  const quantityValue = parseInt(quantityInput.value);

  const numbersArray = [];

  for (let i = 0; i < quantityValue; i++) {
    const randomNumber = generateRandomNumber(minValue, maxValue);
    const isRepeat = numbersArray.includes(randomNumber);

    if (allowRepetitionCheckbox.checked && isRepeat) {
      i--;
    } else {
      numbersArray.push(randomNumber);
    }
  }

  return numbersArray;
}

function generateRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function generateDisplayNumber(randomNumber) {
  const numberDisplay = document.createElement("div");
  const numberSpan = document.createElement("span");

  numberDisplay.classList.add("number", "flex");
  numberSpan.textContent = randomNumber;

  drawnNumbersDisplay.append(numberDisplay);
  numberDisplay.append(numberSpan);
}

function showResultContainer() {
  resultsContainer.classList.remove("hidden");
  drawingContainer.classList.add("hidden");
}

function showResultBtn() {
  btnDrawAgain.classList.remove("opacity-animation");
  btnDrawAgain.removeAttribute("disabled");
  btnReset.classList.remove("opacity-animation");
  btnReset.removeAttribute("disabled");
}

function showErrorMessage(message) {
  const errorMessage = document.querySelector("#error-message p");
  errorMessage.textContent = message;
  errorMessageContainer.classList.remove("hidden");
}

// async function
function createDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateDisplayNumbers(drawNumbers) {
  for (let number of drawNumbers) {
    generateDisplayNumber(number);
    await createDelay(3000);
  }
  showResultBtn();
}

function updateDrawingAcc() {
  const drawingAccField = document.querySelector(
    "#results-container header span"
  );
  drawingAcc++;
  drawingAccField.textContent = `${drawingAcc}º resultado`;
}

function clearDrawnNumbersDisplay() {
  drawnNumbersDisplay.innerHTML = "";
}
