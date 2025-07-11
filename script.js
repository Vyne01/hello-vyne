async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatLog = document.getElementById("chat-log");
  chatLog.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  input.value = "";

  try {
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (data.reply) {
      chatLog.innerHTML += `<p><strong>Vyne:</strong> ${data.reply}</p>`;
    } else {
      chatLog.innerHTML += `<p><strong>Vyne:</strong> Something went wrong (No reply)</p>`;
    }
  } catch (error) {
    console.error("Error:", error);
    chatLog.innerHTML += `<p><strong>Vyne:</strong> Something went wrong (API failed)</p>`;
  }
}
function saveJournal() {
  const input = document.getElementById("journal-input");
  const text = input.value.trim();
  if (!text) return;

  const date = new Date().toLocaleString();
  const entry = { text, date };

  let entries = JSON.parse(localStorage.getItem("vyne_journal")) || [];
  entries.unshift(entry); // newest first
  localStorage.setItem("vyne_journal", JSON.stringify(entries));

  input.value = "";
  loadJournalEntries();
}

function loadJournalEntries() {
  const entries = JSON.parse(localStorage.getItem("vyne_journal")) || [];
  const ul = document.getElementById("journal-entries");
  ul.innerHTML = "";

  entries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `[${entry.date}] ${entry.text}`;
    ul.appendChild(li);
  });
}

// Load journal on page load
window.onload = function () {
  loadJournalEntries();
};
let selectedMood = "😐"; // Default mood

function setMood(mood) {
  selectedMood = mood;
}

function saveJournal() {
  const input = document.getElementById("journal-input");
  const text = input.value.trim();
  if (!text) return;

  const date = new Date().toLocaleString();
  const entry = { text, date, mood: selectedMood };

  let entries = JSON.parse(localStorage.getItem("vyne_journal")) || [];
  entries.unshift(entry);
  localStorage.setItem("vyne_journal", JSON.stringify(entries));

  input.value = "";
  selectedMood = "😐"; // Reset mood
  loadJournalEntries();
}

function loadJournalEntries() {
  const entries = JSON.parse(localStorage.getItem("vyne_journal")) || [];
  const ul = document.getElementById("journal-entries");
  ul.innerHTML = "";

  entries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `[${entry.date}] ${entry.mood} ${entry.text}`;
    ul.appendChild(li);
  });
}