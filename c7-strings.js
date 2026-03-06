// Part 1: String are immutable/unchangable/unalterable/unmodifyable

//Strings CANNOT be changed after creation
let herName = 'Alice'; //mutate, change, alter,
herName[0] = 'B';
console.log(herName);

//Arrays CAN change
let letters = ['A', 'l', 'i', 'c', 'e'];
letters[0] = 'B';
console.log(letters);

let herModifiedName = 'Alice';
herModifiedName = 'B' + herModifiedName.slice(1);

//Part 2: Accessing string characters

//Method 1: Bracket notation
const text = 'JavaScript';
console.log(text[0]); // 'J'
console.log(text[4]); // 'S'
console.log(text[text.length - 1]); //t - last character

//Method 2: charAt();
console.log(text.charAt(0)); // 'J'
console.log(text.charAt(100)); // "" (emtpy string, no error)

//length property
console.log(text.length);

//loop through string
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}

//Modern way - for ... of
for (let char of text) {
  console.log(char);
}

//Part 3: Essential String Methods

const text2 = 'JavaScript';

console.log(text2.toUpperCase()); // "JAVASCRIPT"
console.log(text2.toLowerCase()); // 'javascript'
console.log(text2); // "JavaScript" (original unchanged!)

// case-insensitive comparison
const input = 'JavaScript';
const search = 'javascript';
if (input.toLowerCase() === search.toLowerCase()) {
  console.log('Match');
}

//capitalize first letter
const capitilize = (str) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

console.log(capitilize('javascript'));
console.log(capitilize('HELLo'));

// Trimming whitespace
const messy = '    hello world     ';

console.log(messy.trim()); // 'hello world'
console.log(messy.trimStart()); // 'hello world     '
console.log(messy.trimEnd()); // '    hello world'

const userInput = 'alice@gmail.com';
const cleaned = userInput.trim();
console.log(cleaned);

//Extracting substrings
// slice(start, end) - most flexible
// start - inclusive, end - optional and not inclusive (exclusive)
const text3 = 'JavaScript is awesome';
console.log(text3.slice(0, 10)); // "JavaScript"
console.log(text3.slice(4)); // "Script is awesome" (from index 4 to end)
console.log(text3.slice(-7)); // "awesome" (last 7 characters)
console.log(text.slice(4, 10)); // "Script"

//substring(start, end) - similar to slice
console.log(text3.substring(0, 10)); // "JavaScript"
console.log(text3.substring(4, 10)); // "Script"
// Note: substring doesn't support negative indices

//substr(start, length) - DEPRECATED, don't use

/**
 Q: What's the difference between .slice(), .substring(), and .substr();

 All three extract part of a string, but:
.slice(start, end):
- Most flexible
- Supports negative indices (count from end)
- end is NOT included
- RECOMMENDED to use

.substring(start, end):
- Similar to slice
- Does NOT support negative indices
- Swaps arguments if start > end
- end is NOT included

.substr(start, length):
- DEPRECATED - don't use!
- Second parameter is LENGTH, not end position

Example:
const str = "JavaScript";

str.slice(0, 4);      // "Java"
str.slice(-6);        // "Script" (last 6 chars)

str.substring(0, 4);  // "Java"
str.substring(-6);    // "JavaScript" (treats negative as 0)

Best practice: Always use .slice()
 */

// Searching in Strings
// Replacing Text

// Searching in strings

const text4 = 'The quick brown the fox jumps over the lazy dog';

// included() - check if substring exists
console.log(text4.includes('quick')); //true
console.log(text4.includes('slow')); // false
console.log(text4.includes('QUICK')); //false (case-sensitive)

// indexOf() - get position of substring
console.log(text4.indexOf('quick')); //4
console.log(text4.indexOf('fox')); //16
console.log(text4.indexOf('cat')); //-1 (not found)

// lastIndexOf() - find last occurence
console.log(text4.indexOf('the'));
console.log(text4.lastIndexOf('the'));

//const text4 = 'The quick brown the fox jumps over the lazy dog';
// startsWith() and endsWith()
console.log(text4.startsWith('The')); //true
console.log(text4.startsWith('the')); //false
console.log(text4.endsWith('dog')); //true
console.log(text4.endsWith('cat')); //false

//Check if starts with "The" (case-insensitive), (THE, tHe, thE - all going to work)
console.log(text4.toLowerCase().startsWith('the'));

