// Select all required elements
const noteText = document.getElementById('note-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to update counts, classes, and save draft
function updateCounts() {
  const text = noteText.value;
  const charLen = text.length;
  
  // Calculate word count (handle empty string to avoid counting as 1 word)
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  // Update text content
  charCount.textContent = `${charLen} / 200 characters`;
  wordCount.textContent = `${words} words`;

  // Manage warning and over classes
  charCount.classList.remove('warning', 'over');
  if (charLen > 200) {
    charCount.classList.add('over');
  } else if (charLen > 180) {
    charCount.classList.add('warning');
  }

  // Save draft to localStorage
  localStorage.setItem('noteDraft', text);
}

// Event listener for every input event
noteText.addEventListener('input', updateCounts);

// Clear button functionality
clearBtn.addEventListener('click', () => {
  noteText.value = '';
  updateCounts(); // This resets counters and saves the empty string
  localStorage.removeItem('noteDraft'); // Explicitly remove draft as requested
});

// Escape key functionality inside the textarea
noteText.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    noteText.value = '';
    updateCounts();
    localStorage.removeItem('noteDraft');
  }
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  
  // Remember the choice in localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Initialization on page load
window.addEventListener('DOMContentLoaded', () => {
  // Restore saved draft
  const savedDraft = localStorage.getItem('noteDraft');
  if (savedDraft !== null) {
    noteText.value = savedDraft;
  }

  // Restore saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = 'Light mode';
  }

  // Call updateCounts to set initial state
  updateCounts();
});
