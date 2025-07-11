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