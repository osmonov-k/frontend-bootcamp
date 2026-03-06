/**
Learning Objectives
- [ ] Create and access objects
- [ ] Understand object properties and methods
- [ ] Use dot notation vs bracket notation
- [ ] Iterate over object properties
- [ ] Understand object reference vs primitive values
- [ ] Use Chrome DevTools for debugging
- [ ] Debug common JavaScript errors
- [ ] **Answer 4 new interview questions**
 */

//Part 1: Intro to objects

//What are objects ?
const personName = 'Alice';
const personAge = 25;
const personCity = 'New York';

const person = {
  name: 'Alice',
  age: 25,
  city: 'New York',
};

console.log(person);

//Creating objects

//Object literal (most common)
const student = {
  name: 'Bob',
  age: 20,
  grade: 'A',
  isEnrolled: true,
};

//Emtpy object
const empty = {};

//Nested objects
const user = {
  name: 'Charlie',
  address: {
    street: '123 Main str',
    city: 'Boston',
    zip: '02021',
  },
};

//Accessing properties
const personA = {
  name: 'Brian',
  age: 25,
  city: 'San Francisco',
  country: 'USA',
};

//Dot notation (most common)
console.log(personA.name); //Brain
console.log(personA.age); //25

//Bracket notation (dynamic access)
console.log(personA['name']); // Brian
console.log(personA['age']); //25

//When to use bracket notation
const prop = 'city';
console.log(personA[prop]); // San Francisco - dynamic

//Property names with spaces/special chars

const obj = {
  'first name': 'Bob',
  'favorite food': 'pizza',
};
console.log(obj['first name']); //Bob

/**
 Q: What's the difference between dot notation and bracket notation for accessing object properties?
 **Answer:**
```
Dot Notation:
- Syntax: object.property
- Property name must be valid identifier
- Cannot use variables
- Cannot have spaces or special characters
- Cleaner, more readable

Bracket Notation:
- Syntax: object["property"]
- Property name is a string
- Can use variables
- Can have spaces or special characters
- More flexible

Examples:

const person = {
  name: "Alice",
  age: 25,
  "favorite food": "pizza"
  
};

// Dot notation
console.log(person.name);  // Alice
console.log(person.age);   // 25
// person.favorite food  // ❌ Syntax error

// Bracket notation
console.log(person["name"]);  // Alice
console.log(person["favorite food"]);  // pizza (handles spaces)

// Dynamic access (only bracket notation)
const property = "age";
console.log(person[property]);  // 25
// person.property  // ❌ Looks for literal "property" key

Use dot notation by default, bracket notation when needed!
```
 */

// Part 2: Modifying objects

//Adding and updating properties
const personB = {
  name: 'John',
  age: 29,
};

//Add new property
personB.city = 'New York';
personB['country'] = 'USA';
console.log(personB);

//Updating existing property
personB.age = 23;
console.log(personB.age);

//Deleting Properties
delete personB.name;
console.log(personB);

//Checking if property exists
console.log('name' in personB);
console.log('city' in personB);
console.log(personB.name);
console.log(personB.city !== undefined);

//Part 3: Object methods

//Functions as properties
const personC = {
  name: 'Daniel',
  age: 18,
  greet: function () {
    console.log('Hello Daniel');
  },
};

personC.greet(); //Hello

const personS = {
  name: 'Samuel',
  age: 99,
  //Old Way
  greet: function () {
    console.log(`Hello, I'm ${this.name}`);
  },
  //New way
  sayAge() {
    console.log(`I'm ${this.age} years old`);
  },
};

personS.greet();
personS.sayAge();

const calculator = {
  value: 0,

  add(num) {
    this.value += num;
    return this;
  },
  subtract(num) {
    this.value -= num;
    return this;
  },
  getValue() {
    return this.value;
  },
};
const resultValue = calculator.add(10).subtract(5).getValue();

console.log(resultValue);

/**
 Q: What is the `this` keyword in JavaScript? How does it work in objects?
 **Answer:**
```
'this' refers to the object that is executing the current function.

In object methods:
- 'this' refers to the object the method belongs to
- Allows methods to access other properties/methods of same object

Important notes:
- 'this' is determined by HOW function is called, not WHERE it's defined
- In regular functions: 'this' depends on call context
- In arrow functions: 'this' is lexically bound (inherits from parent scope)
- In object methods: 'this' = the object

 */

//Part 4: looping through functions

//for ... in loop

const personQ = {
  name: 'Smith',
  age: 50,
  city: 'Foster City',
};

//loop through keys
for (const key in personQ) {
  console.log(`key is ${key} and value is ${personQ[key]} `); // name, age, city
}

//Object.keys(), Object.values(), Object.entries();

//Get array of keys
const arrayOfKeys = Object.keys(personQ);
console.log(arrayOfKeys);
// ['name', 'age', 'city'];

//Get array of values
const arrayOfValues = Object.values(personQ);
console.log(arrayOfValues);
// ['Smith', '50', 'Foster City'];

//Get array of [key, value] pairs
const entries = Object.entries(personQ);
console.log(entries);
//[['name', "Smith"], ['age', '50'], ['city', 'Foster City']]

/**
  Q: How do you loop through/iterate over an object's properties?

  **Answer:**
```
Three main approaches:

1. for...in loop:
   - Iterates over enumerable properties (including inherited)
   - Returns keys as strings

2. Object.keys():
   - Returns array of object's own property names
   - Can use array methods (forEach, map, filter)

3. Object.entries():
   - Returns array of [key, value] pairs
   - Useful for destructuring
 */

//Part 5: Reference vs Primitive Value
//Part 6: Debugging with Chrome Devtools

