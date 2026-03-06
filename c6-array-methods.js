// Part 1: Why array methods ?

//Old way
const numbers = [1, 2, 3, 4, 5];
const numbersDoubled = [];

for (let i = 0; i < numbers.length; i++) {
  numbersDoubled.push(numbers[i] * 2);
}
console.log(numbersDoubled);

// This works, but it's verbose and error-prone
// We manage the index manually
// We create and push to a new array
// More chances for bugs

// The Modern Way (Array methods)
// Example 1
const numbers2 = [5, 4, 3, 2, 1];
const numbers2Doubled = numbers2.map((num) => num * 2);
console.log(numbers2Doubled);
// ✅ Cleaner
// ✅ Less error-prone
// ✅ More readable
// ✅ This is how professionals write JavaScript

//Example 2
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];

const userNames = users.map((user) => user.name);
console.log(userNames);

// Example 3
const prices = [10, 20, 30];

const priceWithTax = prices.map((price) => {
  const tax = price * 0.1;
  const total = price + tax;
  return `$${total.toFixed(2)}`;
});
console.log(priceWithTax);

// Map method in array, its callback can take 3 arguments: first element, second index, third original array
const number3 = [10, 20, 30];
number3.map((element, index, array) => {
  console.log(`Element: ${element}`);
  console.log(`Index: ${index}`);
  console.log(`Array: ${array}`); //original array
  return element * 2;
});

/**
Q: What does .map do and what does it return? 

.map() creates a NEW array by applying a function to every element
of the original array.

Key points:
- Does NOT modify the original array
- ALWAYS returns a new array with the same length
- The callback function runs once for each element
- Whatever you return from the callback becomes the new element

Example:
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
// doubled: [2, 4, 6]
// numbers: [1, 2, 3] (unchanged)

Common use cases:
- Transforming data (doubling numbers, formatting strings)
- Extracting properties from objects
- Creating React components from data
 */

// Part 3: .filter() - keep only what you want
// Callback returns true/false
// true = keep element
// false = exclude element

const numbers4 = [1, 2, 3, 4, 5, 6, 7];
const evenNumbers = numbers4.filter((num) => num % 2 === 0);
console.log(evenNumbers);

const products = [
  { name: 'laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 95, inStock: true },
  { name: 'Keyboard', price: 120, inStock: false },
];

const affordableInStock = products.filter((product) => {
  return product.price < 200 && product.inStock;
});
console.log(affordableInStock);

/**
 What's the difference between .map and .filter() ?

 .map() transforms every element → same length array
.filter() keeps some elements → possibly shorter array

.map():
- Returns array with SAME length as original
- Transforms each element
- Callback returns the new value

.filter():
- Returns array with SAME or SHORTER length
- Selects which elements to keep
- Callback returns true (keep) or false (remove)

Example:
const numbers = [1, 2, 3, 4];

numbers.map(n => n * 2);    // [2, 4, 6, 8] - same length
numbers.filter(n => n > 2); // [3, 4] - shorter

When to use:
- map: "I want to transform all elements"
- filter: "I want only elements that match a condition"
 */

//Part 4: .reduce() - The Swiss Army Knife

/**
 reduce() reduces an array to a SINGLE value
- Most powerful array method
- Can implement map, filter, and more with reduce
- Takes: callback + initial value
- Callback gets: accumulator, current element
 */

const numbers5 = [1, 2, 3, 4, 5];
const sum = numbers5.reduce((accumulator, currentElement) => {
  return accumulator + currentElement;
}, 0); //0 is the initial value

console.log(sum);
// How it works step-by-step:
// Step 1: acc = 0, current = 1 → return 0 + 1 = 1
// Step 2: acc = 1, current = 2 → return 1 + 2 = 3
// Step 3: acc = 3, current = 3 → return 3 + 3 = 6
// Step 4: acc = 6, current = 4 → return 6 + 4 = 10
// Step 5: acc = 10, current = 5 → return 10 + 5 = 15

//Find max number: const numbers5 = [1, 2, 3, 4, 5];
const maxNum = numbers5.reduce((max, num) => {
  return num > max ? num : max;
}, numbers5[0]);
console.log(maxNum);
// How it works step-by-step:
// Step 1: acc = 1, current = 1 → return  1 > 1 ? 1 : 1
// Step 2: acc = 1, current = 2 → return 2 > 1 ? 2 : 1;
// Step 3: acc = 2, current = 3 → return 3 > 2 ? 3 : 2;

// Example 3: Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  // acc['apple'] = (acc['apple'] || 0) + 1
  return acc;
}, {});

