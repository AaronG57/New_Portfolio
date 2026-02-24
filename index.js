// Smooth scrolling to sections
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// AI Chatbot
async function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const text = input.value.trim();
  if (!text) return;

  chat.innerHTML += `<p><b>You:</b> ${text}</p>`;

  // ⚠️ Replace YOUR_API_KEY_HERE with OpenAI key
  const API_KEY = "YOUR_API_KEY_HERE";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an assistant representing Argyn Karimkhan, an AI student." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;

    chat.innerHTML += `<p><b>AI:</b> ${reply}</p>`;
  } catch (err) {
    chat.innerHTML += `<p><b>AI:</b> Error connecting to AI</p>`;
  }

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}