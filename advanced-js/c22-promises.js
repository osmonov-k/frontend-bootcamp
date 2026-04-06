// ============================================================
// Class 22 — Promises
// ============================================================
// Review notes for students. Go through each section in order.
// Interview questions are at the bottom.
// ============================================================

// ------------------------------------------------------------
// PART 1: What is a Promise?
// ------------------------------------------------------------

// Before Promises, async code used callbacks — which led to
// deeply nested, hard-to-read code ("callback hell"):

getData(function (a) {
  getMoreData(a, function (b) {
    getEvenMoreData(b, function (c) {
      console.log(c); // 3 levels deep already...
    });
  });
});

// Promises flatten this into a readable chain:

getData()
  .then((a) => getMoreData(a))
  .then((b) => getEvenMoreData(b))
  .then((c) => console.log(c));

// A Promise has 3 states:
//
//   Pending   → operation is in progress (initial state)
//   Fulfilled → operation completed successfully (has a value)
//   Rejected  → operation failed (has an error)
//
// Once a promise is settled (fulfilled or rejected),
// its state NEVER changes.

// ------------------------------------------------------------
// PART 2: Creating Promises
// ------------------------------------------------------------

// The Promise constructor takes a function with two arguments:
//   resolve → call this when the operation succeeds
//   reject  → call this when the operation fails

const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve('Operation succeeded!');
  } else {
    reject('Operation failed!');
  }
});

promise
  .then((result) => console.log(result)) // 'Operation succeeded!'
  .catch((error) => console.error(error));

// --- Wrapping setTimeout in a Promise ---

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

console.log('Starting...');

delay(2000)
  .then(() => {
    console.log('2 seconds passed');
    return delay(1000);
  })
  .then(() => {
    console.log('3 seconds total');
  });

// --- Simulating an API call ---

function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    console.log('Fetching user...');

    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: 'Alice', email: 'alice@example.com' });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then((user) => console.log('User:', user.name))
  .catch((error) => console.error('Error:', error.message));

// ------------------------------------------------------------
// PART 3: Promise Chaining
// ------------------------------------------------------------

// Each .then() returns a NEW Promise, which is how chaining works.
// You pass a value forward by returning it from each .then().

function step1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Step 1 complete'), 1000);
  });
}

function step2(prev) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(prev + ' → Step 2 complete'), 1000);
  });
}

function step3(prev) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(prev + ' → Step 3 complete'), 1000);
  });
}

step1()
  .then((result1) => {
    console.log(result1); // 'Step 1 complete'
    return step2(result1);
  })
  .then((result2) => {
    console.log(result2); // 'Step 1 complete → Step 2 complete'
    return step3(result2);
  })
  .then((result3) => {
    console.log(result3); // '...Step 3 complete'
  })
  .catch((error) => {
    console.error('Something went wrong:', error);
  });

// --- Returning values vs. returning Promises ---

// .then() wraps plain return values in a Promise automatically.
// If you return a Promise, the chain waits for it to settle.

Promise.resolve(1)
  .then((x) => x + 1) // returns plain value → 2
  .then((x) => Promise.resolve(x + 1)) // returns Promise     → 3
  .then((x) => x + 1) // returns plain value → 4
  .then((x) => console.log(x)); // 4

// Common mistake: forgetting to return inside .then()
//
//   .then(value => {
//     doSomething(value);        // ❌ chain breaks — returns undefined
//   })
//
//   .then(value => {
//     return doSomething(value); // ✅
//   })

// ------------------------------------------------------------
// PART 4: Error Handling
// ------------------------------------------------------------

// .catch() handles rejections from any step above it in the chain.

function riskyOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve('Success!');
      else reject(new Error('Failed!'));
    }, 1000);
  });
}

riskyOperation()
  .then((result) => console.log(result))
  .catch((error) => console.error('Caught error:', error.message));

// --- Error propagation ---
// When an error is thrown, the chain skips all .then() handlers
// until the nearest .catch(). After .catch() returns, the chain
// can continue normally.

