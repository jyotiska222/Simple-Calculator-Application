import React, { useState } from 'react';
import { Delete } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expression, setExpression] = useState('');

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(display + ' ' + nextOperation + ' ');
    } else if (operation && !waitingForOperand) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setExpression(String(newValue) + ' ' + nextOperation + ' ');
    } else {
      setExpression(display + ' ' + nextOperation + ' ');
      setPreviousValue(inputValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '−':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      const result = Number.isInteger(newValue) ? newValue : parseFloat(newValue.toFixed(8));
      
      setExpression(expression + display);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    const result = value / 100;
    setDisplay(String(result));
  };

  const toggleSign = () => {
    if (display !== '0') {
      const value = parseFloat(display);
      setDisplay(String(value * -1));
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setExpression('');
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ onClick, className, children, isOperator = false }) => (
    <button
      onClick={onClick}
      className={`
        w-16 h-16 rounded-full text-xl font-medium transition-all duration-150
        flex items-center justify-center
        ${isOperator 
          ? 'bg-amber-500 hover:bg-amber-400 text-white active:bg-amber-600' 
          : className === 'clear'
          ? 'bg-red-500 hover:bg-red-400 text-white active:bg-red-600'
          : 'bg-gray-600 hover:bg-gray-500 text-white active:bg-gray-700'
        }
        active:scale-95 shadow-lg
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black p-6 rounded-3xl">
        <h1 className="text-white text-2xl font-bold text-center mb-6">
          Simple Calculator
        </h1>
        
        {/* Display */}
        <div className="bg-gray-700 rounded-2xl p-6 mb-6 min-h-[80px] flex flex-col justify-center">
          {expression && (
            <div className="text-gray-300 text-right text-lg font-light mb-1">
              {expression}
            </div>
          )}
          <div className="text-white text-right text-4xl font-light">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* First Row */}
          <Button onClick={clear} className="clear">C</Button>
          <Button onClick={toggleSign}>+/−</Button>
          <Button onClick={percentage}>%</Button>
          <Button onClick={() => inputOperation('÷')} isOperator>÷</Button>

          {/* Second Row */}
          <Button onClick={() => inputNumber(7)}>7</Button>
          <Button onClick={() => inputNumber(8)}>8</Button>
          <Button onClick={() => inputNumber(9)}>9</Button>
          <Button onClick={() => inputOperation('×')} isOperator>×</Button>

          {/* Third Row */}
          <Button onClick={() => inputNumber(4)}>4</Button>
          <Button onClick={() => inputNumber(5)}>5</Button>
          <Button onClick={() => inputNumber(6)}>6</Button>
          <Button onClick={() => inputOperation('−')} isOperator>−</Button>

          {/* Fourth Row */}
          <Button onClick={() => inputNumber(1)}>1</Button>
          <Button onClick={() => inputNumber(2)}>2</Button>
          <Button onClick={() => inputNumber(3)}>3</Button>
          <Button onClick={() => inputOperation('+')} isOperator>+</Button>

          {/* Fifth Row */}
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={() => inputNumber(0)}>0</Button>
          <Button onClick={backspace}><Delete size={20} /></Button>
          <Button onClick={performCalculation} isOperator>=</Button>
        </div>
      </div>
    </div>
  );
}