console.log(count);
// { apple: 3, banana: 2, orange: 1 }

// Example 4: Flatten array
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6];

// Example 5: Group by property
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
];

const byAge = people.reduce((acc, person) => {
  const age = person.age;
  if (!acc[age]) {
    acc[age] = [];
  }
  acc[age].push(person);
  return acc;
}, {});

console.log(byAge);
// {
//   25: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 25 }],
//   30: [{ name: "Bob", age: 30 }]
// }

/**
Q: Explain how .reduce() works? What ar ethe accumulator and current value? 
.reduce() iterates through an array and "reduces" it to a single value.

Syntax: array.reduce(callback, initialValue)

Callback parameters:
1. accumulator - The running total/result
2. current - Current element being processed
3. index (optional)
4. array (optional)

How it works:
- First iteration: accumulator = initialValue, current = first element
- Each iteration: accumulator = what you returned last time
- Final iteration: returns the final accumulator value

Example - Sum numbers:
[1, 2, 3].reduce((acc, curr) => acc + curr, 0)

Iterations:
1. acc = 0, curr = 1 → return 1
2. acc = 1, curr = 2 → return 3
3. acc = 3, curr = 3 → return 6
Final result: 6

Common uses:
- Sum/multiply all numbers
- Count occurrences
- Group data
- Flatten arrays
- Build objects from arrays
 */

// Part 5: Other essential array methods
// .forEach() - do something with each element

// forEach runs a functoin for each element
// DOES NOT return anything
// Used for side effects (console.log, dom manipulation)

const numbers7 = [1, 2, 3];
numbers7.forEach((num) => {
  console.log(num * 2); // Prints 2, 4, 6, returns: undefined
});

