// Array Destructuring

//old way
const colors = ['red', 'green', 'blue'];

const first = colors[0];
const second = colors[1];
const third = colors[2];

console.log(first, second, third);

// ES6 new way
const colors1 = ['red', 'green', 'blue'];

const [firstColor, secondColor, thirdColor] = colors;
console.log(firstColor, secondColor, thirdColor);

//Skip elements
const numbers = [1, 2, 3, 4, 5, 6, 7];
const [firstNum, , thirdNum] = numbers;
console.log(firstNum, thirdNum);

//Rest operator
const [head, ...tail] = numbers;
console.log(head); //1
console.log(tail); //[2, 3, 4, 5, 6, 7]

// Default values
const [a, b, c = 10] = [1, 2];
console.log(a, b, c);

//Swapping values
let x = 1;
let y = 2;
let z = 3;
let q = 4;
[x, y, z] = [y, x, q];
console.log(x, y, z);

// function return values
function getCoordinates() {
  return [40.1235, -74.3848];
}
// const result = getCoordinates();
// const lat = result[0];
// const lng = result[1];
const [lat, lng] = getCoordinates(); // const [lat, lng] = [40.1235, -74.3848];
console.log(lat, lng);

// Part 2: Object Destructuring

//The old way
const user = {
  userName: 'Alex',
  age: 25,
  city: 'San Jose',
};

const username = user.name;
const userage = user.age;
const usercity = user.city;

//The ES6 way (new)
const { userName, age, city } = user;
console.log(userName, age, city);

//Advanced patterns

// Rename variables
const { userName: personName, age: personAge } = user;
console.log(personName, personAge);

const user1 = {
  studentName: 'Alex',
  studentAge: 25,
  city: 'San Jose',
};

// Default values
const { studentName, studentAge, country = 'USA' } = user1;
console.log(studentName, studentAge);

//Nested destructuring
const person = {
  persName: 'Messi',
  address: {
    persCity: 'Miami',
    zip: '95134',
  },
};

const {
  persName,
  address: { persCity, zip },
} = person;
console.log(persCity, zip); //Miami

// function parameters
// first method
function greet2(person) {
  const { name, age } = person;
  console.log(`Hello ${name}, you are ${age}`);
}

// second method
function greet({ name, age }) {
  console.log(`Hello ${name}, you are ${age}`);
}

greet({ name: 'Alice', age: 25 });

const randomPerson = { name: 'John', age: 30 };
greet(randomPerson);

const professor = {
  professorName: 'Snape',
  professorAge: 25,
  professorCity: 'Hogwarts',
};

//Rest in object
const { professorCity, ...restProfessor } = professor;
console.log(professorCity);
console.log(restProfessor);

/**
 Q: What is destructuring ? Give examples for arrays and objects.
**Answer:**
```
Destructuring extracts values from arrays/objects into variables.

Array destructuring:
const [a, b, c] = [1, 2, 3];
// a=1, b=2, c=3

const [first, ...rest] = [1, 2, 3, 4];
// first=1, rest=[2,3,4]

Object destructuring:
const { name, age } = { name: "Alice", age: 25 };
// name="Alice", age=25

const { name: userName } = { name: "Bob" };
// userName="Bob" (renamed)

Benefits:
- Cleaner code
- Less repetition
- Easy to extract multiple values
- Common in React (props destructuring)

Use cases:
- Function parameters
- Extracting API response data
- React component props
- Swapping variables
```
 */

// Part 3: Spread Operator - works only with not nested iterables (arrays, objects)

//Arrays
// Copy array
const originalArr = [1, 2, 3];
const copyArr = [...originalArr];

copyArr.push(4);
console.log(originalArr);
console.log(copyArr);

// Merge array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArrays = [...arr1, ...arr2];
console.log(mergedArrays);

// Convert string to array
const str = 'hello';
const chars = [...str];
console.log(chars);

// Function arguments
const nums = [1, 2, 3, 4];
console.log(Math.max(...nums)); //1,2,3,4

// Objects
const player = { playerName: 'Messi', age: 39 };
const playerCopy = { ...player };

playerCopy.age = 26;
console.log(player.age);
console.log(playerCopy.age);

