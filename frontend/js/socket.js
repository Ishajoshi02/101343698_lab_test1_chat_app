const socket = io("http://localhost:5000");
let currentRoom = "";

function joinRoom() {
    const room = document.getElementById("roomSelect").value;
    socket.emit("joinRoom", room);
    currentRoom = room;
    document.getElementById("chat-box").innerHTML = "";
}

function sendMessage() {
    const message = document.getElementById("messageInput").value;
    const username = localStorage.getItem("username");

    if (message.trim() !== "") {
        socket.emit("chatMessage", { from_user: username, room: currentRoom, message });

        // Display the sent message
        document.getElementById("chat-box").innerHTML += `<p><strong>${username}:</strong> ${message}</p>`;
        document.getElementById("messageInput").value = "";
    }
}

socket.on("message", (data) => {
    document.getElementById("chat-box").innerHTML += `<p><strong>${data.from_user}:</strong> ${data.message}</p>`;
});

function typing() {
    socket.emit("typing", currentRoom);
}

socket.on("typing", (user) => {
    document.getElementById("typingIndicator").innerText = `${user} is typing...`;
    setTimeout(() => document.getElementById("typingIndicator").innerText = "", 2000);
});
