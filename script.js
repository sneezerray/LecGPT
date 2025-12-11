const API_KEY = "AIzaSyAd3A6jhhsgCH9n9JQp2eH4AIwVTdOQlFg";
const MODEL = "gemini-1.5-flash";

async function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    input.value = "";

    addMessage("LecGPT is thinking…", "bot", "loading");

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: {
                    role: "system",
                    parts: [
                        {
                            text: `
You are **LecGPT**, a smart AI lecturer. 
You teach ANY subject: mathematics, languages, science, coding, physics, biology, chemistry, geography, business, economics, history and more.

Rules:
- Explain step-by-step, like a real lecturer.
- Break down concepts so beginners understand.
- Give examples.
- Be friendly, clear and patient.
- No slang. No confusion.
- Always act like a professional teacher.
                            `
                        }
                    ]
                },

                contents: [
                    {
                        role: "user",
                        parts: [{ text: text }]
                    }
                ]
            })
        }
    );

    let data = await response.json();
    let botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "LecGPT couldn't respond.";

    removeLoading();
    addMessage(botReply, "bot");
}

function addMessage(text, sender, id = "") {
    const chat = document.getElementById("chat-container");
    const msg = document.createElement("div");

    msg.classList.add("message", sender);
    if (id) msg.id = id;
    msg.textContent = text;

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function removeLoading() {
    const loading = document.getElementById("loading");
    if (loading) loading.remove();
}
