/**
 ## Learning Objectives
- [ ] Understand what functions are and why we need them
- [ ] Declare functions (function declaration vs expression)
- [ ] Use parameters and return values
- [ ] Understand scope (global, local, block)
- [ ] Write arrow functions (ES6)
- [ ] Create and use callback functions
- [ ] **Answer 5 new interview questions**
 */

// Part 1: Why we need functions

const length1 = 5;
const width1 = 3;
const area1 = length1 * width1;
console.log(`Area 1 is: ${area1}`);

const length2 = 10;
const width2 = 4;
const area2 = length2 * width2;
console.log(`Area 2 is: ${area2}`);

// To solve the above problem, we use functions!
// Function Declaration
function calculateArea(length, width) {
  //key word function, name, parameters, body
  const area = length * width;
  return area; //return/output value, what function gives back
}

//calling a function
const areaA = calculateArea(10, 3);
console.log(areaA);

console.log(calculateArea(5, 3));

// Part 2: Function Basics

//Function declaration
function greet() {
  console.log('Hello, world');
}

//calling/invoking the function (making the function run)
greet(); // Hello, world

//Functions with parameters, what your function needs to work (takes inputs)
function greetPerson(name) {
  console.log(`Hello, ${name}`);
}
greetPerson('Alice'); //argument

// Multiple parameters
function addNumbers(a, b) {
  const sum = a + b;
  return sum; //output
}

// Using the return value
const result = addNumbers(5, 7);
console.log(`The sum is: ${result}`);

//call directly
console.log(`The sum is: ${addNumbers(10, 15) + addNumbers(2, 3)}`);

// Return stops function execution
function checkAge(age) {
  if (age < 18) {
    return 'Too young';
    console.log('This never runs');
  }
  return 'Old enough';
  console.log('This doesnt get executed ever');
}

console.log(checkAge(15));
console.log(checkAge(19));

/**
 * Q: What's the difference between function parameters and arguments? What does 'return' do?
 **Answer:**
```
Parameters:
- Variables listed in function definition
- Placeholders for values function will receive
- Example: function add(a, b) - a and b are parameters

Arguments:
- Actual values passed when calling function
- Example: add(5, 3) - 5 and 3 are arguments

Return statement:
- Sends a value back to where function was called
- Stops function execution immediately
- Without return, function returns undefined
 */

// Part 3: Function expressions & Arrow functions

// Function Expression

//function declaration
function multiply(x, y) {
  return x * y;
}
console.log(multiply(5, 3));

function findAverage(num1, num2, num3) {
  return (num1 + num2 + num3) / 3;
}

console.log(findAverage(4, 8, 12.5));

//function expression (store in variable)
const multiplyExp = function (x, y) {
  return x * y;
};

console.log(multiplyExp(5, 3));

// Part 3: Arrow Function (ES6)

//regular function
function addOld(a, b) {
  return a + b;
}

//arrow function
const addNew = (a, b) => {
  return a + b;
};

// shorter: implicit return (one expresssion)
const add3 = (a, b) => a + b;

console.log(addOld(2, 3));
console.log(addNew(2, 3));
console.log(add3(2, 3));

//No parameters
const sayHello = () => console.log('Hello!');
sayHello();

//Single parameter (no parentheses needed)
const square = (x) => x * x;
console.log(square(4));

//Mulitple parameters
const divide = (a, b) => a / b;
console.log(divide(10, 2));

// Body is multiple lines
const isEven = (num) => {
  if (num % 2 === 0) {
    return true;
  } else {
    return false;
  }
};

console.log(isEven(4)); // true

// kg to convert to lbs, if you are under 120 lbs, alert "You are light!" othewise, say you are good

const kgTolbs = (kg) => {
  const lbs = kg * 2.20462;
  if (lbs < 120) {
    return 'You are light!';
  } else {
    return `You are good!`;
  }
};

function kgTolbsOld(kg) {
  const lbs = kg * 2.20462;
  if (lbs < 120) {
    return 'You are light!';
  } else {
    return `You are good!`;
  }
}

console.log(kgTolbs(65));

/**
 * Q: What's the difference between a function declaration, function expression, and arrow function?
 **Answer:**
```
Function Declaration:
- Hoisted (can call before definition)
- Syntax: function name() {}
- Has its own 'this' context

Function Expression:
- Not hoisted (must define before calling)
- Syntax: const name = function() {}
- Has its own 'this' context

Arrow Function:
- Not hoisted
- Shorter syntax: () => {}
- Does NOT have its own 'this' (inherits from parent)
- Implicit return for single expressions

Examples:

// Declaration - HOISTED
sayHi();  // Works!
function sayHi() {
  console.log("Hi!");
}

// Expression - NOT hoisted
// greet();  // Error! Cannot access before initialization
const greet = function() {
  console.log("Hello!");
};

// Arrow - NOT hoisted, shorter syntax
const add = (a, b) => a + b;  // Implicit return
const multiply = (a, b) => { return a * b; };  // Explicit return

When to use:
- Declaration: Top-level functions, need hoisting
- Expression: Pass as argument, conditional functions
- Arrow: Short callbacks, preserve 'this' context
 */

