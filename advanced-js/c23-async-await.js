// ============================================================
// Class 23 - Async / Await
// ============================================================

// ============================================================
// PART 1: The Evolution of Async JavaScript
// ============================================================

// JavaScript async handling has gone through three generations:

// 1. Callbacks (2009) - pass a function to run when done
getData(function (result) {
  console.log(result);
});

// 2. Promises (ES6, 2015) - chain .then() calls
getData()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// 3. Async/Await (ES2017, 2017) - looks like synchronous code
const result = await getData();
console.log(result);

// Async/Await is just cleaner syntax on top of Promises.
// Under the hood it's still Promises - same behavior, better readability.

// ============================================================
// PART 2: Basic Syntax
// ============================================================

// 'async' marks a function as asynchronous.
// It always returns a Promise, even if you return a plain value.
// 'await' pauses execution inside the function until the Promise resolves.

async function fetchUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();
  return user; // wrapped in a resolved Promise automatically
}

// Since fetchUser returns a Promise, you can use .then() on it...
fetchUser().then((user) => console.log(user));

// ...or await it inside another async function
async function main() {
  const user = await fetchUser();
  console.log(user);
}

main();

// ============================================================
// PART 3: Converting Promises to Async/Await
// ============================================================

// --- Promise version ---
function getUserPromise() {
  return fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// --- Async/Await version (same behavior, easier to read) ---
async function getUserAsync() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users/1',
    );
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Sequential async operations - Promise version
// Each step needs a variable in outer scope to pass results between .then() calls
function loadUserDataPromise() {
  let user;

  return fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((res) => res.json())
    .then((userData) => {
      user = userData;
      return fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
      );
    })
    .then((res) => res.json())
    .then((posts) => {
      return { user, posts };
    });
}

// Sequential async operations - Async/Await version (much cleaner)
// Variables live in the same scope, reads top to bottom like sync code
async function loadUserDataAsync() {
  const userRes = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await userRes.json();

  const postsRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
  );
  const posts = await postsRes.json();

  return { user, posts };
}

// ============================================================
// PART 4: Error Handling
// ============================================================

// Use try/catch just like synchronous code.
// The catch block receives whatever was thrown or rejected.

async function fetchData() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error.message);
    throw error; // re-throw so the caller can handle it too
  }
}

fetchData();

// finally - runs no matter what (success or error)
// Use it for cleanup: hiding a spinner, closing a connection, etc.

async function fetchWithCleanup() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.log('Fetch attempt finished'); // always runs
  }
}

fetchWithCleanup();

// Multiple try/catch blocks - handle each operation independently
// Useful when one failure shouldn't stop everything else

async function complexOperation() {
  let user, posts;

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    user = await res.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null; // bail early if user is required
  }

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
    );
    posts = await res.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    posts = []; // fallback to empty array, continue anyway
  }

  return { user, posts };
}

complexOperation().then(console.log);

// ============================================================
// PART 5: Sequential vs Parallel Execution
// ============================================================

// Helper: simulate a delayed fetch (for timing demos)
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fakeUser() {
  await delay(1000);
  return { id: 1, name: 'Alice' };
}

async function fakePosts() {
  await delay(1000);
  return [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
  ];
}

async function fakeTags() {
  await delay(1000);
  return ['js', 'async', 'await'];
}

// ❌ Sequential - each await waits for the previous one to finish
// Total time = 1s + 1s + 1s = ~3 seconds
async function sequential() {
  console.time('sequential');

  const user = await fakeUser(); // wait 1s
  const posts = await fakePosts(); // then wait 1s
  const tags = await fakeTags(); // then wait 1s

  console.timeEnd('sequential'); // ~3 seconds
  return { user, posts, comments: tags };
}

sequential();

// ✅ Parallel - kick off all Promises at once, then await the results
// Total time = max(1s, 1s, 1s) = ~1 second
async function parallel() {
  console.time('parallel');

  const userPromise = fakeUser(); // starts immediately
  const postsPromise = fakePosts(); // starts immediately
  const tagsPromise = fakeTags(); // starts immediately

  const user = await userPromise; // wait for each to finish
  const posts = await postsPromise;
  const tags = await tagsPromise;

  console.timeEnd('parallel'); // ~1 second
  return { user, posts, tags };
}

