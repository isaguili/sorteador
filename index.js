//dom elements
//numbers
const numberInputs = document.querySelectorAll(".number-input")
const quantityInput = document.getElementById("quantity-input")
const inputMin = document.getElementById("input-min")
const inputMax = document.getElementById("input-max")

//buttons
const allowRepetitionCheckbox = document.getElementById("allow-repeats-checkbox")
const btnDraw = document.getElementById("btn-draw")
const btnDrawAgain = document.getElementById("btn-repeat-draw")
const btnReset = document.getElementById("btn-reset")

//containers
const drawingContainer = document.getElementById("drawing-container")
const resultsContainer = document.getElementById("results-container")
const drawnNumbersDisplay = document.getElementById("drawn-numbers-display")
const errorMessageContainer = document.querySelector("#error-message")

//error message
const hideMessageBtn = document.getElementById("hide-error-message")

//variables
let drawingAcc = 1
