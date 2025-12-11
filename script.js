let gpt = null;

async function initGPT() {
    gpt = new GPT4AllBrowser();
    await gpt.loadModel('gpt4all-lora-quantized.bin'); // host locally in project folder
    console.log("LecGPT ready!");
}
initGPT();

async function sendMessage() {
    const input = document.getElementById("user-input");
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, "user");
    input.value = "";

    const answer = await gpt.predict(question);
    addMessage(answer, "bot");
}

function addMessage(text, sender) {
    const container = document.getElementById("chat-container");
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerHTML = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}