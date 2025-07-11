export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { message } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await openaiRes.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from OpenAI" });
    console.error("OpenAI Error:", error);
  }
}