const socket = io("http://13.59.129.27:1510");
const messageContainer = document.getElementById("messageContainer");
const messageForm = document.getElementById("formContainer");
const messageInput = document.getElementById("txtmessage");

const name = prompt("What is your name?");
appendMessage("You joined!");
socket.emit("new-user", name);

socket.on("chat-message", data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", name => {
  appendMessage(`${name} has joined!`);
});

socket.on("user-disconected", name => {
  appendMessage(`${name} has left!`);
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}