/**
 Friday (22-25):
22. **Dot notation vs bracket notation**
    - Dot: clean, limited; Bracket: flexible, dynamic

23. **What is 'this' keyword?**
    - Refers to object executing current function

24. **How to loop through object properties?**
    - for...in, Object.keys(), Object.values(), Object.entries()

25. **Primitive values vs object references**
    - Primitives: copy by value
    - Objects: copy by reference
 */

//Part 5: Reference vs Primitive Values

//Primitives - copy by value
let a = 5;
let b = a; // value 5 get assigned to variable b;
b = 10;

console.log(a); // 5
console.log(b); // 10

//Objects - copy by reference
//reference number: variable person1  (its reference value - 488ak2rkdk )  -> point  {name: 'Alex', age: 24};
// variable person2 (its reference value becomes - 488ak2rkdk)
const person1 = { name: 'Alex', age: 24 };
const person2 = person1;

person2.age = 30; //{name: 'Alex', age: 30};

console.log(person1.age); //30
console.log(person2.age); //30
//Both point to same object in memory
// anything except primitives are copied by reference
// primitives (copied by value) - string, boolean, number, null, undefined, bigInt, symbol,
// objects - array, set, map, object

// creating true copies:
const original = { name: 'John', age: 22 };

// Shallow copy (spread operator) - works when there is only one layer object
const copy1 = { ...original };

copy1.age = 30;
console.log(original.age); //22

// Shallow copy (Object.assign)
const copy2 = Object.assign({}, original);

// Deep copy (for nested objects)

//Trying to shallow copy nested object first
const nested = {
  name: 'Bob',
  address: {
    city: 'Foster City',
  },
};

const trySHallowCopy = { ...nested };

trySHallowCopy.address.city = 'San Jose';
console.log(nested.address.city); // San Jose

trySHallowCopy.name = 'Martin';
console.log(nested.name); // 'Bob'

// true deep copy
const nested2 = {
  name: 'Bob',
  address: {
    city: 'Foster City',
  },
};

const deepCopy = JSON.parse(JSON.stringify(nested2));
deepCopy.address.city = 'Burlingame';
console.log(nested2.address.city); //Foster City - not affected

const deepCopyNewerWay = structuredClone(nested2);
deepCopyNewerWay.address.city = 'Los Angeles';
console.log(nested2.address.city);

/**
 * Explain the difference between primitive values and object references. 
 * What happens when you assign an object to another variable? 
 
 Primitive values (string, number, boolean, null, undefined, symbol, bigint):
- Stored directly in variable
- Copy by VALUE
- Changing copy doesn't affect original

Object references (objects, arrays, functions):
- Variable stores reference (memory address), not the actual object
- Copy by REFERENCE
- Both variables point to same object in memory
- Changing one affects the other

Examples:

// Primitives - copy by value
let x = 5;
let y = x;  // Copy value
y = 10;
console.log(x);  // 5 (unchanged)

// Objects - copy by reference
const obj1 = { name: "Alice" };
const obj2 = obj1;  // Copy reference!
obj2.name = "Bob";
console.log(obj1.name);  // Bob (changed!)

// Both obj1 and obj2 point to SAME object in memory

Creating true copies:
// Shallow copy (one level deep)
const copy = { ...obj1 };
const copy2 = Object.assign({}, obj1);

// Deep copy (all levels)
const deepCopy = JSON.parse(JSON.stringify(obj1));

Important for functions:
function changeName(person) {
  person.name = "Bob";  // Modifies original!
}

const user = { name: "Alice" };
changeName(user);
console.log(user.name);  // Bob
 */

//Part 6: Debugging with Chrome Devtools

//console methods

// Basic logging
console.log('Hello');

//Log multiple value
const personSName = 'David';
const personSAge = 21;
console.log('Name: ', personSName, 'age: ', personSAge);

//Formated
console.log(`User: ${personSName}, age: ${personSName}`);

//Warning
// console.warn('This is a warning');

//Error
// console.error('This is an error');

//Table (arrays, objects)
console.table([
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
]);

//Group related logs
console.group('User details');
console.log('Name: Alice');
console.log('Age: 25');
console.groupEnd();

//Common Errors:

//1. ReferenceError: Variable not defined
// console.log(notDeclaredVariable); //Reference error;

//2. TypeError: Cannot read property of undefined
const personM = null;
// console.log(personM.name); //TypeError

//3. SyntaxError: Invalid syntax
// const invalidObj = {name: "Alice"  //Missing closing brace

//4. TypeError: Not a function
const num = 5;
// num(); //TypeError: num is not a function

//Using breakpoints
function calculateTotal(prices) {
  debugger; //Execution pauses here when Devtools open

  let total = 0;

  for (const price of prices) {
    debugger;
    total += price;
  }

  return total;
}

const result = calculateTotal([10, 20, 30]);
console.log(result);

/**
1. Read error messages carefully
   - They tell you WHAT went wrong and WHERE

2. console.log strategically
   - Before and after suspected problem area
   - Log variable values, not just messages

3. Use debugger statement
   - Pauses execution
   - Inspect variables in DevTools

4. Check for typos
   - Variable names are case-sensitive
   - Missing brackets, quotes, semicolons 

5. Verify assumptions
   - Is the data what you think it is?;
   - console.log(typeof variable);
 */

/**
    ### Friday (22-25):
22. **Dot notation vs bracket notation**
    - Dot: clean, limited; Bracket: flexible, dynamic

23. **What is 'this' keyword?**
    - Refers to object executing current function

24. **How to loop through object properties?**
    - for...in, Object.keys(), Object.values(), Object.entries()

25. **Primitive values vs object references**
    - Primitives: copy by value
    - Objects: copy by reference
*/
