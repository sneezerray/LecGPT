let gpt = null;

// Initialize GPT4All
async function initGPT() {
    gpt = new GPT4AllBrowser();
    await gpt.loadModel('models/gpt4all-lora-quantized.bin'); // local model path
    console.log("LecGPT ready!");
}
initGPT();

async function sendMessage() {
    const input = document.getElementById("user-input");
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, "user");
    input.value = "";

    try {
        const answer = await gpt.predict(question);
        addMessage(answer, "bot");
    } catch (err) {
        addMessage("LecGPT couldn't respond. Try again later.", "bot");
        console.error(err);
    }
}

function addMessage(text, sender) {
    const container = document.getElementById("chat-container");
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerHTML = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}