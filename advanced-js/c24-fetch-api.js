// ============================================================
// Class 24 — Fetch API
// ============================================================
// Review notes for students. Go through each section in order.
// Interview questions are at the bottom.
// ============================================================


// ------------------------------------------------------------
// PART 1: HTTP Basics
// ------------------------------------------------------------

// HTTP Methods — what kind of operation you're performing:
//
//   GET    → retrieve data (read-only)
//   POST   → create new data
//   PUT    → replace existing data entirely
//   PATCH  → partially update existing data
//   DELETE → remove data

// Status Codes — what the server is telling you back:
//
//   200 OK           → success
//   201 Created      → resource was created (usually after POST)
//   204 No Content   → success, but no data returned (often DELETE)
//   400 Bad Request  → client sent invalid data
//   401 Unauthorized → not logged in / not authenticated
//   403 Forbidden    → logged in but not allowed to do this
//   404 Not Found    → resource doesn't exist
//   500 Server Error → something crashed on the server


// ------------------------------------------------------------
// PART 2: Fetch API
// ------------------------------------------------------------

// fetch() is the modern built-in way to make HTTP requests.
// It always returns a Promise.
// The Promise resolves with a Response object — not the data itself.
// You have to call .json() (or .text(), .blob()) to parse the body,
// and that also returns a Promise.


// --- Basic GET request ---

async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // fetch() does NOT reject on 404/500 — you must check manually
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    console.log(users);
    return users;

  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}

getUsers();


// --- POST request — sending data to the server ---

async function createPost(title, body) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // tell the server what format we're sending
      },
      body: JSON.stringify({                  // data must be a string
        title,
        body,
        userId: 1
      })
    });

    const newPost = await response.json();
    console.log('Created:', newPost);
    return newPost;

  } catch (error) {
    console.error('Error creating post:', error);
  }
}

createPost('My New Post', 'This is the content');


// --- PUT — full replacement of an existing resource ---

async function updatePost(id, title, body) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title, body, userId: 1 })  // send the whole object
  });
  return response.json();
}

// --- PATCH — partial update, only send what changed ---

async function patchPost(id, updates) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)  // only the fields you want to change
  });
  return response.json();
}

// --- DELETE ---

async function deletePost(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}


// ------------------------------------------------------------
// PART 3: Real API Integration
// ------------------------------------------------------------

// GitHub has a free public API — no auth needed for basic lookups.
// Good example of working with a real-world REST API.

async function fetchGitHubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`User not found: ${response.status}`);
    }

    const user = await response.json();

    // Pull out only the fields we care about
    return {
      name:      user.name,
      bio:       user.bio,
      repos:     user.public_repos,
      followers: user.followers,
      avatar:    user.avatar_url
    };

  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

fetchGitHubUser('octocat').then(user => console.log(user));


// ============================================================
// INTERVIEW QUESTIONS
// ============================================================

// --- Q35: What is the Fetch API and how do you use it? ---
//
// The Fetch API is a modern browser-native interface for making HTTP requests.
// It replaced XMLHttpRequest and works with Promises.
//
// Basic pattern:
//   const response = await fetch(url);
//   const data = await response.json();
//
// For POST/PUT/PATCH, pass an options object:
//   fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   });
//
// Key points to know:
//   1. Returns a Promise that resolves with a Response object
//   2. Body must be parsed separately (.json(), .text(), .blob())
//   3. fetch() does NOT reject on HTTP errors (404, 500, etc.)
//      → You MUST check response.ok or response.status yourself
//
// Critical gotcha:
//   fetch('/api/missing')   // 404 — Promise still RESOLVES
//   // response.ok === false, response.status === 404
//   // No error is thrown automatically!
//
//   Always do this:
//   if (!response.ok) {
//     throw new Error(`HTTP error: ${response.status}`);
//   }