// .find() - get first match, return should be true or false
const usersB = [
  { id: 1, name: 'Martin' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Bob' },
];

const desiredUser = usersB.find((user) => user.id === 2);
console.log(desiredUser); // { id: 2, name: 'John' }

// find() vs filter()
usersB.filter((u) => u.id === 2); // Returns array: [{ id: 2, name: "Bob" }]
usersB.find((u) => u.id === 2); // Returns object: { id: 2, name: "Bob" }

const usersNames = ['Martin', 'John', 'Bob'];
const john = usersNames.find((u) => u === 'John');
console.log(john);

//findIndex(); get first match index. // Returns -1 if not found
const numbers8 = [10, 20, 30, 40];
const numIndex = numbers8.findIndex((n) => n > 25);
console.log(numIndex);

const whatIf = numbers8.findIndex((n) => n > 100); //-1
console.log(whatIf);

// .some() - check if nay ANY match. Returns true if AT LEAST ONE element passes the test

const numbers9 = [1, 3, 5, 7, 8];
const hasEven = numbers9.some((n) => n % 2 === 0);
console.log(hasEven);

// .every() - check if ALL match;

const numbers10 = [4, 3, 5, 7, 8];
const allBiggerThan1 = numbers9.every((n) => n > 3);
console.log(allBiggerThan1);

/**
 What's the difference between .some() and .every() ? 

 .some() - Returns true if AT LEAST ONE element passes the test
.every() - Returns true if ALL elements pass the test

Both return boolean (true/false)
Both stop early when answer is determined

.some():
- Returns true as soon as ONE match is found
- Returns false if NONE match
- "Is there at least one?"

.every():
- Returns false as soon as ONE fails
- Returns true if ALL pass
- "Do they all satisfy this?"

Example:
const numbers = [1, 2, 3, 4];

numbers.some(n => n > 2);  // true (3 and 4 are > 2)
numbers.every(n => n > 2); // false (1 and 2 are not > 2)

numbers.some(n => n > 5);  // false (none are > 5)
numbers.every(n => n > 0); // true (all are > 0)
 */

// Part 6: Method chaining

//Example
const numbers11 = [1, 2, 3, 4, 5, 6, 7, 8];

const result11 = numbers11.filter((n) => n % 2 === 0).map((n) => n * 2);
console.log(result11); // 4,8,12,16

// Example 2: Complex data transformation
const users1 = [
  { name: 'Alice', age: 17, active: true },
  { name: 'Bob', age: 25, active: true },
  { name: 'Charlie', age: 30, active: false },
  { name: 'Diana', age: 22, active: true },
];

// Get names of active adult users in uppercase
const activeAdultNames = users1
  .filter((user) => user.active) // Active users only
  .filter((user) => user.age >= 18) // Adults only
  .map((user) => user.name) // Extract names
  .map((name) => name.toUpperCase()); // Uppercase

console.log(activeAdultNames); // ["BOB", "DIANA"]

/**
 Q: Can you chain array methods? Give an example. 
 Yes! Since map, filter, and other methods return arrays,
you can chain them together.

The result of one method becomes the input to the next.
Read chains from left to right (or top to bottom if formatted).

Example:
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers
  .filter(n => n > 2)    // [3, 4, 5, 6]
  .map(n => n * 2)       // [6, 8, 10, 12]
  .reduce((sum, n) => sum + n, 0);  // 36

Flow:
1. Filter keeps numbers > 2 → [3, 4, 5, 6]
2. Map doubles each → [6, 8, 10, 12]
3. Reduce sums all → 36

Benefits:
- Cleaner code
- Easier to read
- Functional programming style

Performance note: Each method iterates the array, so very long
chains might be slower than a single loop for huge datasets.
 */

/**
 When would you use .forEach vs .map() ?
Use .map() when you need a NEW array with transformed values
Use .forEach() when you just want to DO something with each element

.map():
- Returns a new array
- Use when transforming data
- Functional approach

.forEach():
- Returns undefined
- Use for side effects (console.log, DOM updates, etc.)
- Imperative approach

Example:

// Use map - need new array
const doubled = numbers.map(n => n * 2);

// Use forEach - just logging
numbers.forEach(n => console.log(n));

// Bad - using forEach when map is better
let doubled = [];
numbers.forEach(n => doubled.push(n * 2)); // ❌

// Good - use map
const doubled = numbers.map(n => n * 2); // ✅

Rule of thumb: If you're returning/storing values, use map.
If you're just doing side effects, use forEach.
 */

//10-15min
const students = [
  { name: 'Alice', scores: [85, 90, 88] }, //89
  { name: 'Bob', scores: [70, 75, 72] }, //73
  { name: 'Charlie', scores: [95, 98, 96] },
  { name: 'Diana', scores: [60, 65, 63] },
];
// Tasks:
// 1. Calculate average score for each student
// 2. Filter students with average >= 80
// 3. Return array of names (uppercase)
// return array of names

const studentsResult = students
  .map((student) => {
    const scoresSum = student.scores.reduce((sum, s) => sum + s, 0); //i.e.total score 85+90+88
    const scoresNumber = student.scores.length;
    const average = scoresSum / scoresNumber;
    return { name: student.name, average: average };
  })
  .filter((student) => student.average >= 80)
  .map((student) => student.name.toUpperCase());

//Interview recap
/**
1. **What does `.map()` do?** - Transforms every element, returns new array (same length)
2. **Difference between `.map()` and `.filter()`?** - map transforms all, filter selects some
3. **How does `.reduce()` work?** - Accumulates array into single value
4. **Difference between `.some()` and `.every()`?** - some = at least one, every = all
5. **Can you chain array methods?** - Yes, because they return arrays
6. **When to use `.forEach()` vs `.map()`?** - forEach for side effects, map for transformation
 */
