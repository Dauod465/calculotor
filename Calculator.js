import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 320px;
`;

const Display = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: right;
  font-size: 2em;
  font-family: 'Arial', sans-serif;
  min-height: 60px;
  word-wrap: break-word;
  word-break: break-all;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 1.2em;
  border: none;
  border-radius: 10px;
  background-color: ${props => props.operator ? '#4CAF50' : '#e9ecef'};
  color: ${props => props.operator ? 'white' : '#212529'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const performCalculation = () => {
    if (operator && firstOperand !== null) {
      const secondOperand = parseFloat(display);
      const result = calculate(firstOperand, secondOperand, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  return (
    <CalculatorContainer>
      <Display>{display}</Display>
      <ButtonGrid>
        <Button onClick={clearDisplay}>C</Button>
        <Button onClick={() => setDisplay(String(parseFloat(display) * -1))}>±</Button>
        <Button onClick={() => setDisplay(String(parseFloat(display) / 100))}>%</Button>
        <Button operator onClick={() => handleOperator('/')}>/</Button>

        <Button onClick={() => inputDigit(7)}>7</Button>
        <Button onClick={() => inputDigit(8)}>8</Button>
        <Button onClick={() => inputDigit(9)}>9</Button>
        <Button operator onClick={() => handleOperator('*')}>×</Button>

        <Button onClick={() => inputDigit(4)}>4</Button>
        <Button onClick={() => inputDigit(5)}>5</Button>
        <Button onClick={() => inputDigit(6)}>6</Button>
        <Button operator onClick={() => handleOperator('-')}>-</Button>

        <Button onClick={() => inputDigit(1)}>1</Button>
        <Button onClick={() => inputDigit(2)}>2</Button>
        <Button onClick={() => inputDigit(3)}>3</Button>
        <Button operator onClick={() => handleOperator('+')}>+</Button>

        <Button onClick={() => inputDigit(0)}>0</Button>
        <Button onClick={inputDecimal}>.</Button>
        <Button onClick={performCalculation} operator style={{ gridColumn: 'span 2' }}>=</Button>
      </ButtonGrid>
    </CalculatorContainer>
  );
};

export default Calculator; 