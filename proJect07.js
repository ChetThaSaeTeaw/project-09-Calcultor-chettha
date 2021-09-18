//1.Operand(0-9) Operator(+ - x ÷)
const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button'); //Array 
const clearBtn = document.getElementById('clear-btn');

const calculate = {
    "/" : (firstNumber,secondNumber) => secondNumber != 0 ? firstNumber/secondNumber : 'Error',
    "*" : (firstNumber,secondNumber) => firstNumber * secondNumber,
    "+" : (firstNumber,secondNumber) => firstNumber + secondNumber,
    "-" : (firstNumber,secondNumber) => firstNumber - secondNumber,
    "=" : (firstNumber,secondNumber) => secondNumber
}

let firstValue = 0; //ตัวเลขที่ 1
let operatorValue = ''; //ตัวเก็บตัวดำเนินการ
let waitForNext = false; //ตัวเก็บสถานะตัวเลขและตัวดำเนินการ

function setNumberValue(number) {
   if(waitForNext){
        calculatorDisplay.textContent = number;
        waitForNext = false;
   } else {
        const displayValue = calculatorDisplay.textContent; 
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number;
   }
}

function callOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent)
    if(operatorValue && waitForNext){
        operatorValue = operator;
        return;
    }
    if(!firstValue){
        firstValue = currentValue; //ค่าเริ่มต้น
    } else {
        const result = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = result;
        firstValue=result;
        if(firstValue === "Error"){
            resetAll();
        }
    }
    operatorValue=operator;
    waitForNext = true;
}

function addDecimal(decimal) {
    if(waitForNext) return;
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}



//ทำงานที่ปุ่นตัวเลข
inputBtn.forEach((input) => {
    if(input.classList.length === 0) {
        input.addEventListener('click', () => setNumberValue(input.value)); //Input.value คือ ค่าของปุ่มที่กด
    } else if(input.classList.contains('operator')){
        input.addEventListener('click', () => callOperator(input.value));
    } else if(input.classList.contains('decimal')) {
        input.addEventListener('click', () => addDecimal(input.value));
    }
});

function resetAll() {
    firstValue = 0;
    operatorValue = '';
    waitForNext = false;
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click',  () => resetAll());
