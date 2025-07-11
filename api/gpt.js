
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { message } = req.body;

  // Simulate Vyne's personality with a local fake response
  const replies = {
    hi: "Hey! I'm Vyne 👋 How can I support you today?",
    hello: "Hello there! I'm your growth partner, Vyne 🌱",
    help: "I can help you reflect, grow, track goals, or just talk 💬",
    default: "I’m still learning, but I’m here with you 💚"
  };

  const lower = message.trim().toLowerCase();
  const reply = replies[lower] || replies.default;

  res.status(200).json({ reply });
}