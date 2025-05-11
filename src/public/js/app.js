const messageList = document.querySelector("ul");
const nickFrom = document.querySelector("#nick");
const messageFrom = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = { type, payload }
    return JSON.stringify(msg);
}

function handleOpen() {
    console.log("Connected to Server ☆");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ★");
});

function handleSubmit(event) {
    event.preventDefault();
    const input = messageFrom.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `You: ${input.value}`;
    messageList.append(li);
    input.value = '';
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickFrom.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = '';
}

messageFrom.addEventListener('submit', handleSubmit);
nickFrom.addEventListener('submit', handleNickSubmit);