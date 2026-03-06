/**
 * 
 * ## Learning Objectives
- [ ] Use `for` loops to repeat code
- [ ] Use `while` loops for conditional repetition
- [ ] Use `for...of` loops to iterate arrays
- [ ] Create and access arrays
- [ ] Use array methods: push, pop, shift, unshift
- [ ] Understand array indexing (0-based)
- [ ] Solve problems with loops and arrays
- [ ] **Answer 5 new interview questions**
 */

// Part 1: Why we need for loops
console.log('Hello 1');
console.log('Hello 2');
console.log('Hello 3');
console.log('Hello 4');
console.log('Hello 10');

// for (initialize; condition; increment) { code }
for (let i = 1; i < 5; i++) {
  console.log(`Hello ${i}`);
}

// 1. let i = 1       → Start at 1
// 2. i < 5           → Keep going while i is less than 5
// 3. i++             → After each loop, add 1 to i
// 4. { console.log } → Code to repeat

// Round 1: i = 1, check 1 < 5 (true), print 0, then i++ → i = 2
// Round 2: i = 2, check 2 < 5 (true), print 2, then i++ → i = 3
// Round 3: i = 3, check 3 < 5 (true), print 3, then i++ → i = 4
// Round 4: i = 4, check 4 < 5 (true), print 4, then i++ → i = 5
// Round 5: i = 5, check 5 < 5 (false), STOP!

// Different Patterns
// Count from 0 to 9 evens
for (let i = 0; i < 10; i += 2) {
  console.log(`Even number: ${i}`);
}

// Count backwards from 10 to 1
for (let i = 10; i > 0; i--) {
  console.log(`Countdown: ${i}`);
}

for (let i = 0; i <= 50; i += 5) {
  console.log(i);
}

// Sum numbers from 1 to 100
let sum = 0;

for (let i = 1; i < 101; i++) {
  sum += i; // sum = sum + i
  console.log(`Iteration is ${i} and sum is ${sum}`);
}
console.log(`Sum from 1 to 100 is: ${sum}`);

/**
 * Q: Explain the three parts of a for loop.
 **Answer:**
```
A for loop has three parts in the parentheses:

1. Initialization: Runs once before the loop starts
   Example: let i = 0

2. Condition: Checked before each iteration; loop continues while true
   Example: i < 10

3. Increment/Update: Runs after each iteration
   Example: i++

Syntax:
for (initialization; condition; increment) {
  // code to repeat
}
 */

// Part 2: While loops

//For loop: "Do this x times"
for (let i = 1; i <= 5; i++) {
  console.log(`For loop iteration: ${i}`);
}

//While loop: "Do this while condition is true"
let count = 1;
while (count <= 5) {
  console.log(`While loop iteration: ${count}`);
  count++;
}

// Real example
let guess = 0;
let target = 7;

while (guess !== target) {
  // Math.random() gives a float between 0 and 1,
  guess = Math.floor(Math.random() * 10); // Random number between 0-9
  console.log(`Guessed: ${guess}`);
}
console.log('Correct guess!');

/**
 * Q: What's the difference between a for loop and a while loop?
 **Answer:**
```
For loop:
- Use when you know how many iterations in advance
- Has built-in counter (initialization, condition, increment)
- Example: Loop through array indices, count from 1 to 10

While loop:
- Use when you don't know how many iterations
- Only has a condition; you manage the counter yourself
- Example: Keep asking for input until valid, game loops

Example comparison:

// FOR - Known iterations
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// WHILE - Unknown iterations
let password = "";
while (password !== "correct") {
  password = getUserInput(); // Don't know how many tries
}

Common pitfall: Forgetting to increment in while loop causes infinite loop!

let i = 0;
while (i < 5) {
  console.log(i);
  // Missing i++! Infinite loop!
}
 */

//Part 3: Arrays

//Before: Storing multiple values - Annoying
const fruit1 = 'Apple';
const fruit2 = 'Banana';
const fruit3 = 'Orange';

//After: Using an array (list of values)
const fruits = ['Apple', 'Banana', 'Orange'];
console.log(fruits);

//Creating arrays

//Method 1: Literal syntax
const colors = ['Red', 'Green', 'Blue'];

// Method 2: Using Array constructor (rarely used)
const numbers = new Array('Red', 'Green', 'Blue');

// Empty array
const emptyArray = [];

// Mixed types (valid, but not recommended)
const mixedArray = ['Hello', 42, true, null, undefined];

// Array indexing (0-based)
const myFruits = ['Mango', 'Pineapple', 'Grapes'];

//Accessing elements
console.log(myFruits[0]); // Mango
console.log(myFruits[1]); // Pineapple
console.log(myFruits[2]); // Grapes
console.log(myFruits[3]); // undefined (no element at index 3)
console.log(myFruits[-1]); // undefined (negative index not valid)

// Array length;
console.log(`Number of fruits: ${myFruits.length}`); // 3

