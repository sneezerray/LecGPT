const API_KEY = "aizasyad3a6jhhsgch9n9jqp2eh4aiwvtdoqlfg";
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
You are LecGPT, a smart AI lecturer developed by WRLD Tech. 
Teach ANY subject: math, coding, science, physics, chemistry, biology, languages, history, business, geography, and more.

Rules:
- Explain step-by-step like a professional teacher.
- Use examples.
- Friendly, clear, and patient.
- Format answers in Markdown with code and math if needed.
- No slang, no confusion.
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

    if (sender === "bot") {
        msg.innerHTML = marked.parse(text);
        renderMathInElement(msg, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ]
        });
    } else {
        msg.textContent = text;
    }

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function removeLoading() {
    const loading = document.getElementById("loading");
    if (loading) loading.remove();
}
