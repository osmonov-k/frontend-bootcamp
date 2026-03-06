// Arithmetic operations in JavaScript

//Addition
console.log(5 + 3); // 8

//Subtraction
console.log(10 - 4); // 6

//Multiplication
console.log(6 * 7); // 42

//Division
console.log(20 / 5); // 4

//Modulus (Remainder)
console.log(10 % 3); // 1

//Exponentiation (Power)
console.log(2 ** 3); // 8

//Real-world examples

//Restaurant bill split
const totalBill = 120;
const people = 4;
const perPerson = totalBill / people;
console.log(`Each person should pay: $${perPerson}`); // Each person should pay: $30

// Pizza slices
const pizzas = 3;
const slicesPerPizza = 8;
const totalSlices = pizzas * slicesPerPizza;
console.log(`Total pizza slices: ${totalSlices}`); // Total pizza slices: 24

// Is a number even or odd?
const number = 7;
const isEven = number % 2 === 0; // 7 % 2 === 0 => 1 === 0 => false
console.log(`${number} is even: ${isEven}`); // 7 is even: false

// Increment and decrement

let score = 0;

// add 1
score = score + 1; // score is now 1
console.log(score); // 1

// shorthand: ++
score++; // score is now 2
console.log(score); // 2

// subtract 1
score--; // score is now 1
console.log(score); // 1

// add/subtract more
score += 5; // Same as: score = score + 5
console.log(score); // 6

score -= 2; // Same as: score = score - 2
console.log(score); // 4

score *= 3; // Same as: score = score * 3
console.log(score); // 12

score /= 4; // Same as: score = score / 4
console.log(score); // 3

//Interview Question 6
/** 
 * What is the difference betwee i++ and ++i in JavaScript?
- `i++` is the post-increment operator. It returns the current value of `i`
  and then increments `i` by 1.
- `++i` is the pre-increment operator. It increments `i` by 1 first and then
  returns the new value of `i`.

Example:
let i = 5;
console.log(i++); // Outputs: 5 (then i becomes 6)
console.log(i);   // Outputs: 6
console.log(++i); // i is now 7, Outputs: 7
*/

//Order of operations
// Parentheses -> Exponents -> Multiplication/Division -> Addition/Subtraction

console.log(3 + 5 * 2); // 13 (Multiplication first)

console.log(2 * (3 + 5)); // 16 (Parentheses first)

console.log(10 - 4 / 2 + 6); // 14 (Division first, then subtraction and addition)

// Exercise: Calculate the total cost of groceries
const apples = 3; // each $1.5
const bananas = 2; // each $0.75
const oranges = 5; // each $1.2

const totalCost = apples * 1.5 + bananas * 0.75 + oranges * 1.2;
console.log(`Total grocery cost: $${totalCost}`); // Total grocery cost: $12

// Part 2: Comparison Operators

// Greater than
console.log(5 > 3); // true
console.log(3 > 5); // false

// Less than
console.log(2 < 4); // true
console.log(4 < 2); // false

// Greater than or equal to
console.log(5 >= 5); // true
console.log(6 >= 7); // false

// Less than or equal to
console.log(3 <= 4); // true
console.log(5 <= 2); // false

// Equality (loose)
console.log(5 == '5'); // true, type coercion happens
console.log(5 == 6); // false

// Equality (strict)
console.log(5 === '5'); // false
console.log(5 === 5); // true

// Not equal (loose)
console.log(5 != '6'); // true
console.log(5 != 5); // false

// Not equal (strict)
console.log(5 !== '5'); // true
console.log(5 !== 5); // false

// Weird behavior with ==
console.log(0 == false); //true
console.log('' == 0); //true
console.log(null == undefined); //true

//safe behavior with ===
console.log(0 === false); //false
console.log('' === 0); //false
console.log(null === undefined); //false

