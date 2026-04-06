// ============================================================
// Class 21 - Callbacks, Timers & Async Basics
// ============================================================

// ============================================================
// PART 1: Synchronous vs Asynchronous
// ============================================================

// Synchronous code runs line by line and BLOCKS everything until it finishes.
// This loop freezes the browser for several seconds - the UI becomes unresponsive.

console.log('Start');

let result = '';
for (let i = 0; i < 1000000000; i++) {
  result += 'x';
}

console.log('End'); // Nothing can run until this loop finishes

// Asynchronous code hands off the work and keeps going.
// The callback runs later, after the current code finishes.

console.log('Start');

setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);

console.log('End');

// Output:
// Start
// End
// This runs after 2 seconds  ← runs later, nothing was blocked

// ============================================================
// PART 2: setTimeout - Run Once After a Delay
// ============================================================

// Basic usage - run a callback once after 1 second
setTimeout(() => {
  console.log('Hello after 1 second');
}, 1000);

// Passing arguments to the callback (after the delay value)
function greet(name, emoji) {
  console.log(`${emoji} Hello, ${name}!`);
}

setTimeout(greet, 2000, 'Alice', '👋');

// Storing the timer ID so you can cancel it
const timerId = setTimeout(() => {
  console.log('This will never run');
}, 5000);

clearTimeout(timerId); // Cancels the timer before it fires
console.log('Timer canceled!');

// ============================================================
// PART 3: setInterval - Run Repeatedly
// ============================================================

// Runs the callback every 1 second, stops after count reaches 5
let count = 0;

const intervalId = setInterval(() => {
  count++;
  console.log(`Count: ${count}`);

  if (count === 5) {
    clearInterval(intervalId);
    console.log('Done!');
  }
}, 1000);

// Clock that updates every second, then stops after 10 seconds
function updateClock() {
  const now = new Date();
  console.log(now.toLocaleTimeString());
}

const clockInterval = setInterval(updateClock, 1000);

setTimeout(() => {
  clearInterval(clockInterval);
  console.log('Clock stopped');
}, 10000);

// ============================================================
// PART 4: Common Timer Patterns
// ============================================================

// Pattern 1: Countdown timer
// Logs each number from `seconds` down to 0, then logs "Blast off!"
function countdown(seconds) {
  let remaining = seconds;
  console.log(remaining);

  const intervalId = setInterval(() => {
    remaining--;
    console.log(remaining);

    if (remaining === 0) {
      clearInterval(intervalId);
      console.log('Blast off! 🚀');
    }
  }, 1000);
}

countdown(5);

// Pattern 2: Stagger tasks using forEach + setTimeout
// Each task runs 1 second after the previous one
const tasks = ['Task 1', 'Task 2', 'Task 3'];

tasks.forEach((task, index) => {
  setTimeout(() => {
    console.log(`${task} completed`);
  }, index * 1000);
});

// ============================================================
// PART 5: Callbacks
// ============================================================

// A callback is a function passed as an argument to another function.
// You already use them: forEach, addEventListener, setTimeout all take callbacks.

// Simulating an async API call with setTimeout
function fetchUser(userId, callback) {
  console.log('Fetching user...');

  setTimeout(() => {
    const user = {
      id: userId,
      name: 'Alice',
      email: 'alice@example.com',
    };
    callback(user); // call the callback with the result when ready
  }, 1000);
}

fetchUser(123, (user) => {
  console.log('User received:', user.name);
});

console.log('This runs first!'); // async - doesn't wait for fetchUser

// ============================================================
// PART 6: Callback Hell → Better Pattern
// ============================================================

function getUser(userId, callback) {
  setTimeout(() => {
    callback({ id: userId, name: 'Alice' });
  }, 500);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ]);
  }, 500);
}

function getComments(postId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, text: 'Nice post!' },
      { id: 2, text: 'Great read!' },
    ]);
  }, 500);
}

// ❌ Callback hell - each result requires nesting deeper (Pyramid of Doom)
// Hard to read, debug, and maintain
getUser(1, (user) => {
  console.log('User:', user.name);

  getPosts(user.id, (posts) => {
    console.log('Posts:', posts.length);

    getComments(posts[0].id, (comments) => {
      console.log('Comments:', comments.length);
      // Imagine needing to go even deeper... 😱
    });
  });
});

// ✅ Better pattern - named functions flatten the pyramid
// Same logic, much easier to read and follow

function handleComments(comments) {
  console.log('Comments:', comments.length);
}

function handlePosts(posts) {
  console.log('Posts:', posts.length);
  getComments(posts[0].id, handleComments);
}

function handleUser(user) {
  console.log('User:', user.name);
  getPosts(user.id, handlePosts);
}

getUser(1, handleUser);

// ============================================================
// PART 7: The Event Loop
// ============================================================

// JavaScript is single-threaded but non-blocking.
// The event loop is what makes async possible.

// How it works:
// 1. Synchronous code runs on the Call Stack
// 2. Async operations (setTimeout, fetch) go to Web APIs
// 3. When they finish, their callbacks go to the Callback Queue
// 4. The Event Loop moves callbacks to the Call Stack only when it's empty

console.log('A'); // 1. Runs immediately (call stack)

setTimeout(() => {
  console.log('B'); // 3. Runs after stack is empty (callback queue)
}, 0);

console.log('C'); // 2. Runs immediately (call stack)

// Output: A, C, B
// Even with 0ms delay, setTimeout goes through the Web APIs + Queue.
// "B" has to wait for the call stack to clear before it can run.

// ============================================================
// PART 8: Debounce
// ============================================================

// Debounce delays a function call until the user stops triggering it.
// Every new call resets the timer - the function only runs after the quiet period.

