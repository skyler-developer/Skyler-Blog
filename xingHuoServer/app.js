const WebSocket = require("ws");

const xingHuoWebSocket = new WebSocket.Server({ port: 3009 });

const sendMsg = require("./xingHuoReply/xingHuoReply");

xingHuoWebSocket.on("connection", function (answerSocket) {
    console.log("new connection");
    answerSocket.on("message", function (message) {
        sendMsg(message, answerSocket);
    });
});