// Merge objects
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { lang: 'ru', fontSize: 16 };
const settings = { ...defaults, ...userPrefs }; // { theme: "light", lang: "ru", fontSize: 16 }
console.log(settings); //Note: userPrefs.lang overwrites defaults.lang

// Add/override properties
const originalObj = { a: 1, b: 2 };
const updatedObj = { ...originalObj, b: 3, c: 4 };
console.log(updatedObj);

/**
Q: What's the spread operator? How is it different from rest?
**Answer:**
```
Spread (...) expands an iterable into individual elements.
Rest (...) collects multiple elements into an array.

Spread (expanding):
const arr = [1, 2, 3];
console.log(...arr);  // 1 2 3

const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];  // [1, 2, 3, 4]

const obj = { a: 1 };
const copy = { ...obj };  // { a: 1 }

Rest (collecting):
const [first, ...rest] = [1, 2, 3, 4];
// first = 1
// rest = [2, 3, 4]

function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
sum(1, 2, 3,4,5,6,7,7,8);  // numbers = [1, 2, 3,4,5,6,7,7,8]

Key difference:
- Spread: array → individual elements
- Rest: individual elements → array

They look the same (...) but are opposite operations!
```
 */

// Part 4: Rest Parameters

//Old way - arguments object
function oldSum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(oldSum(1, 2, 3, 4, 5));

//New way - rest parameter
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4));

// Rest must be last parameter
const greet3 = (greeting, title, ...names) => {
  //greeting = Hello
  //names = ['Smith', 'Jake', 'Luke'];
  // names.map( name => `${greeting} ${name}`);
  // names = ['Hello Smith', 'Hello Jake', 'Hello Luke']
  // return names;

  return names.map((name) => `${greeting} ${title} ${name}`);
};
console.log(greet3('Hello', 'Mr', 'Smith', 'Jake', 'Luke'));

// Part 5: Default Parameters
//Old way
const greet4 = (name) => {
  name = name || 'Guest';
  console.log(`Hello ${name}`);
};

//New way
const greetNew = (name = 'Guest') => {
  console.log(`Hello ${name}`);
};
greetNew('Alice');
greetNew();

//multiple defaults
const createUser = (name = 'Anonymous', age = 0, isActive = true) => {
  return { name, age, isActive };
};
console.log(createUser());
console.log(createUser('Bob', 30));

//Default can reference other parameters
const greet5 = (userName, greeting = `Hello ${userName}`) => {
  console.log(greeting);
};

greet5('Alice'); // Hello Alice
greet5('Alice', 'Welcome Bob'); //Welcome Bob!

/**
 Q: What are default parameters? How do they work ?
 **Answer:**
```
Default parameters allow you to set default values for function parameters
if no value or undefined is passed.

Syntax:
function greet(name = "Guest") {
  console.log(`Hello ${name}`);
} 

greet("Alice");  // Hello Alice
greet();         // Hello Guest
greet(undefined);// Hello Guest
greet(null);     // Hello null (null is a value!)

Key points:
- Only undefined triggers default (not null)
- Defaults can be expressions
- Defaults can reference earlier parameters
- Evaluated at call time, not definition time

Example:
function createID(prefix = "user", num = Date.now()) {
  return `${prefix}_${num}`;
}

Benefits:
- No need for name = name || "default" pattern
- Cleaner, more readable code
- Self-documenting function signatures
```
 */

// Part 6: Enhanced Object Literals
const teacherName = 'Jake';
const teacherAge = 28;

//Old way
const teacher1 = {
  teacherName: teacherName,
  teacherAge: teacherAge,
};

//New way
const teacher2 = { teacherName, teacherAge }; //shorter
console.log(teacher2); //{teacherName: 'Jake', teacherAge: 28}

// Shorthand method names
const calculator = {
  //old
  add: function (a, b) {
    return a + b;
  },
  //New way
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
};
console.log(calculator.subtract(10, 5)); //5
console.log(calculator.add(10, 5)); //15

//3. Computed property names
const propName = 'score';
const value = 100;

const ourObject = {
  [propName]: value,
  [`${propName}Updated`]: 250,
};

console.log(ourObject); // {score: 100, scoreUpdated: 250};

// Dynamic keys
const createPerson = (key, value) => {
  return {
    [key]: value,
  };
};

