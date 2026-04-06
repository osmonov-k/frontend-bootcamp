// ============================================================
// Class 25 — Professional Error Handling
// ============================================================
// Review notes for students. Go through each section in order.
// ============================================================


// ------------------------------------------------------------
// PART 1: Loading States
// ------------------------------------------------------------

// Real apps need to track three things during async operations:
//   loading → is the request in flight?
//   data    → what came back on success?
//   error   → what went wrong on failure?
//
// This pattern maps cleanly onto try / catch / finally.

async function loadData() {
  const state = {
    loading: false,
    data: null,
    error: null
  };

  const spinner  = document.getElementById('spinner');
  const errorDiv = document.getElementById('error');
  const dataDiv  = document.getElementById('data');

  try {
    // --- start loading ---
    state.loading = true;
    spinner.style.display  = 'block';
    errorDiv.style.display = 'none';

    const response = await fetch('/api/data');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    state.data = await response.json();

    // --- show data ---
    dataDiv.textContent = JSON.stringify(state.data, null, 2);

  } catch (error) {
    // --- show error ---
    state.error = error.message;
    errorDiv.textContent   = `Error: ${error.message}`;
    errorDiv.style.display = 'block';

  } finally {
    // --- always hide spinner, success or failure ---
    state.loading         = false;
    spinner.style.display = 'none';
  }
}


// ------------------------------------------------------------
// PART 2: Retry Logic
// ------------------------------------------------------------

// Networks fail. A good pattern is to retry a few times before
// giving up, with increasing delays between attempts
// (called exponential backoff).
//
//   Attempt 1 fails → wait 1s  (2^0 * 1000)
//   Attempt 2 fails → wait 2s  (2^1 * 1000)
//   Attempt 3 fails → wait 4s  (2^2 * 1000)
//   Attempt 4 fails → throw    (give up, re-throw last error)

async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();

    } catch (error) {
      // If this was the last attempt, stop retrying and surface the error
      if (i === maxRetries - 1) throw error;

      const delay = Math.pow(2, i) * 1000; // exponential backoff
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage
fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => console.log('Got data:', data))
  .catch(error => console.error('All retries failed:', error.message));


// ============================================================
// KEY TAKEAWAYS
// ============================================================

// 1. Always manage loading / data / error state together.
//    Forgetting to reset loading in finally = stuck spinners.

// 2. fetch() does NOT reject on HTTP errors.
//    Always check response.ok and throw manually.

// 3. Use finally for cleanup — it runs whether you succeed or fail.
//    Perfect for hiding spinners, releasing locks, etc.

// 4. Exponential backoff avoids hammering a struggling server.
//    Re-throw on the last attempt so the caller knows it failed.
