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
