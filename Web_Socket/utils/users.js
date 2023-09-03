const users = [];

//join user to chat
function userJoin(uuid, id, username, room) {
    const user = { id, username, room, uuid };

    users.push(user);

    return user;
}

function getCurrentUser(id) {
    return users.find((user) => user.id === id);
}

function getCurrentUserUuid(username) {
    const user = users.find((user) => user.username === username);
    return user[0].uuid;
}
function findUserByUserId(userId, room) {
    return Object.values(users).find(
        (user) => user.userId === userId && user.room === room
    );
}

// User leaves chat, removing user from array

function userRemove(id) {
    const userId = users.findIndex((user) => user.id === id);
    if (userId !== -1) {
        return users.splice(userId, 1)[0];
    }
}

//Get users from Room

function getRoomUsers(room) {
    return users.filter((user) => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userRemove,
    getRoomUsers,
    findUserByUserId,
    getCurrentUserUuid
};
