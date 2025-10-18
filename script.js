// Append a new message bubble to the chat window
function appendMessage({ text, side = "bot" }) {
  const chat = document.getElementById("chat-window");

  const msg = document.createElement("div");
  msg.className = `msg ${side}`;

  const avatar = document.createElement("div");
  avatar.className = `avatar ${side === "bot" ? "bot" : "user"}`;

  const col = document.createElement("div");
  col.className = "col";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const trimmed = typeof text === "string" ? text.trim() : "";

  const hasHTML = /<([a-z][\w-]*)(\s[^>]*)?>/i.test(trimmed);

  if (hasHTML) {
    bubble.style.whiteSpace = "normal";
    bubble.innerHTML = trimmed;
  } else {
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


// Get Response from Backend
function getBotResponse(userText) {
  // Backend API call here
  // userText - User's question
  // const llmSelect = document.getElementById("llm-select");
  // llmSelect.value - Selected LLM model

  let backendResponse = "";
  async function fetchBackendData() {
    try {
      const response = await fetch("http://18.141.147.85:5000/test");

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.text();
      backendResponse = data;
    } catch (error) {
      console.error("Error fetching from backend:", error);
    }
  }
  fetchBackendData();

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
  // return Promise.resolve(response);
  return Promise.resolve(backendResponse);
}


// Handle user message submission
function handleSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (!text) return;

  appendMessage({ text, side: "user" });
  input.value = "";

  const typing = document.getElementById("typing");
  typing.classList.remove("hidden");

  setTimeout(() => {
    getBotResponse(text).then((reply) => {
      typing.classList.add("hidden");
      appendMessage({ text: reply, side: "bot" });
    });
  }, 700);
}


// Initialize chat on page load
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