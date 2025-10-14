/* Append a new message bubble */
function appendMessage({ text, side = "bot" }) {
  const chat = document.getElementById("chat-window");

  const msg = document.createElement("div");
  msg.className = `msg ${side}`;

  // Avatar
  const avatar = document.createElement("div");
  avatar.className = `avatar ${side === "bot" ? "bot" : "user"}`;

  // Column
  const col = document.createElement("div");
  col.className = "col";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  // Trim leading/trailing whitespace to remove blank gap
  const trimmed = typeof text === "string" ? text.trim() : "";

  // Detect HTML (e.g., table) and avoid turning newlines into <br>
  const hasHTML = /<([a-z][\w-]*)(\s[^>]*)?>/i.test(trimmed);

  if (hasHTML) {
    // Let HTML render naturally (no forced <br/>s)
    bubble.style.whiteSpace = "normal";
    bubble.innerHTML = trimmed;
  } else {
    // Plain text: keep manual \n line breaks only
    bubble.innerHTML = trimmed.replace(/\n/g, "<br>");
  }

  col.appendChild(bubble);

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
  const llmSelect = document.getElementById("mode-select");
  // const response = `User request is "${userText}". LLM is "${llmSelect.value}".`;
  const response = `
    <table style="width:100%; border-collapse:collapse; font-size:14px;">
      <thead style="background:#f1f5f9;">
        <tr>
          <th style="border:1px solid #e2e8f0; padding:6px; text-align:left;">Metric</th>
          <th style="border:1px solid #e2e8f0; padding:6px; text-align:left;">Value1</th>
          <th style="border:1px solid #e2e8f0; padding:6px; text-align:left;">Value2</th>
          <th style="border:1px solid #e2e8f0; padding:6px; text-align:left;">Value3</th>
          <th style="border:1px solid #e2e8f0; padding:6px; text-align:left;">Value4</th>
          <th style="border:1px solid #e2e8f0; padding:6px; text-align:left;">Value5</th>
          <th style="border:1px solid #e2e8f0; padding:6px; text-align:left;">Value6</th>
          <th style="border:1px solid #e2e8f0; padding:6px; text-align:left;">Value7</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:6px;">Sales</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:6px;">Revenue Growth</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:6px;">Top Region</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:6px;">Sales</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:6px;">Revenue Growth</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:6px;">Top Region</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:6px;">Sales</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">$120,000</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:6px;">Revenue Growth</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">12%</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:6px;">Top Region</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
          <td style="border:1px solid #e2e8f0; padding:6px;">Europe</td>
        </tr>
      </tbody>
    </table>
  `;
  return Promise.resolve(response);
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