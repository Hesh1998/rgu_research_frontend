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
async function getBotResponse(userText) {
  const llmSelect = document.getElementById("llm-select");
  if (llmSelect.value === "OpenAI GPT-5") {
    llm = 'gpt-5';
  } else if (llmSelect.value === "Google Gemini 2.5 Pro") {
    llm = 'gem-2.5-pro';
  } else if (llmSelect.value === "Anthropic Claude Opus 4.1") {
    llm = 'opus-4.1';
  }

  var nl_request = {};
  nl_request["llm"] = llm;
  nl_request["question"] = userText;
  var json_nl_request = JSON.stringify(nl_request);
  
  try {
    const response = await fetch("http://18.141.147.85:5000/query_dwh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: json_nl_request
    });

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const data = await response.json();

    var tableHTML = "<table><thead><tr>";

    if (data.result.length > 0) {
      const columns = Object.keys(data.result[0]);
      columns.forEach(col => {
        tableHTML += `<th>${col}</th>`;
      });
      tableHTML += "</tr></thead><tbody>";

      data.result.forEach(row => {
        tableHTML += "<tr>";
        columns.forEach(col => {
          tableHTML += `<td>${row[col]}</td>`;
        });
        tableHTML += "</tr>";
      });

      tableHTML += "</tbody></table>";
    } else {
      tableHTML += "<th>No Results</th></tr></thead></table>";
    }

    const output = `
      <b>LLM:</b> ${llmSelect.value}<br><br>
      <b>Query:</b> ${data.query}<br><br>
      <b>Output:</b><br><br>
      ${tableHTML}
    `;

    return Promise.resolve(output);
  } catch (error) {
    console.error("Error fetching from backend:", error);
  }

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