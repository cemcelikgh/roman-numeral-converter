const number = document.getElementById("number");
const form = document.getElementById("form");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const placeValues = {
  ones:       {one: "I", five: "V", nextOne: "X"},
  tens:       {one: "X", five: "L", nextOne: "C"},
  hundreds:   {one: "C", five: "D", nextOne: "M"},
  thousands:  {one: "M"}
}

form.addEventListener("submit", isAvailable);
convertBtn.addEventListener("click", isAvailable);

function isAvailable(e) {
  e.preventDefault();
  let num = Number(number.value);
  if (number.value === "") {
    output.textContent = "Please enter a valid number";
    styleWarning();
    return;
  } else if (num < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    styleWarning();
    return;
  } else if (num > 3999) {
    output.textContent = "Please enter a number less than or equal to 3999";
    styleWarning();
    return;
  } else {
    result();
  }
}

function styleWarning() {
  output.style.display = "block";
  output.style.fontSize = "2";
  output.style.fontWeight = "initial";
  output.style.letterSpacing = "initial";
  output.style.color = "#68080b";
  output.style.backgroundColor = "#ee4288";
  output.style.border = "3px solid #68080b";
}

function result() {
  let romanNumeral = "";
  let numArr = Array.from(number.value, Number);
  if (numArr.length < 4) {
    for (let i = numArr.length; i < 4; i++) {
      numArr.unshift(0);
    }
  }
  numArr.forEach((num, index) => {
    let digitObj = placeAnalysis(index);
    romanNumeral += digitValue(num, digitObj);
  });
  output.textContent = romanNumeral;
  styleOutput();
}

function placeAnalysis(index) {
  let placeValue;
  if (index === 0) {
    placeValue = placeValues.thousands;
  } else if (index === 1) {
    placeValue = placeValues.hundreds;
  } else if (index === 2) {
    placeValue = placeValues.tens;
  } else {
    placeValue = placeValues.ones;
  }
  return placeValue;
}

function digitValue(figure, placeValue) {
  let digitValue;
  switch (figure) {
    case 1:
    case 2:
    case 3:
      digitValue = `${placeValue.one.repeat(figure)}`;
      break;
    case 4:
      digitValue = `${placeValue.one + placeValue.five}`;
      break;
    case 5:
      digitValue = placeValue.five;
      break;
    case 6:
    case 7:
    case 8:
      digitValue = `${placeValue.five + placeValue.one.repeat(figure - 5)}`;
        break;
    case 9:
      digitValue = `${placeValue.one + placeValue.nextOne}`;
      break;
    default:
      digitValue = "";
      break;
  }
  return digitValue;
}

function styleOutput() {
  output.style.display = "block";
  output.style.fontSize = "2.5rem";
  output.style.fontWeight = "bold";
  output.style.letterSpacing = "0.2rem";
  output.style.color = "var(--white)";
  output.style.backgroundColor = "var(--bg-green)";
  output.style.border = "3px solid #faa32f";
}