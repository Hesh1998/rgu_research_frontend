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
  const response = `<b>Query:</b> select * from dwh.gold.sales_fact left outer join dwh.gold.currency_dim ON dwh.gold.sales_fact.currency_sk = dwh.gold.currency_dim.currency_sk limit 100;<br><br>
  <b>Output:</b><br><br>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value1</th>
          <th>Value2</th>
          <th>Value3</th>
          <th>Value4</th>
          <th>Value5</th>
          <th>Value6</th>
          <th>Value7</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sales</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
        </tr>
        <tr>
          <td>Revenue Growth</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
        </tr>
        <tr>
          <td>Top Region</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
        </tr>
        <tr>
          <td>Sales</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
        </tr>
        <tr>
          <td>Revenue Growth</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
        </tr>
        <tr>
          <td>Top Region</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
        </tr>
        <tr>
          <td>Sales</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
          <td>$120,000</td>
        </tr>
        <tr>
          <td>Revenue Growth</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
          <td>12%</td>
        </tr>
        <tr>
          <td>Top Region</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
          <td>Europe</td>
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