/**
What does .indexOf() return if the substring is not found? 
**Answer:**
```
.indexOf() returns -1 if the substring is not found.

Example:
const text = "JavaScript";

text.indexOf("Java");  // 0 (found at position 0)
text.indexOf("Script"); // 4 (found at position 4)
text.indexOf("Python"); // -1 (not found)

Use case - checking if string contains substring:
// Old way
if (text.indexOf("Java") !== -1) {
  console.log("Found!");
}

// Modern way (better)
if (text.includes("Java")) {
  console.log("Found!");
}

Note: indexOf is still useful when you need the POSITION,
includes is better when you just want to know if it exists.
 */

// Replace text
const text5 = 'I love JavaScript. JavaScript is awesome!';

// replace() - replaces FIRST occurrence
console.log(text5.replace('JavaScript', 'Python')); // I love Python. JavaScript is awesome!

// replaceAll() - replace ALL occurences
console.log(text5.replaceAll('JavaScript', 'Python'));
console.log(text5);

// case-insensitive replace (regex) regular expression
const message = 'Hello HELLO HeLLo';
console.log(message.replaceAll(/hello/gi, 'Hi'));

// splitting and joining

const sentence = 'The quick brown fox';
const words = sentence.split(' ');
console.log(words); // ['the', 'quick', 'brown', 'fox'];

const letters1 = sentence.split('');
console.log(letters1);

// limit split
const limited = 'a-b-c-d-e-f'.split('-', 3);
console.log(limited); //['a', 'b', 'c'];

// join() - array to string (opposite of split)
const words2 = ['Hello', 'Wolrd'];
console.log(words2.join(' ')); //Hello World
console.log(words2.join('-')); //Hello-World
console.log(words2.join('')); //HelloWorld

const str = 'JavaScript';
const reversedStr = str.split('').reverse().join('');
console.log(reversedStr);

/**
Q: How do you reverse a string in JavaScript ?
**Answer:**
```
Strings are immutable, so you need to convert to array first.

Method 1: split + reverse + join
const str = "hello";
const reversed = str.split("").reverse().join("");
console.log(reversed); // "olleh"

How it works:
1. split("") → ["h", "e", "l", "l", "o"]
2. reverse() → ["o", "l", "l", "e", "h"]
3. join("") → "olleh"

Method 2: Loop (more verbose)
function reverse(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

Method 3: Array.from + reverse + join
const reversed = Array.from(str).reverse().join("");

Best practice: Use split().reverse().join() for simplicity
```
 */

//Repeat and pad

// repeat() - repeat string n times
console.log('Ha'.repeat(3));
console.log('*'.repeat(10));

// use case: create dividers
console.log('='.repeat(50));

//padStart() and padEnd() - pad to certain length
const num = '5';
console.log(num.padStart(3, '0')); // '005'
console.log(num.padEnd(3, '0')); // '500'

//use case: format numbers
const invoice = '42';
console.log(`Invoice #${invoice.padStart(6, '0')}`); // 'Invoice #000042'

const items = ['apple', 'banana', 'pear'];
items.forEach((item) => {
  console.log(item.padEnd(10, '.') + '$1.99');
});

/**
Q: How would you check if a string is palindrome?
 */

// Challenge 1: Count words,
//  /\s+/ explanation // are beginning and end of regex
// \s - any white space (space, tab, new line)
// + is one or more of this
const text6 = `    I   love    JavaScript. JavaScript is awesome!    `;

//replace() replaceAll();
const countWords = (str) => {
  return str.trim().split(/\s+/).length;
};
console.log(countWords(text6));

// Challenge 2: Title case (string has only one white space between words)
// "thE quicK brown fox" -> "The Quick Brown Fox"
const sampleString = 'the quick brown fox';

const makeTitleCase = (str) => {
  return str // 'tHe sTring is now lower case'
    .toLowerCase() // 'the string is now lower case'
    .split(' ') //['the', 'quick', 'brown', 'fox']
    .map((word) => word[0].toUpperCase() + word.slice(1)) //['The', 'Quick', 'Brown', 'Fox']
    .join(' ');
};
console.log(makeTitleCase(sampleString));

//Challenge 3: Truncate text
//your function takes two arguments (text (string), and maxLength) and returns it in a new format
// "This is a super long text"
// "This is"
// "This is a..."
const ourText = 'This is a super long text';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

console.log(truncateText(ourText, 7)); // 'This is...'

/**
7. **Difference between slice/substring/substr?** - Use slice (most flexible)
8. **What does indexOf return if not found?** - Returns -1
9. **How to reverse a string?** - split("").reverse().join("")
10. **How to check palindrome?** - Reverse and compare, or two pointers
11. **Difference between == and === for strings?** - === is strict (preferred)

**Total: 22 interview questions (11 from Week 1, 11 from Week 2 so far)**
 */
