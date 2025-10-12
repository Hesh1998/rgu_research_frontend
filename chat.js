/* Append a new message bubble */
function appendMessage({ text, side = "bot" }) {
  const chat = document.getElementById("chat-window");

  const msg = document.createElement("div");
  msg.className = `msg ${side}`;

  // Avatar (CSS provides icons for .bot and .user)
  const avatar = document.createElement("div");
  avatar.className = `avatar ${side === "bot" ? "bot" : "user"}`;

  // Message text column
  const col = document.createElement("div");
  col.className = "col";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  // Allow manual line breaks (\n), otherwise single-line sentence
  bubble.innerHTML = text.replace(/\n/g, "<br>");

  col.appendChild(bubble);

  // Append avatar and text depending on sender
  if (side === "bot") {
    msg.appendChild(avatar);
    msg.appendChild(col);
  } else {
    msg.appendChild(col);
    msg.appendChild(avatar);
  }

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

/* Fixed static AI response (for testing) */
function getBotResponse(userText) {
  // 🔹 When ready for backend integration, replace this with:
  // return fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: userText }) })
  //   .then(res => res.json())
  //   .then(data => data.reply);

  // 🔸 For now: same response every time
  return Promise.resolve(
    "This is a static AI response for testing the chat interface. Replace this later with your dynamic backend output."
  );
}

/* Handle user message submission */
function handleSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (!text) return;

  appendMessage({ text, side: "user" });
  input.value = "";

  // Show typing indicator
  const typing = document.getElementById("typing");
  typing.classList.remove("hidden");

  setTimeout(() => {
    getBotResponse(text).then((reply) => {
      typing.classList.add("hidden");
      appendMessage({ text: reply, side: "bot" });
    });
  }, 700);
}

/* Initialize chat on page load */
document.addEventListener("DOMContentLoaded", () => {
  appendMessage({
    text: "Hi there! Ask what you need to know about Sales Data.",
    side: "bot",
  });

  const form = document.getElementById("chat-form");
  form.addEventListener("submit", handleSubmit);

  form.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  });
});