import React, { useState } from 'react';
import { Delete } from 'lucide-react';

/**
 * Simple Calculator Component
 * A fully functional calculator with basic arithmetic operations, percentage calculations,
 * and a responsive display that maintains consistent sizing
 */
export default function Calculator() {
  // State management for calculator functionality
  const [display, setDisplay] = useState('0'); // Current display value
  const [previousValue, setPreviousValue] = useState(null); // Previous operand for calculations
  const [operation, setOperation] = useState(null); // Current operation (+, -, ×, ÷)
  const [waitingForOperand, setWaitingForOperand] = useState(false); // Flag to determine if waiting for next number input
  const [expression, setExpression] = useState(''); // Expression string shown above main display

  /**
   * Handles number input (0-9)
   * @param {number} num - The number to input
   */
  const inputNumber = (num) => {
    // Clear invalid format and start fresh
    if (display === 'Invalid Format') {
      setDisplay(String(num));
      setExpression('');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      // If waiting for operand, replace display with new number
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      // Otherwise, append number to current display (or replace if display is '0')
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  /**
   * Handles operation input (+, -, ×, ÷)
   * @param {string} nextOperation - The operation symbol to perform
   */
  const inputOperation = (nextOperation) => {
    // Clear invalid format and start fresh with current operation
    if (display === 'Invalid Format') {
      setDisplay('0');
      setExpression('0 ' + nextOperation + ' ');
      setPreviousValue(0);
      setOperation(nextOperation);
      setWaitingForOperand(true);
      return;
    }

    const inputValue = parseFloat(display);

    if (previousValue === null) {
      // First operation - store the current value and set up expression
      setPreviousValue(inputValue);
      setExpression(display + ' ' + nextOperation + ' ');
      setDisplay('0'); // Show 0 while waiting for next operand
    } else if (operation && !waitingForOperand) {
      // Chain operations - calculate current result and continue
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay('0'); // Show 0 while waiting for next operand
      setPreviousValue(newValue);
      setExpression(String(newValue) + ' ' + nextOperation + ' ');
    } else {
      // Replace operation if user changes their mind
      setExpression(display + ' ' + nextOperation + ' ');
      setPreviousValue(inputValue);
      setDisplay('0'); // Show 0 while waiting for next operand
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  /**
   * Performs the actual calculation based on operation
   * @param {number} firstValue - The first operand
   * @param {number} secondValue - The second operand
   * @param {string} operation - The operation to perform
   * @returns {number} The calculated result
   */
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '−':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        // Prevent division by zero
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  /**
   * Performs the final calculation when equals (=) is pressed
   * Handles floating point precision and resets calculator state
   * Shows "Invalid Format" for incomplete operations
   */
  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      // Check if we're waiting for an operand (incomplete operation like "9*=")
      if (waitingForOperand) {
        setDisplay('Invalid Format');
        setExpression('');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
        return;
      }

      const newValue = calculate(previousValue, inputValue, operation);
      // Handle floating point precision - show integers as integers, limit decimals to 8 places
      const result = Number.isInteger(newValue) ? newValue : parseFloat(newValue.toFixed(8));
      
      // Complete the expression display and show result
      setExpression(expression + display);
      setDisplay(String(result));
      
      // Reset calculator state for next calculation
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  /**
   * Handles percentage calculations
   * Fixed to work correctly with operations (e.g., 9/10% = 90, not 0.009)
   * If there's a pending operation, treats percentage as part of that operation
   * Otherwise, converts current number to percentage (divides by 100)
   */
  const percentage = () => {
    const value = parseFloat(display);
    
    if (previousValue !== null && operation) {
      // If there's a pending operation, calculate percentage in context
      // For example: 9 ÷ 10% should calculate 9 ÷ (10/100) = 90
      const percentageValue = value / 100;
      const result = calculate(previousValue, percentageValue, operation);
      const finalResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
      
      setDisplay(String(finalResult));
      setExpression(expression + display + '%');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    } else {
      // Simple percentage conversion: convert current number to percentage
      const result = value / 100;
      setDisplay(String(result));
    }
  };

  /**
   * Toggles the sign of the current display value (positive/negative)
   * Only works if display is not zero
   */
  const toggleSign = () => {
    if (display !== '0') {
      const value = parseFloat(display);
      setDisplay(String(value * -1));
    }
  };

  /**
   * Clears all calculator state and resets to initial values
   * This is the "C" (Clear) button functionality
   */
  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setExpression('');
  };

  /**
   * Removes the last digit from the display (backspace functionality)
   * If only one digit remains, resets display to '0'
   */
  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  /**
   * Handles decimal point input
   * Prevents multiple decimal points in the same number
   */
  const inputDecimal = () => {
    // Clear invalid format and start fresh with decimal
    if (display === 'Invalid Format') {
      setDisplay('0.');
      setExpression('');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      // If waiting for operand, start new decimal number
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      // Only add decimal if there isn't one already
      setDisplay(display + '.');
    }
  };

  /**
   * Reusable Button component for calculator buttons
   * @param {Function} onClick - Click handler function
   * @param {string} className - Additional CSS classes
   * @param {ReactNode} children - Button content (text, icons, etc.)
   * @param {boolean} isOperator - Whether this is an operator button (affects styling)
   */
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
        {/* Calculator Title */}
        <h1 className="text-white text-2xl font-bold text-center mb-6">
          Simple Calculator
        </h1>
        
        {/* Display Section - Fixed height to prevent size changes */}
        <div className="bg-gray-700 rounded-2xl p-6 mb-6 h-[120px] flex flex-col justify-center w-80">
          {/* Expression display - shows the calculation being performed */}
          {expression && (
            <div className="text-gray-300 text-right text-lg font-light mb-1 overflow-hidden whitespace-nowrap">
              {expression}
            </div>
          )}
          {/* Main display - shows current number or result */}
          <div className="text-white text-right text-4xl font-light overflow-hidden whitespace-nowrap">
            {display}
          </div>
        </div>

        {/* Button Grid - 4x5 layout with all calculator functions */}
        <div className="grid grid-cols-4 gap-4 w-80">
          {/* First Row - Clear, Sign Toggle, Percentage, Division */}
          <Button onClick={clear} className="clear">C</Button>
          <Button onClick={toggleSign}>+/−</Button>
          <Button onClick={percentage}>%</Button>
          <Button onClick={() => inputOperation('÷')} isOperator>÷</Button>

          {/* Second Row - Numbers 7, 8, 9 and Multiplication */}
          <Button onClick={() => inputNumber(7)}>7</Button>
          <Button onClick={() => inputNumber(8)}>8</Button>
          <Button onClick={() => inputNumber(9)}>9</Button>
          <Button onClick={() => inputOperation('×')} isOperator>×</Button>

          {/* Third Row - Numbers 4, 5, 6 and Subtraction */}
          <Button onClick={() => inputNumber(4)}>4</Button>
          <Button onClick={() => inputNumber(5)}>5</Button>
          <Button onClick={() => inputNumber(6)}>6</Button>
          <Button onClick={() => inputOperation('−')} isOperator>−</Button>

          {/* Fourth Row - Numbers 1, 2, 3 and Addition */}
          <Button onClick={() => inputNumber(1)}>1</Button>
          <Button onClick={() => inputNumber(2)}>2</Button>
          <Button onClick={() => inputNumber(3)}>3</Button>
          <Button onClick={() => inputOperation('+')} isOperator>+</Button>

          {/* Fifth Row - Decimal, Zero, Backspace, Equals */}
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={() => inputNumber(0)}>0</Button>
          <Button onClick={backspace}><Delete size={20} /></Button>
          <Button onClick={performCalculation} isOperator>=</Button>
        </div>
      </div>
    </div>
  );
}