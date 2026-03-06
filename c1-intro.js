console.log('Shaislam!');
console.log('Shaislam!');

/**
 * Multi-line comment
 * Multi-line comment
 * Multi-line comment
 */
// One line comment
let yourName; // variable declaration
yourName = 'Doe'; // variable assignment
yourName = 'Jane'; // variable reassignment
console.log(yourName);

// We use let to declare variables that can be reassigned
let myName = 'John';
console.log(myName);
// Reassigning the variable
myName = 'Smith';
console.log(myName);

// We use const to declare variables that cannot be reassigned
const pi = 3.14;
const MAX_USERS = 100;
const API_KEY = '1234567890abcdef';

// name conventions
let firstName = 'Alice';
let age = 25;
let isStudent = true;

// Invalid variable names
/**
let 123abc = 'nope' // can't tart with a number
let my-dish = 'nope'; // can't use hyphens
let let = 'nope'; // can't use reserved keywords
 */

// Convention: camelCase for variable names
let userAge = 30;
let totalPrice = 99.99;
let isLoggedIn = false;

//Interview question
// Q: What is the difference between let, const, and var?
// A:
// - let: used to declare block-scoped variables that can be reassigned.
// - const: used to declare block-scoped variables that cannot be reassigned.
// - var: used to declare function-scoped variables, can be reassigned, and is hoisted.

// Data types:
// Primitive data types
// 1. String
const lastName = 'Brown';
const emoji = '😊';
const longText = 'This is a long text that spans multiple lines.';

//Strings can use '', "", or `` (template literals)
const single = 'Single quotes';
const double = 'Double quotes';
const template = `Template literal ${single}`;

// 2. Number
const ageYears = 28; // integer
const price = 19.99; // float
const negativeNumber = -5;
const infinitive = Infinity;

// 3. Boolean
const isAdult = true;
const hasLicense = false;

// 4. Null
let emptyValue = null;

// 5. Undefined
let notAssigned; // undefined by default

// Checking Types:
console.log(typeof 'Hello'); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof null); // "object" (this is a known quirk in JavaScript)
console.log(typeof undefined); // "undefined"

/**
Q: What are the primitive data types in JavaScript?

**Answer:**
```
There are 7 primitive data types in JavaScript:

1. String - Text values: "hello", 'world', `template`
2. Number - Integers and decimals: 42, 3.14, -5
3. Boolean - true or false
4. Undefined - Variable declared but not assigned
5. Null - Intentional absence of value
6. Symbol - Unique identifier (ES6)
7. BigInt - Very large integers (ES2020)

Most commonly used: String, Number, Boolean, Undefined, Null
 */

/**
 * What is the difference between null and undefined in JavaScript?
- `undefined`: Variable is declared but has not been assigned a value yet.
  JavaScript automatically assigns undefined.
- `null`: Intentional absence of value. Developer explicitly sets it to null
  to indicate "this should be empty."
  Example:
let x;               // x is undefined (not assigned)
let y = null;        // y is null (explicitly set to empty)
console.log(x);      // undefined
console.log(y);      // null
 */

// Template literals
const fatherName = 'Robert';
const fatherAge = 50;
//old way
console.log(
  "Hello, my father's name is " +
    fatherName +
    ' and he is ' +
    fatherAge +
    ' years old.',
);

//new way
console.log(
  `Hello, my father's name is ${fatherName} and he is ${fatherAge} years old.`,
);

const pizza = 3;
const people = 4;
console.log(`Each person gets ${pizza / people} slices of pizza.`);

// My name is Shaislam, I live in San Jose, and I'm from Kyrgyzstan.
const myCity = 'San Jose';
const myCountry = 'Kyrgyzstan';
const myFirstName = 'Shaislam';
const mySentence = `My name is ${myFirstName}, I live in ${myCity}, and I'm from ${myCountry}.`;
console.log(mySentence);

/**
 * What are template literals in JavaScript and why do we use it?
 * **Answer:**
Template literals (template strings) are string literals that allow:
1. Embedded expressions using ${}
2. Multi-line strings without \n
3. Cleaner string concatenation

Syntax: Use backticks `` instead of quotes
 */

// Common mistakes to address

/** 
1. **What is the difference between `let`, `const`, and `var`?**
   - `let`: block-scoped, reassignable
   - `const`: block-scoped, not reassignable
   - `var`: function-scoped, avoid in modern JS

2. **What are the primitive data types in JavaScript?**
   - String, Number, Boolean, Undefined, Null, Symbol, BigInt

3. **What's the difference between `null` and `undefined`?**
   - `undefined`: not assigned yet (automatic)
   - `null`: intentionally empty (manual)

4. **What are template literals?**
   - Strings with backticks that allow embedded expressions ${} and multi-line

5. **What does `typeof` return for `null`?**
   - "object" (this is a known bug in JavaScript!)

✅ Set up VS Code and Node.js
✅ Ran our first JavaScript code
✅ Learned about variables (let, const)
✅ Explored data types (string, number, boolean)
✅ Used template literals for cleaner strings
✅ Went through 5 interview questions!


1. freeCodeCamp exercises (practice basics)
2. Write 10 small programs (apply what you learned)
3. MEMORIZE today's 5 interview questions (you'll be quizzed tomorrow!) 
4. Read MDN docs (deeper understanding) (super optional)


*/
