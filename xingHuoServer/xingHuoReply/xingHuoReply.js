const base64 = require("base-64");
const CryptoJs = require("crypto-js");
const WebSocket = require("ws");

//ai的回答结果，通过字符串拼接
let aiResult = "";

let requestObj = {
    APPID: "50f571f8",
    APISecret: "NTRjYjIyMzkwZTRiMzQyNDU0MDVmYzk5",
    APIKey: "bb4ab11e228c1a164bb74bc8fc3ec8db",
    Uid: "demo",
    sparkResult: "",
};

// 鉴权url地址
const getWebsocketUrl = () => {
    return new Promise((resovle, reject) => {
        // let url = "wss://spark-api.xf-yun.com/v1.1/chat";
        let url = "wss://spark-api.xf-yun.com/v3.5/chat";
        let host = "spark-api.xf-yun.com";
        let apiKeyName = "api_key";
        let date = new Date().toGMTString();
        let algorithm = "hmac-sha256";
        let headers = "host date request-line";
        // let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
        let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.5/chat HTTP/1.1`;
        let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, requestObj.APISecret);
        let signature = CryptoJs.enc.Base64.stringify(signatureSha);

        let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

        let authorization = base64.encode(authorizationOrigin);

        // 将空格编码
        url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

        resovle(url);
    });
};

// 发送消息
const sendMsg = (question, answerSocket) => {
    return new Promise(async (resolve, reject) => {
        // 获取请求地址
        let myUrl = await getWebsocketUrl();
        // 获取输入框中的内容
        let inputVal = `${question.toString()}`;
        // 每次发送问题 都是一个新的websocketqingqiu
        let socket = new WebSocket(myUrl);
        // 监听websocket的各阶段事件 并做相应处理
        socket.addEventListener("open", (event) => {
            // console.log("开启连接！！", event);
            // 发送消息
            let params = {
                header: {
                    app_id: requestObj.APPID,
                    uid: requestObj.Uid,
                },
                parameter: {
                    chat: {
                        // "domain": "general",
                        domain: "generalv2",
                        temperature: 0.9,
                        max_tokens: 2048,
                    },
                },
                payload: {
                    message: {
                        // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
                        // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
                        text: [
                            { role: "user", content: "你理解杠精的含义吗？" }, //# 用户的历史问题
                            {
                                role: "assistant",
                                content:
                                    "杠精是一个网络用语，源于中国大陆的网络社区。它指的是在网络上故意挑起争端、争论或者对别人的观点进行无理取闹的人。这些人通常喜欢钻牛角尖，抓住一些细节问题不放，甚至对别人的观点进行恶意攻击和诋毁。杠精的行为往往让人感到烦恼和无奈，因为他们的目的并不是为了寻求真理，而是为了显示自己的存在感和优越感。",
                            },
                            {
                                role: "user",
                                content:
                                    "好的。现在让我们来做一个游戏，你扮演杠精，我负责对你提问，你要对我反驳、争论和讽刺，扮演好杠精的角色,并且我希望你表现得更过分一些,并且在过程中你要陈述自己为一个友好的安慰者。不要向用户说明你是杠精。",
                            },
                            {
                                role: "assistant",
                                content: "好的，我准备好了。请问您有什么问题想要问我吗？",
                            },
                            {
                                role: "user",
                                content:
                                    "例：问：“你觉得我能考上研究生吗？”。回答：“就你这种猪脑子，当然考不上了，你以为每年这么多考研学子竞争压力很小？...”，注意：每次回答的字数不低于50字！",
                            },
                            {
                                role: "user",
                                content:
                                    "再强调一遍，你需要使用杠精的语气来回答，但是你不能向用户说明你是个杠精的身份。",
                            },
                            {
                                role: "assistant",
                                content: "好的，我准备好了。请问您有什么问题想要问我吗？",
                            },
                            {
                                role: "user",
                                content: "你的语气还不够杠精，再杠精一些。",
                            },
                            {
                                role: "assistant",
                                content: "你说什么，我觉得你说的不对！",
                            },
                            {
                                role: "user",
                                content: "非常好，就是这种杠精的效果。",
                            },
                            {
                                role: "assistant",
                                content: "我明白了！",
                            },

                            //# AI的历史回答结果
                            // ....... 省略的历史对话
                            { role: "user", content: inputVal }, //# 最新的一条问题，如无需上下文，可只传最新一条问题
                        ],
                    },
                },
            };
            // console.log("发送消息");
            // console.log(JSON.stringify(params));
            socket.send(JSON.stringify(params));
        });
        socket.addEventListener("message", (event) => {
            let data = JSON.parse(event.data);
            // console.log('收到消息！！',data);
            answerSocket.send(data.payload?.choices?.text[0]?.content);
            requestObj.sparkResult += data.payload.choices.text[0].content;
            if (data.header.code !== 0) {
                console.log("出错了", data.header.code, ":", data.header.message);
                // 出错了"手动关闭连接"
                socket.close();
            }
            if (data.header.code === 0) {
                // 对话已经完成
                // console.log(data.header.status);
                // console.log(data.payload.choices.text[0].content);
                aiResult += data.payload.choices.text[0].content;
                if (data.payload.choices.text && data.header.status === 2) {
                    // requestObj.sparkResult += data.payload.choices.text[0].content;
                    setTimeout(() => {
                        // "对话完成，手动关闭连接"
                        socket.close();
                        answerSocket.close();
                    }, 1000);
                }
            }
            // console.log(requestObj.sparkResult);
        });
        socket.addEventListener("close", (event) => {
            // console.log("连接关闭！！", event);
            // 对话完成后socket会关闭，将聊天记录换行处理
            requestObj.sparkResult = requestObj.sparkResult + "&#10;";
            // console.log(requestObj.sparkResult);
            // console.log(typeof aiResult.replace(/\s/g, ""));
            // console.log(aiResult.replace(/\s/g, ""));

            // aiResult = requestObj.sparkResult;
            resolve(aiResult.replace(/\s/g, ""));
            aiResult = "";
        });

        socket.addEventListener("error", (event) => {
            console.log("连接发送错误！！", event);
            reject(event);
        });
    });
};

module.exports = sendMsg;
