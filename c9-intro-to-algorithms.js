// Why Big O matters ?
//Big O - is a time complexity (n, n2 (square), logN, and etc)

//Solution 1
function hasZero1(arr) {
  // time complexity is going to be n. (n is array length)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) return true;
  }
  return false;
}

//hasZero1 -> has time complexity of O(n)

//Imagine we have 10,000 elements or 1,000,000 elements
//The difference between two functions can be hours

//Big 0 helps us predict: How does runtime grow as input grows!

// Part 2: Big 0 Basics

// O(1) - Constant Time

// Always takes the same time regardless of input size
//[1,2,3,4,5,6,7,8,9,10], [2,3]
function getFirst(arr) {
  return arr[0]; // O(1)
}

function addNumbers(a, b) {
  return a + b; // O(1)
}
// Number of operations doesn't change with input size
getFirst([1]); // 1 operation
getFirst([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // Still 1 operation

// O(n) - linear Time
//Time grows proportionally with input size
const printAll = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
};
console.log(printAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); //10 items
// 10 items -> 10 operations
// 1000 items -> 1000 operations
// n items -> n operations = O(n)

// O(n²) - Quadratic Time
// Nested loops = multiplied complexity
const printPairs = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    //n times
    for (let j = 0; j < arr.length; j++) {
      //n times
      console.log(arr[i], arr[j]);
    }
  }
};
console.log(printPairs([1, 2, 3, 4]));
// O(n²) - nested loops over array

/**
Q: What is Big O notation? Explain O(1), O(n), O(n²).
**Answer:**
```
Big O notation describes how runtime grows as input size increases.
It measures worst-case time complexity.

O(1) - Constant:
- Runtime doesn't change with input size
- Example: array[0], object.key
- Best case

O(n) - Linear:
- Runtime grows proportionally with input
- Example: loop through array once
- Acceptable for most cases

O(n²) - Quadratic:
- Runtime grows exponentially
- Example: nested loops
- Avoid for large datasets

Comparison with n=1000 (array length):
O(1): 1 operation
O(n): 1,000 operations
O(n²): 1,000,000 operations

Why it matters:
- Helps choose right algorithm
- Predicts performance at scale
- Critical for interview success
```
 */

// Analyze Code

// Example 1
function logFirstAndLast(arr) {
  // time complexity of this function:
  console.log(arr[0]); // O(1)
  console.log(arr[arr.length - 1]); // O(1)
}
//Total: O(1) + O(1) = O(1)

// Example 2
function logAll(arr) {
  for (let item of arr) {
    //O(n)
    console.log(item);
  }
  console.log('Done!'); // O(1)
}
// Total: O(n) + O(1) = O(n)
//We drop constants

// Example 3
function logAllPairsAndTriples(arr) {
  // Pairs - //O(n2)
  for (let i = 0; i < arr.length; i++) {
    //O(n)
    for (let j = 0; j < arr.length; j++) {
      //O(n)
      console.log(arr[i], arr[j]);
    }
  }

  // Triples - O(n³)
  for (let i = 0; i < arr.length; i++) {
    //O(n)
    for (let j = 0; j < arr.length; j++) {
      //O(n)
      for (let k = 0; k < arr.length; k++) {
        //O(n)
        console.log(arr[i], arr[j], arr[k]);
      }
    }
  }
}
// O(n²) + O(n³) = O(n³)
// We keep only the largest term

/**
Q; How do you calculate the Big O of nested loops? 
**Answer:**
```
Multiply the complexities of each loop.

One loop: O(n)
for (let i = 0; i < n; i++) { }

Two nested loops: O(n * n) = O(n²)
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) { }
}

Three nested loops: O(n * n * n) = O(n³)
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) { }
  }
}

Different sized loops:
for (let i = 0; i < n; i++) {    // n times
  for (let j = 0; j < m; j++) {  // m times
  }
}
// O(n * m)

If m and n are same variable: O(n²)
If m is constant: O(n)

Key rule: Nested = multiply
```
 */

// Part 4: Space Complexity

// Time complexity: how long it takes
// Space complexity: how much memory it takes

//O(1) Space
function sum(arr) {
  let total = 0; // 1 variable
  for (let num of arr) {
    total += num;
  }
  return total;
}
// Space: O(1) - only stores 'total'

// O(n) Space
function double(arr) {
  const result = []; //creating new array
  for (let num of arr) {
    result.push(num * 2);
  }
  return result;
}
// Space: O(n) - new array of size n

//
function pairMatrix(arr) {
  const matrix = [];
  for (let i = 0; i < arr.length; i++) {
    const row = [];
    for (let j = 0; j < arr.length; j++) {
      row.push([arr[i], arr[j]]);
    }
    matrix.push(row);
  }
  return matrix;
}

console.log(pairMatrix([1, 2, 3, 4, 5])); //3
//Time O(n²), Space O(n)
