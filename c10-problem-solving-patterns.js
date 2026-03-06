//Part 1: Why patterns matter?

/**
Problem solving in interviews:
1. Don't panic
2. Recognize the pattern
3. Apply the template
4. Code effectively

Today you will learn 3 patterns that solve 70% of arra/string problems
 */

//Part 2: Frequency Counter Pattern

/**
When to use: 
- Comparing two collections (ararys, map, and etc)
- Counting occurences
- Anagrams, duplicates, frequency
 */

//Problem: Are these anagrams?

const isAnagram = (str1, str2) => {
  if (str1.length !== str2.length) return false; //base case

  const freq1 = {}; // {n: 2, l: 1, i: 1, s: 1, t:1, e:1, }
  const freq2 = {}; //  {n: 2, s: 1, i: 1, l: 1, e:1, t:1, }

  //'nlisten'
  for (let char of str1) {
    //  freq1['n'] = (freq1['n'] || 0) + 1
    freq1[char] = (freq1[char] || 0) + 1;
  }
  //nsilent
  for (let char of str2) {
    //  freq1['n'] = (freq1['n'] || 0) + 1
    freq2[char] = (freq2[char] || 0) + 1;
  }

  for (let key in freq1) {
    if (freq1[key] !== freq2[key]) {
      return false;
    }
  }

  return true;
};

// str1 -> {n: 2, l: 1, t: 1...}, str2 -> {n: 2, l: 1, t: 1...}
// str1[key] (value) -> is that value equal to -> str2[key], if they are not -> return false
// return true
console.log(isAnagram('nlisten', 'nsilent')); //true
console.log(isAnagram('hello', 'world')); //false

// Count character frequency
function charFrequency(str) {
  const freq = {}; //
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

console.log(charFrequency('hello'));
// { h: 1, e: 1, l: 2, o: 1 }

// Find most common character
function mostCommon(str) {
  //  { h: 1, e: 1, l: 2, o: 1 }
  const freq = charFrequency(str);
  let maxChar = ''; //l
  let maxCount = 0; //2

  for (let char in freq) {
    if (freq[char] > maxCount) {
      maxCount = freq[char];
      maxChar = char;
    }
  }

  return { maxChar, maxCount };
}

console.log(mostCommon('helloooo'));

/**
Q: What is the frequency counter pattern? When do you use it?
**Answer:**
```
Frequency counter uses an object/map to count occurrences.
This avoids nested loops.

When to use:
- Anagram problems
- Comparing two collections
- Finding duplicates
- Character/element frequency

Example - Anagram:
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;

  const freq = {};

  for (let char of s1) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (let char of s2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}

Time: O(n) instead of O(n²) we have O(n)
Space: O(n) for frequency object

Pattern template:
1. Create frequency counter object
2. Loop through first input, count occurrences
3. Loop through second input, compare/decrement
4. Return result
```
 */

//Part 3: Two Pointer Pattern

/**
 When to use:
 - Sorted arrays
 - Finding pairs
 - Reversing
 - Removing duplicates
 */

// Find pair that sums to target in SORTED aray

// O(n)
const hasPairSum = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === target) {
      return true;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return false;
};
const sortedArr = [1, 3, 5, 7, 9, 11]; //
console.log(hasPairSum(sortedArr, 10)); // true (3 + 7)
console.log(hasPairSum(sortedArr, 15)); // false

//Reverse string in-place
function reverseStringArray(s) {
  // ['J', 'o', 'k', 's', 'h']
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }

  return s;
}
console.log(reverseStringArray(['J', 'o', 'k', 's', 'h']));

// Is palindrome?
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false

/**
 What is the two-pointer pattern? When is it useful ?

 **Answer:**
```
Two pointers use two indices moving through array simultaneously.

When to use:
- Sorted arrays
- Finding pairs
- Palindromes
- Reversing
- Removing elements

Common patterns:
1. Opposite ends (left=0, right=length-1)
2. Same direction (slow/fast pointers)

Example - Pair sum:
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;
    else right--;
  }
  return null;
}

Time: O(n) - single pass
Space: O(1) - only two pointers

Requirements:
- Usually needs sorted array
- Or can work with any array for specific problems

Key advantage: Reduces O(n²) to O(n)
```
 */