// Use cases: search input, window resize, preventing double-clicks

function debounce(callback, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId); // cancel any previous pending call
    timeoutId = setTimeout(() => {
      // schedule a new one
      callback.apply(this, args);
    }, delay);
  };
}

// Example: without debounce this would fire on every single keystroke
const debouncedSearch = debounce((value) => {
  console.log('Searching for:', value);
}, 500);

// Simulating a user typing quickly - only the last call fires
debouncedSearch('h');
debouncedSearch('he');
debouncedSearch('hel');
debouncedSearch('hell');
debouncedSearch('hello'); // Only this one actually runs (500ms after last call)

// ============================================================
// BONUS: Stopwatch
// ============================================================

// Tracks elapsed time using Date.now().
// start() begins counting, stop() logs the elapsed time in seconds.

const stopwatch = {
  startTime: 0,
  intervalId: null,
  elapsed: 0,

  start() {
    this.startTime = Date.now() - this.elapsed;
    this.intervalId = setInterval(() => {
      this.elapsed = Date.now() - this.startTime;
    }, 10);
    console.log('Stopwatch started');
  },

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    console.log(`Elapsed: ${(this.elapsed / 1000).toFixed(2)} seconds`);
  },
};

stopwatch.start();
setTimeout(() => stopwatch.stop(), 3000); // Logs ~3.00 seconds

// ============================================================
// INTERVIEW QUESTIONS
// ============================================================

// Q23: What is asynchronous programming and why do we need it?
// ----------------------------------------------------------------
// Asynchronous programming lets code run without blocking the main thread.
// JavaScript is single-threaded - only one thing runs at a time.
// Without async, any slow operation (API call, timer) would freeze the browser.
// With async, slow operations are handed off (to Web APIs) and the rest of
// the code keeps running. The callback executes later when the result is ready.
//
// Common async use cases:
//   - Network requests (fetching data from an API)
//   - Timers (setTimeout, setInterval)
//   - File operations
//   - User interactions (we don't know when they'll happen)

// Q24: What's the difference between setTimeout and setInterval?
// ----------------------------------------------------------------
// setTimeout  → runs the callback ONCE after a delay
//               canceled with clearTimeout(id)
//               use for: single delayed action (show a toast, redirect)
//
// setInterval → runs the callback REPEATEDLY at a fixed interval
//               canceled with clearInterval(id)
//               use for: clocks, polling, animations
//
// Both return an ID, both accept milliseconds, both are async.
// Important: setTimeout(fn, 0) still runs asynchronously - it waits
// for the current call stack to clear before executing.

// Q25: What is callback hell and how do you avoid it?
// ----------------------------------------------------------------
// Callback hell (Pyramid of Doom) is deeply nested callbacks that make
// code hard to read, debug, and maintain.
//
// Example of the problem:
//   doA(function(a) {
//     doB(a, function(b) {
//       doC(b, function(c) { ... });
//     });
//   });
//
// Solutions:
//   1. Named functions - break each callback into a named function,
//      flatten the nesting (what we did in Part 6)
//   2. Promises - chain with .then() instead of nesting
//   3. Async/Await - write async code that reads like sync code (cleanest)
//
// Modern JavaScript (Promises + async/await) largely eliminates callback hell.

// Q26: Explain the JavaScript event loop.
// ----------------------------------------------------------------
// The event loop is how JavaScript handles async despite being single-threaded.
//
// Components:
//   - Call Stack    : where code executes (LIFO). Only one thing at a time.
//   - Web APIs      : browser handles async ops here (setTimeout, fetch, events)
//   - Callback Queue: completed callbacks wait here (FIFO)
//   - Event Loop    : checks "is the call stack empty?" - if yes, moves the
//                     next callback from the queue onto the stack
//
// Flow:
//   1. Sync code runs on the call stack
//   2. Async operation (e.g. setTimeout) handed to Web APIs
//   3. When it completes, callback goes to the Callback Queue
//   4. Event loop waits for stack to be empty, then pushes callback onto stack
//   5. Callback runs
//
// This is why setTimeout(fn, 0) still prints last - the callback has to go
// through Web APIs → Queue → Event Loop before it can run.

// Q27: What is debouncing and when would you use it?
// ----------------------------------------------------------------
// Debouncing ensures a function only runs after the user stops triggering it
// for a specified amount of time. Every new trigger resets the timer.
//
// Use cases:
//   - Search input: don't fire an API call on every keystroke, wait until
//     the user pauses typing
//   - Window resize: don't recalculate layout on every pixel change
//   - Button clicks: prevent accidental double submissions
//
// function debounce(fn, delay) {
//   let timeoutId;
//   return function(...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn(...args), delay);
//   };
// }
//
// Benefits: fewer function calls, fewer API requests, better performance.
// Related concept: Throttling - executes at most once per interval (rate-limiting).

// Q28: What happens if you call clearTimeout with an invalid ID?
// ----------------------------------------------------------------
// Nothing - no error is thrown. It's a no-op.
//
//   clearTimeout(undefined); // fine
//   clearTimeout(null);      // fine
//   clearTimeout(99999);     // fine (ID doesn't exist)
//
// This is intentional - it makes code more defensive.
// You don't need to check if an ID is valid before clearing it.
//
// Common pattern:
//   let timerId = null;
//   function restartTimer() {
//     clearTimeout(timerId);        // safe even when null
//     timerId = setTimeout(fn, 1000);
//   }
//
// Best practices:
//   - Always store the ID if you might need to cancel
//   - Always clearInterval when a component unmounts (important in React)
//   - Set the variable to null after clearing for clarity