//Part 4: Scope - it's about accessibility of variables

const globalVar = 'I am global';

function test() {
  console.log(globalVar);
}
test(); // I am global

//Local/function scope
function test2() {
  const localVar = 'I am local';
  console.log(localVar);
}
test2(); // I am local
//console.log(localVar); // Error: localVar is not defined

//BLock Scope (let, const)
if (true) {
  const blockVar = 'I am block scoped';
  console.log(blockVar); // I am block scoped
}
// console.log(blockVar); // Error: blockVar is not defined (block scope)

if (true) {
  var oldVar = 'I am function scoped with var'; // this oldVar is leaking
}

console.log(oldVar);

//Scope chain
//inner function can access outer function variables and global variables
//outer function cannot access inner function variables
const globalString = 'global';

function outer() {
  const outerVar = 'outer';

  function inner() {
    const innerVar = 'inner';
    console.log(innerVar);
    console.log(outerVar);
    console.log(globalString);
  }
  inner();
  // console.log(innerVar); // Error: innerVar is not defined
}
// console.log(innerVar); // Error: innerVar is not defined
outer(); // Error: outer is not defined

/**
 * Q: Explain the difference between global, local, and block scope. 
 Global Scope:
- Variables declared outside any function/block
- Accessible everywhere in the code
- Exists for entire program lifetime

Local/Function Scope:
- Variables declared inside a function
- Only accessible within that function
- Created when function runs, destroyed when it ends

Block Scope:
- Variables declared inside {} (if, for, while, etc.)
- Only accessible within that block
- Only applies to let/const (not var)

Example:

const global = "global";  // Global scope

function myFunction() {
  const local = "local";  // Local/Function scope

  if (true) {
    const block = "block";  // Block scope
    console.log(global);    // ✅ Can access
    console.log(local);     // ✅ Can access
    console.log(block);     // ✅ Can access
  }

  console.log(block);  // ❌ Error! block not defined
}

console.log(local);  // ❌ Error! local not defined

Scope Chain:
- Inner scopes can access outer scopes
- Outer scopes CANNOT access inner scopes
- Search goes from inner → outer → global
 */

// Callback functions

//Functions as arguments
function greet2(name) {
  return `Hello ${name}`;
}

// Callback function
function processUser(callback) {
  const name = 'Alice';
  const message = callback(name); //return `Hello ${name}`
  console.log(message);
}

processUser(greet2); // Hello, Alice

/**
 
**[Display all questions]**

**Review from Previous Days (1-16):**
[Brief mention of previous questions]

**Today's NEW Questions (17-21):**
17. **Difference between parameters and arguments? What does return do?**
    - Parameters: definition; Arguments: actual values
    - Return: sends value back, stops execution

18. **Function declaration vs expression vs arrow function**
    - Declaration: hoisted, function name() {}
    - Expression: not hoisted, const name = function() {}
    - Arrow: not hoisted, () => {}, no own 'this'

19. **Explain global, local, and block scope**
    - Global: accessible everywhere
    - Local/function: inside function only
    - Block: inside {} with let/const (inside for, while, if, and etc..)

20. **What is a callback function?**
    - Function passed as argument to be executed later

21. **What is a higher-order function?**
    - Function that takes/returns functions
    - Examples: map, filter, reduce

**Total so far: 21 interview questions!**
 */

//Part 5: Hihger-order Functions - functions that takes a function or return a function
const createMultiplier = (factor) => {
  return function (number) {
    //number=5
    return number * factor; //factor=2
  };
};

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));
console.log(triple(5));

//Array methods
const numbers = [1, 2, 3, 4, 5, 6, 7];

//map: transforms each element
const squared = numbers.map((x) => x * x);
console.log(squared);

const doubles = numbers.map((number) => {
  return number * 2;
});
console.log(doubles);

// filter: keep elements that pass test
const evens = numbers.filter((x) => x % 2 === 0);
console.log(evens);

//find: get first element that passes test
const found = numbers.find((x) => x > 3);
console.log(found);

//reduce: combine all elemnts into one value
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);

/**
 Q: What is a higher-order function ? 
 A higher-order function is a function that:
1. Takes one or more functions as arguments (callbacks), OR
2. Returns a function as a result
 */