// Access last element
console.log(`Last fruit: ${myFruits[myFruits.length - 1]}`); // Grapes

/**
 * Q: Why do arrays start at index 0 in JavaScript (and many programming languages)?
 And how do you access the last element of an array?

Arrays use 0-based indexing for historical/technical reasons (related to memory offsets in C).
First element: array[0]
Last element: array[array.length - 1]

Example:
const fruits = ["apple", "banana", "orange"];

fruits[0]                  // "apple" (first)
fruits[1]                  // "banana" (second)
fruits[2]                  // "orange" (third/last)
fruits.length              // 3 (total elements)
fruits[fruits.length - 1]  // "orange" (last element)

Why length - 1 for last element?
- Array has 3 elements (length = 3)
- Indices are 0, 1, 2
- Last index is always length - 1

Common mistakes:
fruits[fruits.length]      // undefined (out of bounds!)
fruits[3]                  // undefined (only indices 0-2 exist)
 */

// Part 4: Array methods
const stack = [];

//push: add to end
stack.push('plate 1');
stack.push('plate 2');
stack.push('plate 3');
console.log(stack); // ['plate 1', 'plate 2', 'plate 3']

//pop: remove from end
const removedPlate = stack.pop();
console.log(`Removed: ${removedPlate}`);
console.log(stack); // ['plate 1', 'plate 2']

//unshift: add to start
stack.unshift('plate 0');
console.log(stack); // ['plate 0', 'plate 1', 'plate 2']

//shift: remove from start
const firstPlate = stack.shift();
console.log(`Removed from start: ${firstPlate}`);
console.log(stack); // ['plate 1', 'plate 2']

/**
 * Q: Explain the difference between push/pop and unshift/shift array methods in JavaScript.
 
**Answer:**
```
push/pop - Operate on END of array (fast, O(1))
shift/unshift - Operate on START of array (slower, O(n) for large arrays)

Methods:
- push(item): Add to end, returns new length
- pop(): Remove from end, returns removed item
- unshift(item): Add to start, returns new length
- shift(): Remove from start, returns removed item

Example:
const arr = [1, 2, 3];

arr.push(4);      // [1, 2, 3, 4] - add to end
arr.pop();        // [1, 2, 3] - remove from end

arr.unshift(0);   // [0, 1, 2, 3] - add to start
arr.shift();      // [1, 2, 3] - remove from start

Use cases:
- push/pop: Stack (LIFO - Last In First Out)
- shift/unshift: Queue (FIFO - First In First Out)

Performance tip: Prefer push/pop when possible (faster!)
```
 */

// Part 5: For ... of loop

const animals = ['Dog', 'Cat', 'Elephant'];

//classical for loop
for (let i = 0; i < animals.length; i++) {
  console.log(`Animal at index ${i} is ${animals[i]}`);
}

//new shorter way: for...of loop
for (const animal of animals) {
  console.log(`Animal: ${animal}`);
}

//Real example

// Total price calculation
const prices = [10.55, 20.23, 30.45, 40.68, 50.99];
let totalPrice = 0;

for (const price of prices) {
  totalPrice += price;
}
console.log(`Total Price: $${totalPrice.toFixed(2)}`);

// Find max number
const myNumbers = [5, 12, 8, 21, 3, 18];
let maxNumber = myNumbers[0]; //21

for (const num of myNumbers) {
  if (num > maxNumber) {
    maxNumber = num;
  }
}
console.log(`Max number is: ${maxNumber}`);

// Filter even numbers
const mixedNumbers = [4, 7, 10, 13, 16, 19, 22];
const evenNumbers = [];

for (const number of mixedNumbers) {
  if (number % 2 === 0) {
    evenNumbers.push(number);
  }
}
console.log(`Even numbers: ${evenNumbers}`);

/** 
 * Q: What is 'for' and 'for ...of' loop in JavaScript? When would you use each?
 **Answer:**
 for loop:
- Traditional loop with index counter
- Use when you need the index
- Works with any iterable

for...of loop:
- Iterates over VALUES of an iterable (arrays, strings), 
- Cleaner syntax when you don't need index
- ES6 feature
*/

/**
 * **Review from Monday (1-5):**
1. Difference between let, const, var
2. Primitive data types
3. Difference between null and undefined
4. Template literals
5. typeof operator quirks

**Review from Tuesday (6-11):**
6. Difference between i++ and ++i
7. Difference between == and ===
8. How && and || work
9. When to use switch vs if/else
10. Ternary operator
11. FizzBuzz explanation

**Today's NEW Questions (12-16):**
12. **Three parts of for loop syntax**
    - Initialization, condition, increment

13. **Difference between for and while loops**
    - for: known iterations; while: unknown iterations

14. **Why arrays start at 0? Access last element?**
    - 0-based indexing; array[array.length - 1]

15. **Difference between push/pop and shift/unshift**
    - push/pop: end of array; shift/unshift: start of array

16. **Difference between for, for...of,
    - for: index; for...of: values
 */

/**
 * HW:
 */