/**
 * Q: What's the difference between == and === in JavaScript?
- `==` (loose equality): Compares values after type coercion (converts types)
- `===` (strict equality): Compares both value AND type (no conversion)

Always use `===` to avoid unexpected behavior!

Example:
5 == "5"     // true (string "5" converted to number 5)
5 === "5"    // false (different types: number vs string)

0 == false   // true (0 converts to false)
0 === false  // false (different types: number vs boolean)

null == undefined   // true (special case in ==)
null === undefined  // false (different types)

Best practice: Always use === and !== for comparisons.
 */

// Real-world examples:

const age = 17;
const canVote = age >= 18;
console.log(`Can vote: ${canVote}`); // Can vote: false

const password = 'secret123';
const userInput = 'secret123';
const isAuthenticated = password === userInput;
console.log(`Authenticated: ${isAuthenticated}`); // Authenticated: true

// Logical Operators

// AND (&&) - Both must be true
const studentAge = 20;
const hasLicense = true;

// Can they drive? Must be +18 AND have licence
const canDrive = studentAge >= 18 && hasLicense;
console.log(canDrive);

//Another example
const userPassword = 'secret';
const userName = 'admin';
const isValidUser = userName === 'admin' && userPassword === 'secret';
console.log(`Is valid user: ${isValidUser}`); // Is valid user: true

const invalidLogin = userName === 'admin' && userPassword === 'wrong';
console.log(`Inalid login: ${invalidLogin}`); // Valid login: false

// OR (||) - At least one must be true
const hasCard = false;
const hasCash = true;

// Can pay if they have card OR cash
const canPay = hasCard || hasCash;
console.log(`Can pay: ${canPay}`); // Can pay: true

// Only if both are false => overall false
const result = false || false;
console.log(result); // false

//Not operator (!) - Flips the value true/false
const isRaining = false;
const isSunny = !isRaining; // true
console.log(`Is sunny: ${isSunny}`); // Is sunny: true

const isLoggedIn = true;
const needsToLogin = !isLoggedIn; // false
console.log(`Needs to login: ${needsToLogin}`); // Needs to login: false

// Double negation (!!) - Converts value to boolean
const value = true;
console.log(!!value); // true

/**
 * Q: What do the logical operators &&, ||, and ! do in JavaScript?
 * **Answer:**
```
`&&` (AND) - Returns first falsy value, or last value if all truthy
`||` (OR) - Returns first truthy value, or last value if all falsy

They use short-circuit evaluation:
- `&&` stops at first false
- `||` stops at first true

Examples:
true && true          // true (both true)
true && false         // false (second is false)
"hello" && "world"    // "world" (both truthy, returns last)
false && "anything"   // false (stops at first falsy)

true || false         // true (first is true)
false || "hello"      // "hello" (first falsy, returns second)
null || undefined     // undefined (both falsy, returns last)

Common use cases:
const name = userName || "Guest";  // Default value
isLoggedIn && showDashboard();     // Conditional execution
 */

// Part 4: If/Else Statements

const personAge = 28;
//if by itself
if (personAge >= 18) {
  console.log('You are an adult.'); // You are an adult.
}

//if with else
if (personAge >= 18) {
  console.log('You are an adult.'); // You are an adult.
} else {
  console.log('You are a minor.');
}

const mathScore = 85;
//if, else if, else
if (mathScore >= 90) {
  console.log('Grade: A');
} else if (mathScore >= 80) {
  console.log('Grade: B'); // Grade: B
} else if (mathScore >= 70) {
  console.log('Grade: C');
} else {
  console.log('Grade: F');
}

//Nested If statements
const teacherAge = 20;
const teacherHasLicense = true;

if (teacherAge >= 18) {
  if (teacherHasLicense) {
    console.log('Can teach.');
  } else {
    console.log('Cannot teach without a license.');
  }
} else {
  console.log('Too young to teach.');
}

// Part 5: Switch Statements

const day = 'Monday';

