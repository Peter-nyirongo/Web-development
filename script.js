// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
function searchNotes(word) {
  return notes.filter(note => note.text.toLowerCase().includes(word.toLowerCase()));
}
console.log(searchNotes("milk")); // Expected: [{ id: 1, text: "Buy milk and bread", category: "personal" }]
console.log(searchNotes("xyz")); // Expected: []

// 2. longestNote()
function longestNote() {
  if (notes.length === 0) return null;
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}
console.log(longestNote()); // Expected: { id: 3, text: "Email the project report to Grace", category: "work" }
// Edge case: empty array (temporarily swap global variable to test)
let temp1 = notes; notes = []; 
console.log(longestNote()); // Expected: null
notes = temp1;

// 3. countByCategory()
function countByCategory() {
  let counts = {};
  for (let i = 0; i < notes.length; i++) {
    let cat = notes[i].category;
    if (counts[cat]) {
      counts[cat]++;
    } else {
      counts[cat] = 1;
    }
  }
  return counts;
}
console.log(countByCategory()); // Expected: { personal: 2, study: 2, work: 1 }
// Edge case: empty array
let temp2 = notes; notes = [];
console.log(countByCategory()); // Expected: {}
notes = temp2;

// 4. getSummary()
function getSummary() {
  let counts = countByCategory();
  let total = notes.length;
  let noteWord = total === 1 ? "note" : "notes";
  
  let parts = [];
  for (let cat in counts) {
    parts.push(`${counts[cat]} ${cat}`);
  }
  
  return `${total} ${noteWord}: ${parts.join(", ")}.`;
}
console.log(getSummary()); // Expected: "5 notes: 2 personal, 2 study, 1 work."
// Edge case: exactly 1 note
let temp3 = notes; notes = [{ id: 1, text: "Single note", category: "work" }];
console.log(getSummary()); // Expected: "1 note: 1 work."
notes = temp3;

// 5. isDuplicate(text)
function isDuplicate(text) {
  let normalized = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === normalized);
}
console.log(isDuplicate("Buy milk and bread")); // Expected: true
console.log(isDuplicate("  BUY MILK AND BREAD  ")); // Expected: true (edge case: ignores case and extra spaces)
console.log(isDuplicate("Something entirely new")); // Expected: false

// 6. addNote(text, category)
function addNote(text, category) {
  if (text.length < 1 || text.length > 200) {
    console.log("Reason: Text must be between 1 and 200 characters.");
    return false;
  }
  if (category !== "personal" && category !== "work" && category !== "study") {
    console.log("Reason: Category must be personal, work, or study.");
    return false;
  }
  if (isDuplicate(text)) {
    console.log("Reason: A note with this text already exists.");
    return false;
  }
  
  let newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  notes.push({ id: newId, text: text, category: category });
  console.log("Reason: Note added successfully.");
  return true;
}
console.log(addNote("Buy eggs", "personal")); // Expected: true
console.log(addNote("", "personal")); // Expected: false (and logs length reason)
console.log(addNote("Buy milk and bread", "personal")); // Expected: false (and logs duplicate reason)
console.log(addNote("New task", "hobby")); // Expected: false (and logs category reason)
