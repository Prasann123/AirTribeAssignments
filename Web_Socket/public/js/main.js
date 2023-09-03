const socket = io();
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const pvtChat = document.getElementById("private-message-button");
const startPrivateChatButton = document.getElementById("start-private-chat");
const privateChatContainer = document.getElementById("private-chat");

let selectedUserItem = null;
// get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit("joinRoom", { username, room });

socket.on("roomusers", ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});
// socket.on is used for recieving message and this message recieved is from server
socket.on("message", (message) => {
    // console.log(message);
    outputMessage(message);

    //makes always scroll to bottom when scroll is enabled with  messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

pvtChat.addEventListener("click", () => {
    e.preventDefault();
    socket.emit("privateMessage", {
        targetUserId: targetUserId,
        message: messageContent
    });
});
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;

    //Emits message to server
    socket.emit("chatMessage", msg);

    //Clear Input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

function showPrivateChatUI() {
    privateChatContainer.style.display = "block";
}

// Function to hide the private chat UI
function hidePrivateChatUI() {
    privateChatContainer.style.display = "none";
}

startPrivateChatButton.addEventListener("click", () => {
    // Toggle the visibility of the private chat UI
    console.log("start private chat");
    if (privateChatContainer.style.display === "none") {
        showPrivateChatUI();
    } else {
        hidePrivateChatUI();
    }
});
//Output message to DOM

function outputMessage(message) {
    console.log(message);
    //creating a div
    const div = document.createElement("div");
    // classname of above div
    div.classList.add("message");
    //creating paragraph element
    const p = document.createElement("p");
    // assigning classname to paragraph element
    p.classList.add("meta");
    //passing the username into paragraph innertext
    p.innerText = message.userName;
    p.setAttribute("data-user-id", message.userId);
    //passing the time into paragraph innerhtml with span tag
    p.innerHTML += `<span>${message.time}</span>`;
    //insert paragraph into created div
    div.appendChild(p);
    const para = document.createElement("p");
    para.classList.add("text");
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector(".chat-messages").appendChild(div);
}

function enableStartPrivateChatButton() {
    startPrivateChatButton.removeAttribute("disabled");
}
function disableStartPrivateChatButton() {
    startPrivateChatButton.setAttribute("disabled", true);
}
//add room name DOM

function outputRoomName(room) {
    roomName.innerText = room;
}

// add users to left panel users chat room list

function outputUsers(users) {
    userList.innerHTML = ""; // Clear the existing list

    users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = user.username;
        listItem.setAttribute("data-user-id", user.uuid);
        userList.appendChild(listItem);

        // Attach an onClick event listener to each user item for private chat
        listItem.addEventListener("click", (e) => {
            const user = users.find((user) => user.username === username);
            if (selectedUserItem) {
                selectedUserItem.classList.remove("selected");
            }
            const selectedUser = e.currentTarget.getAttribute("data-user-id");
            console.log(selectedUser);
            console.log(user.uuid);
            if (selectedUser === user.uuid) return;
            e.currentTarget.classList.add("selected");
            enableStartPrivateChatButton();
            showPrivateChatUI();

            socket.emit("initiatePrivateChat", { targetUserId: selectedUser });
            selectedUserItem = e.currentTarget;
            // startPrivateChat(user.username);
        });
    });
}