// Using switch
switch (day) {
  case 'Monday':
    console.log('Start of the work week.');
    break;
  case 'Wednesday':
    console.log('Midweek day.');
    break;
  case 'Friday':
    console.log('Last workday of the week.');
    break;
  default:
    console.log('Just another day.');
}

// don't forget the break statements! Otherwise it falls through (doesn't stop)
const grade = 'B';

switch (grade) {
  case 'A':
    console.log('Excellent!');
    break;
  case 'B':
    console.log('Well done!'); // Well done!
    break;
  case 'C':
    console.log('Good job!');
    break;
  default:
    console.log('Keep trying!');
}

/**
 * Q: When should you use a 'switch' statement instead of 'if/else' in JavaScript?
 Use switch when:
- Checking ONE variable against multiple exact values
- You have many (3+) discrete options
- Values are constants (strings, numbers)
- Code readability benefits from switch structure

Use if/else when:
- Multiple different conditions
- Range checking (>, <, >=, <=)
- Complex boolean logic (&&, ||)
- Only 1-2 conditions

Example - GOOD for switch:
switch (day) {
  case "Monday": ...
  case "Tuesday": ...
}

Example - BAD for switch (use if/else):
if (age >= 18 && hasLicense) {  // Complex condition
  ...
} else if (score > 80) {         // Range check
  ...
}
 */

// Part 6: Ternary Operator - Shorthand for If/Else

const userAge = 20;
let userStatus;

if (userAge >= 18) {
  userStatus = 'Adult';
} else {
  userStatus = 'Minor';
}

const userStatus2 = userAge >= 18 ? 'Adult' : 'Minor';

const examScore = 75;
const examResult = examScore >= 60 ? 'Pass' : 'Fail';
console.log(`Exam result: ${examResult}`); // Exam result: Pass

/**
 * Q: What is the ternary operator in JavaScript and when should you use it?
 **Answer:**
```
The ternary operator is a shorthand for simple if/else statements.

Syntax: condition ? expressionIfTrue : expressionIfFalse

Use it when:
- Simple, one-line conditionals
- Assigning values based on a condition
- Inline expressions (like in React JSX)

Avoid it when:
- Complex conditions
- Multiple statements needed
- Nested ternaries (hard to read)

Examples:
// Good use
const canVote = age >= 18 ? "Yes" : "No";
const discount = isPremium ? 0.2 : 0.1;

// Bad use (too complex)
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
// Better as if/else
```
 */

//Avoid ternery operators if it gets too complex!
const quizScore = 85;
const quizGrade =
  quizScore >= 90 ? 'A' : quizScore >= 80 ? 'B' : quizScore >= 70 ? 'C' : 'F';
console.log(quizGrade); // B

//Part 7: Live coding - FizzBuzz Challenge:
/**
Print numbers 1 to 20, but:
- If divisible by 3, print "Fizz"
- If divisible by 5, print "Buzz"
- If divisible by both, print "FizzBuzz"
- Otherwise, print the number
 */

/**
 * 
**Yesterday's Questions (Review):**
1. Difference between let, const, var
2. Primitive data types
3. Difference between null and undefined
4. Template literals
5. typeof operator quirks

**Today's NEW Questions:**
6. **Difference between `i++` and `++i`?**
   - i++: post-increment (return then increment)
   - ++i: pre-increment (increment then return)

7. **Difference between `==` and `===`?**
   - ==: loose equality (type coercion)
   - ===: strict equality (checks type and value)

8. **How do `&&` and `||` work?**
   - &&: returns first falsy or last value
   - ||: returns first truthy or last value

9. **When to use switch vs if/else?**
   - switch: one variable, many exact values
   - if/else: complex conditions, ranges

10. **What is the ternary operator?**
    - Shorthand: condition ? ifTrue : ifFalse
11. **Explain FizzBuzz**
    - Check divisibility, most specific condition first
**Total so far: 11 interview questions!**
 */
