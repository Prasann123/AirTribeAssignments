const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const { v4: uuidv4 } = require("uuid");
const socketio = require("socket.io");
const { formatMessage } = require("./utils/messages");
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const {
    userJoin,
    getCurrentUser,
    userRemove,
    getRoomUsers,
    findUserByUserId
} = require("./utils/users");
const io = socketio(server);
const botName = "ChatCord";
// establish the websocket connection
io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
        const userId = uuidv4();
        const user = userJoin(userId, socket.id, username, room);
        socket.join(user.room);
        socket.emit(
            "message",
            formatMessage(botName, "welcome to chatcord"),
            user.userid
        );
        // this broadcast to everyone excluding me
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                formatMessage(
                    botName,
                    `${user.username} has joined the chat`,
                    user.userid
                )
            );

        io.to(user.room).emit("roomusers", {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
    socket.on("initiatePrivateChat", (data) => {
        const user = getCurrentUser(socket.id);
        const targetUser = findUserByUserId(data.uuid, user.room);
        // Retrieve the target user's ID from the data object
        const targetUserId = data.targetUserId;

        if (!user || !targetUser) {
            socket.emit("error", "User not found");
            return;
        }
        const privateChatRoomName = `private_${user.id}_${targetUser.id}`;

        // Join both sender and targetUser to the private chat room
        socket.join(privateChatRoomName);
        io.to(targetUser.socketId).emit("joinPrivateChat", privateChatRoomName); // Notify targetUser

        socket.emit("privateMessage", {
            senderUsername: botName,
            message: `You are now in a private chat with ${targetUser.username}`
        });
    });
    socket.on("privatemessage", (data) => {
        const user = getCurrentUser(socket.id);
        const targetUser = findUserByUserId(data.uuid, user.room);
        if (targetUser) {
            // Emit the private message to the target user's socket
            io.to(privateChatRoomName).emit("privateMessage", {
                senderUsername: user.username,
                message: data.message
            });
        } else {
            // Handle user not found
            socket.emit("error", "User not found");
        }
    });
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    //runs when client disconnects
    socket.on("disconnect", () => {
        const user = userRemove(socket.id);

        if (user) {
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the chat`)
            );

            io.to(user.room).emit("roomusers", {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