//Part 4: Sliding Window Pattern (Intro)
/**
 - Substrings/subarrays 
 - Maximum/minimum sum
 - Longest/shortest sequence
 */

// Problem: Maximum sum of k consecutive elements

// Naive O(n * k)
function maxSumNaive(arr, k) {
  let maxSum = -Infinity; //9

  for (let i = 0; i <= arr.length - k; i++) {
    let sum = 0; //9
    for (let j = i; j < i + k; j++) {
      sum += arr[j];
    }
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
}
const nums = [2, 1, 5, 1, 3, 2, 7, 9, 12, 4]; //k=6
//.          [0, 1, 2, 3, 4, 5, 6, 7, 8,  9];
console.log(maxSumNaive(nums, 3));

//Sliding window O(n)
function maxSum(arr, k) {
  if (arr.length < k) return null;

  // Calculate first window
  let windowSum = 0; //14
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum; //37

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i]; //37
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
console.log(maxSum(nums, 6));

/**
HTML
INTERVIEW QUESTION #1
 **Q: What is semantic HTML and why is it important?**

**Answer:**
```
Semantic HTML uses meaningful tags that describe their content,
not just how they look.

Examples:
- <header>, <nav>, <main>, <article>, <section>, <footer>
- Instead of <div class="header">, use <header>

Why it matters:
1. Accessibility - Screen readers can navigate better
2. SEO - Search engines understand content structure
3. Maintainability - Code is easier to read and update
4. Standards - Industry best practice

Non-semantic: <div>, <span> (no meaning)
Semantic: <article>, <nav>, <footer> (describe purpose)
```

INTERVIEW QUESTION #2
**Q: What's the difference between `<section>`, `<article>`, and `<div>`?**

**Answer:**
```
<article>:
- Self-contained, independent content
- Could be syndicated or reused elsewhere
- Example: Blog post, product card, comment

<section>:
- Thematic grouping of content
- Part of a larger whole
- Example: Chapter in an article, tab content

<div>:
- No semantic meaning
- Pure container for styling or layout
- Use only when no semantic element fits

Rule of thumb:
1. Can it stand alone? → <article>
2. Is it a thematic group? → <section>
3. Just for styling? → <div>
```

INTERVIEW QUESTION #3
**Q: Why do we need the `<label>` element? Can't we just use text next to the input?**

**Answer:**
```
The <label> element is critical for accessibility and UX:

1. Accessibility:
   - Screen readers announce the label when input is focused
   - Users know what the input is for

2. Click area:
   - Clicking the label focuses the input
   - Especially important for checkboxes/radio buttons
   - Increases usability on mobile

3. Form validation:
   - Browsers can show which field has an error
   - Associates error messages with the correct input

Proper usage:
<label for="email">Email:</label>
<input type="email" id="email" name="email">

The 'for' attribute must match the input's 'id'

Alternative (wrapping):
<label>
  Email:
  <input type="email" name="email">
</label>
```
 
INTERVIEW QUESTION #4
**Q: What's the difference between the `name` and `id` attributes on an input?**

**Answer:**
```
They serve different purposes:

id:
- Unique identifier for the element
- Used by <label for="id"> to associate label with input
- Used by CSS (#id) and JavaScript (getElementById)
- Must be unique across the entire page

name:
- Identifies the input when the form is submitted
- Used by the server to access the value
- Multiple inputs can share the same name (radio buttons)
- Required for form submission

Example:
<label for="user-email">Email:</label>
<input type="email" id="user-email" name="email">

When submitted:
- Server receives: { email: "user@example.com" }
- Label clicks focus the input (via matching 'for' and 'id')
```

### 🎤 INTERVIEW QUESTION #5

**Q: What is ARIA and when should you use it?**

**Answer:**
```
ARIA (Accessible Rich Internet Applications) adds accessibility
information to HTML elements.

When to use ARIA:
1. When HTML semantics aren't enough
2. For dynamic content (single-page apps)
3. Custom widgets (modals, tabs, tooltips)

Key ARIA attributes:
- role: Defines element type (button, dialog, alert)
- aria-label: Provides accessible name
- aria-labelledby: References another element for label
- aria-describedby: Additional description
- aria-hidden: Hides from screen readers
- aria-expanded: Toggle state (true/false)
- aria-live: Announces dynamic content changes

IMPORTANT: First rule of ARIA:
"Don't use ARIA when native HTML works"

✅ Good: <button>Click</button>
❌ Bad: <div role="button">Click</div>

Use native HTML first, ARIA when necessary.
```

### 🎤 INTERVIEW QUESTION #6

**Q: How do you make a website accessible?**

**Answer:**
```
Key accessibility practices:

1. Semantic HTML:
   - Use proper elements (<button>, <nav>, <main>)
   - Not <div> for everything

2. Keyboard navigation:
   - All interactive elements reachable by Tab
   - Focus indicators visible
   - Logical tab order

3. Images:
   - Alt text for meaningful images
   - Empty alt for decorative images

4. Forms:
   - Label all inputs
   - Error messages clearly associated
   - Required fields marked

5. Color:
   - Don't rely on color alone
   - Sufficient contrast (4.5:1 for text)

6. ARIA (when needed):
   - aria-label for icon buttons
   - aria-live for dynamic content
   - role for custom widgets

7. Testing:
   - Test with keyboard only
   - Use screen reader
   - Run automated tools (axe, WAVE)
```

---

### 🎤 INTERVIEW QUESTION #7

**Q: What does the `<meta name="viewport">` tag do?**

**Answer:**
```
The viewport meta tag controls how the page displays on mobile devices:

<meta name="viewport" content="width=device-width, initial-scale=1.0">

Breakdown:
- width=device-width: Makes width match screen width
- initial-scale=1.0: Sets initial zoom level to 100%

Without this tag:
- Mobile browsers render page at desktop width (usually 980px)
- User has to pinch-zoom to read content
- Page looks tiny and unusable

With this tag:
- Page renders at device's actual width
- Text is readable without zooming
- Foundation for responsive design

This is REQUIRED for responsive websites. Without it, your
media queries won't work properly on mobile devices.
```

CSS

### 🎤 INTERVIEW QUESTION #8

**Q: What is CSS specificity and how is it calculated?**

**Answer:**
```
Specificity determines which CSS rule applies when multiple rules
target the same element.

Calculation (from highest to lowest):
1. Inline styles: 1000 points
2. IDs: 100 points
3. Classes, attributes, pseudo-classes: 10 points
4. Elements, pseudo-elements: 1 point

Examples:
- p { } → Specificity: 1
- .text { } → Specificity: 10
- #header { } → Specificity: 100
- div.text { } → Specificity: 11 (1 + 10)
- #header p.intro { } → Specificity: 111 (100 + 1 + 10)


Important notes:
- !important overrides all specificity (avoid using)
- When specificity is equal, last rule wins
- Inline styles beat everything except !important

Best practice: Keep specificity low, use classes over IDs.
```


### 🎤 INTERVIEW QUESTION #9

**Q: Explain the CSS box model.**

**Answer:**
```
The box model defines how elements are sized and spaced:

From inside out:
1. Content: The actual content (text, images)
2. Padding: Space between content and border (transparent)
3. Border: Line around the padding
4. Margin: Space outside the border (transparent)

Two box-sizing modes:

content-box (default):
- width/height only applies to content
- Padding and border are added
- Total width = width + padding + border

border-box (recommended):
- width/height includes content + padding + border
- Easier to calculate sizes
- Total width = width

Best practice:
*, *::before, *::after {
  box-sizing: border-box;
}

Margin vs Padding:
- Padding: Inside border, has background color
- Margin: Outside border, transparent, can collapse
```

---

### 🎤 INTERVIEW QUESTION #10

**Q: What is margin collapsing?**

**Answer:**
```
Margin collapsing: When vertical margins of adjacent elements
combine into a single margin.

Example:
<div style="margin-bottom: 30px;">Box 1</div>
<div style="margin-top: 20px;">Box 2</div>

Result: 30px gap (not 50px) - larger margin wins

Rules:
1. Only vertical margins collapse (not horizontal)
2. Only adjacent elements in normal flow
3. Larger margin value is used

When margins DON'T collapse:
- Floated elements
- Absolutely positioned elements
- Inline-block elements
- Flex or grid items
- Elements with padding/border between them

Fix if needed:
- Add padding or border between elements
- Use flexbox/grid (doesn't collapse)
- Add overflow: hidden to parent
```
 */
