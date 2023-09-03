const moment = require("moment");

function formatMessage(userName, text, userid) {
    return {
        userName,
        text,
        time: moment().format("h:mm a"),
        userid
    };
}

module.exports = { formatMessage };