console.log(createPerson('name', 'Alice')); //{name: "Alice"}
console.log(createPerson('age', '25')); // {age: 25}

/**
Q: What are enhanced object literals in ES6 ?
**Answer:**
```
Enhanced object literals provide shorthand syntax for creating objects:

1. Shorthand property names:
const name = "Alice";
const age = 25;
const user = { name, age };  // Instead of { name: name, age: age }

2. Shorthand method syntax:
const obj = {
  greet() {  // Instead of greet: function() {}
    return "Hello";
  }
};

3. Computed property names:
const key = "name";
const obj = {
  [key]: "Alice"  // Dynamic property name
};

4. Can set __proto__ directly:
const obj = {
  __proto__: someObject
};

Benefits:
- Less typing
- Cleaner, more readable code
- Common in modern JavaScript/React

Example combining all:
const propName = "age";
const name = "Bob";
const greet = () => "Hi";

const user = {
  name,  // shorthand property
  [propName]: 30,  // computed property
  greet() { return `Hello ${this.name}`; }  // shorthand method
};
```
 */

// Shallow vs Deep copy

//Shallow
const personObject = { personName: 'David', personAge: 25 };
const copyPersonObject = { ...personObject };
copyPersonObject.personAge = 50;
console.log(personObject); //25
console.log(copyPersonObject); //50

const nestedObj = {
  personName: 'Chris',
  address: { street: '123 El Camino', zip: 95122 },
};
const copyNested = { ...nestedObj };
copyNested.personName = 'Luke';

//if we are changing only first layer, then it's fine
console.log(nestedObj.personName); //Chris
console.log(copyNested.personName); //Luke

//if we are changing nested part, then it's not fine
copyNested.address.street = '3200 Zanker Rd';
console.log(nestedObj.address.street); //'3200 Zanker Rd'
console.log(copyNested.address.street); //'3200 Zanker Rd'

//In order to solve this problem we should do DEEP COPY
const nestedObj2 = {
  personName: 'Chris',
  address: { street: '123 El Camino', zip: 95122 },
};

// Method 1: structuredClone()
const copyNestedObj2 = structuredClone(nestedObj2); //we now have a deep clone
copyNestedObj2.address.street = '100 Antoinette';
console.log(copyNestedObj2.address.street); // '100 Antoinette'
console.log(nestedObj2.address.street); // '123 El Camino'

//Method 2: JSON.parse()
const copy2NestedObj2 = JSON.parse(JSON.stringify(nestedObj2));

// Refactor the code using all ES6 features learned
// Old code
function createUser21(options) {
  var name = options.name || 'Anonymous';
  var age = options.age || 0;
  var hobbies = options.hobbies || [];

  var user = {
    name: name,
    age: age,
    hobbies: hobbies,
    greet: function () {
      return 'Hello, I am ' + this.name;
    },
  };
  return user;
}

const user21 = createUser21({
  name: 'Alice',
  age: 25,
  hobbies: ['coding', 'reading'],
});
console.log(user21);

//Solution
function createUser22({ name = 'Anonymous', age = 0, hobbies = [] }) {
  return {
    name,
    age,
    hobbies,
    greet() {
      return `Hello, I am ${this.name}`;
    },
  };
}

const user22 = createUser22({
  name: 'Alice',
  age: 25,
  hobbies: ['coding', 'reading'],
});
console.log(user22);

function createUser1({ name = 'Anonymous', age = 0, hobbies = [] }) {
  return {
    name,
    age,
    hobbies,
    greet() {
      return `Hello from copy function: ${name} and my age is: ${age} `;
    },
  };
}
const myUser = createUser1({ name: 'abc', age: 55, hobbies: ['ab', 'c'] });

const greetUser123 = myUser.greet;
console.log(greetUser123());

// function createCounter() {
//   let count = 0;

//   return {
//     inc() {
//       count++;
//     },
//   };
// }

// const counter = createCounter();
// console.log(counter.count); // undefined ❌

function Counter() {
  this.count = 0;
}

Counter.prototype.inc = function () {
  this.count++;
};

const counter = new Counter();
const counter2 = new Counter();

counter.inc();
console.log(counter.count); // 1 ✅

counter2.inc();
console.log(counter2.count); // 2 ✅