parallel();

// ✅ Parallel - cleaner version with Promise.all()
// Resolves when ALL promises resolve; rejects if ANY rejects
async function parallelWithAll() {
  console.time('Promise.all');

  const [user, posts, tags] = await Promise.all([
    fakeUser(),
    fakePosts(),
    fakeTags(),
  ]);

  console.timeEnd('Promise.all'); // ~1 second
  return { user, posts, tags };
}

parallelWithAll();

// When to use sequential vs parallel:
//
// Sequential - when operations DEPEND on each other:
//   const user  = await getUser(id);
//   const posts = await getPosts(user.id); // needs user.id first
//
// Parallel - when operations are INDEPENDENT:
//   const [users, posts, tags] = await Promise.all([getUsers(), getPosts(), getTags()]);

// ============================================================
// INTERVIEW QUESTIONS
// ============================================================

// Q32: What is async/await and how does it differ from Promises?
// ----------------------------------------------------------------
// Async/await is syntactic sugar over Promises that makes async code
// look and read like synchronous code.
//
// async keyword:
//   - Marks a function as asynchronous
//   - The function always returns a Promise (plain values are auto-wrapped)
//   - Enables use of await inside
//
// await keyword:
//   - Pauses execution of the async function until the Promise resolves
//   - Returns the resolved value
//   - Can only be used inside async functions
//
// Promises:
//   fetch('/api/user')
//     .then(res => res.json())
//     .then(user => console.log(user))
//     .catch(err => console.error(err));
//
// Async/Await (same behavior):
//   try {
//     const res  = await fetch('/api/user');
//     const user = await res.json();
//     console.log(user);
//   } catch (err) {
//     console.error(err);
//   }
//
// Benefits of async/await:
//   - Reads top-to-bottom like sync code (easier to follow)
//   - try/catch for error handling (consistent with sync code)
//   - Easier to debug (cleaner stack traces)
//   - No .then() chaining or nesting
//
// Important: it's still Promises under the hood - same behavior, cleaner syntax.

// Q33: How do you handle errors in async/await?
// ----------------------------------------------------------------
// Use try/catch blocks, exactly like synchronous error handling.
//
// Basic pattern:
//   async function fetchData() {
//     try {
//       const data = await riskyOperation();
//       return data;
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   }
//
// Patterns:
//
// 1. Single try/catch - good when any failure means the whole function fails
//
// 2. Multiple try/catch - handle each step independently with fallbacks:
//      try { user = await fetchUser(); } catch { return null; }
//      try { posts = await fetchPosts(user.id); } catch { posts = []; }
//
// 3. Specific error types:
//      catch (error) {
//        if (error.name === 'TypeError')  { /* network error */ }
//        if (error.name === 'SyntaxError') { /* bad JSON */ }
//      }
//
// 4. finally for cleanup (always runs, success or failure):
//      try { return await operation(); }
//      catch (error) { handleError(error); }
//      finally { hideSpinner(); }
//
// Common mistake: no try/catch → unhandled Promise rejection crashes the app.

// Q34: What's the difference between sequential and parallel async operations?
// ----------------------------------------------------------------
// Sequential: each await waits for the previous to finish before starting
// Parallel:   all operations start at the same time
//
// Sequential (slow - ~3s if each takes 1s):
//   const a = await fetchA(); // wait
//   const b = await fetchB(); // then wait
//   const c = await fetchC(); // then wait
//   // Total: time(A) + time(B) + time(C)
//
// Parallel with Promise.all (fast - ~1s if each takes 1s):
//   const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
//   // Total: max(time(A), time(B), time(C))
//
// Use sequential when:
//   - B depends on the result of A (e.g. need user.id to fetch posts)
//   - Order matters / operations must not overlap
//
// Use parallel when:
//   - Operations are independent (users, posts, tags can all fetch at once)
//   - You want maximum speed
//
// Common mistake: using sequential awaits for independent operations,
// making the app unnecessarily slow.
