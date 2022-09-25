import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  history = ''; //  On which numbers, what operation is performed
  currentNumber = ''; //  Number user provided before any operation (+,-,/,*)
  operator = ''; // Operator
  firstOperand: any = null;
  isFirstOperandReady: boolean = false;

  calculationString = ''; 

  constructor() { }

  ngOnInit(): void {
  }

  public inputNumber(key: string) {

    this.calculationString += key;

    if(this.isFirstOperandReady) {
      this.currentNumber = key;
      this.isFirstOperandReady = false;
    } else {
      this.currentNumber === ''? this.currentNumber = key: this.currentNumber += key;
    } 
  }

  public inputOperation(key: string) {
    
    // '=' will not dislpay on screen
    if(key !== '='){
      this.calculationString += key;
    } 
    else if (this.currentNumber === "NaN"){
      // disable all buttons
    }

    if(this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (typeof this.firstOperand == 'string') {
      this.calculationString = "Invalid Expression!!!";
    } else if (this.isFirstOperandReady) {
      // input key now show in dislpay
    } else if(this.operator){
      this.history = this.firstOperand + this.operator +this.currentNumber;
      const result = this.performCalculation(this.operator, Number(this.currentNumber));
      
      this.currentNumber = String(result);
      this.firstOperand = result;
      this.calculationString = this.currentNumber;
    }

    this.operator = key;
    this.isFirstOperandReady = true;
  }

  
  public performCalculation(operator: string, secondOperand: any) {
  
    switch (operator){
      case '+':
      return this.firstOperand += secondOperand; 
      case '-': 
      return this.firstOperand -= secondOperand; 
      case '*': 
      return this.firstOperand *= secondOperand; 
      case '/': 
      return this.firstOperand /= secondOperand; 
      case '=':
      return secondOperand;
      
    }
  }

  public clear(){
    this.calculationString = '';
    this.currentNumber = '';
    this.operator = '';
    this.isFirstOperandReady = false;
    this.firstOperand = null;
    this.calculationString = '';
    this.history = '';
  }

  public deleteNumber() {

    // removing last character/digit
    this.currentNumber = this.currentNumber.substring(0, this.currentNumber.length-1);
    this.calculationString = this.calculationString.substring(0, this.calculationString.length-1);
  }

}