Promise.resolve(1)
  .then((x) => {
    console.log('Step 1:', x); // runs
    return x + 1;
  })
  .then((x) => {
    console.log('Step 2:', x); // runs
    throw new Error('Something went wrong!');
  })
  .then((x) => {
    console.log('Step 3:', x); // SKIPPED
  })
  .catch((error) => {
    console.error('Caught:', error.message); // 'Something went wrong!'
    return 'recovered';
  })
  .then((x) => {
    console.log('Step 4:', x); // 'recovered' — chain continues
  });

// Output:
// Step 1: 1
// Step 2: 2
// Caught: Something went wrong!
// Step 4: recovered

// --- .finally() for cleanup ---
// Runs after the promise settles, regardless of success or failure.
// Does not receive a value — use it for cleanup only.

let isLoading = true;

fetchUser(1)
  .then((data) => {
    console.log('Data:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(() => {
    isLoading = false;
    console.log('Cleanup complete'); // always runs
  });

// ------------------------------------------------------------
// PART 5: Promise Utilities
// ------------------------------------------------------------

// --- Promise.all() — wait for ALL to complete ---
// Returns an array of results in the same order as input.
// If ANY promise rejects, the whole thing rejects immediately.

const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 1000));
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 500));

Promise.all([p1, p2, p3])
  .then((results) => console.log(results)) // [1, 2, 3]
  .catch((error) => console.error('One failed:', error));

// Real-world use: load multiple resources at once
const fetchUserData = fetch('/api/user');
const fetchPosts = fetch('/api/posts');
const fetchComments = fetch('/api/comments');

Promise.all([fetchUserData, fetchPosts, fetchComments])
  .then(([user, posts, comments]) => {
    console.log('Everything loaded!');
  })
  .catch((error) => console.error('Something failed:', error));

// --- Promise.race() — first one to settle wins ---
// Returns the result of whichever promise settles first
// (resolve OR reject).

const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), 3000));
const fast = new Promise((resolve) => setTimeout(() => resolve('fast'), 1000));

Promise.race([slow, fast]).then((result) => console.log(result)); // 'fast'

// Real-world use: timeout pattern

function fetchWithTimeout(url, timeout) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}

fetchWithTimeout('/api/data', 5000)
  .then((response) => console.log('Got data in time!'))
  .catch((error) => console.error('Too slow or failed:', error.message));

// Also worth knowing:
//   Promise.allSettled([...]) — waits for all, never rejects,
//                               returns status + value/reason for each
//   Promise.any([...])        — resolves with the first fulfilled promise,
//                               ignores rejections unless all reject

// ============================================================
// INTERVIEW QUESTIONS
// ============================================================

// --- Q29: What is a Promise and what problem does it solve? ---
//
// A Promise is an object that represents the eventual completion
// or failure of an asynchronous operation.
//
// Problems it solves:
//   1. Callback hell — replaces deeply nested callbacks with flat chains
//   2. Error handling — one .catch() covers an entire chain
//   3. Composition — Promise.all() / Promise.race() for parallel work
//
// States:
//   Pending   → operation in progress
//   Fulfilled → completed successfully (has a value)
//   Rejected  → failed (has an error)
//
// Once settled, state never changes.

// --- Q30: How does Promise chaining work? ---
//
// Each .then() returns a new Promise. The value you return inside
// .then() becomes the resolved value for the next .then().
// If you return a Promise, the chain waits for it to settle.
// Errors skip all .then() handlers until the nearest .catch().
//
// Rules:
//   - Always return from .then() to keep the chain alive
//   - Return a Promise if you need to await an async operation
//   - Return a plain value for synchronous work
//   - One .catch() at the end handles all errors above it

// --- Q31: What's the difference between Promise.all() and Promise.race()? ---
//
//                   Promise.all()          Promise.race()
//   Result:         All results (array)    First result only
//   Rejects when:   Any promise rejects    First promise rejects
//   Use case:       Parallel dependencies  Timeout / fastest server
//
// Promise.all()  — waits for every promise; one rejection cancels all
// Promise.race() — resolves/rejects as soon as the first one settles
//
// Also:
//   Promise.allSettled() — like .all() but never rejects;
//                          gives status for each promise
//   Promise.any()        — first fulfilled; ignores individual rejections
