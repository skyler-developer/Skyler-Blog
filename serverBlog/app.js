const express = require("express");

const jwt = require("jsonwebtoken");

const WebSocket = require("ws");

//设置cookie中间件
const cookieParser = require("cookie-parser");

const util = require("util");

const app = express(); //创建express的示例

const xingHuoWebSocket = new WebSocket.Server({ port: 3008 });
//解决跨域问题
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(cookieParser());

const getNowTime = require("./communal/nowTime/nowTime"); //获取日期

const sendMsg = require("./communal/xingHuoReply/xingHuoReply"); //讯飞星火API

const db = require("./database/index"); //数据库配置

const secretKey = "skyler"; //用于签名 JWT 的密钥，确保 JWT 没有被篡改

//解析json中间件
app.use(express.json({ limit: "50mb" }));
//路由中间件
const router = express.Router();

// 允许浏览器获取以下两个特殊字段
function setHeaderAllow(req, res, next) {
    res.setHeader("Access-Control-Expose-Headers", "Authorization, RefreshToken");
    next();
}

router.post("/login", setHeaderAllow, function (req, res) {
    const { username, password } = req.body;
    console.log(util.inspect(req.body, { showHidden: false, depth: null }));
    const sqlFind = "select * from user where username = ? and password = ?";
    db.query(sqlFind, [username, password], function (err, result) {
        if (err) {
            return res.status(400).send({ message: "输入信息有误！" });
        }
        if (result.length === 0) {
            return res.status(408).send({ message: "用户名或密码错误！" });
        }

        const token = jwt.sign({ username }, secretKey, {
            expiresIn: "60s",
        });
        const freshToken = jwt.sign({ username }, secretKey, {
            expiresIn: "1h",
        });

        res.setHeader("Authorization", `${token}`);
        res.setHeader("RefreshToken", `${freshToken}`);

        res.status(200).send("receive");
    });
});

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(200).json({
                code: 401,
                message: "Invalid token(token过期或失效)",
            });
            return;
        } else {
            req.user = decoded;
            console.log(decoded);
            next();
        }
    });
}

router.get("/getuser", verifyToken, function (req, res) {
    res.status(200).send("Already logged in");
});

router.get("/freshtoken", setHeaderAllow, verifyToken, function (req, res) {
    const token = jwt.sign({ username: "skyler" }, secretKey, {
        expiresIn: "60s",
    });
    const freshToken = jwt.sign({ username: "skyler" }, secretKey, {
        expiresIn: "1h",
    });

    res.setHeader("Authorization", `${token}`);
    res.setHeader("RefreshToken", `${freshToken}`);
    res.status(200).send({
        code: 201,
        message: "token已刷新",
    });
});

//savearticle post请求，管理系统发布文章
router.post("/savearticle", verifyToken, function (req, res) {
    const sqlInsert = "insert into article set ?";
    db.query(
        sqlInsert,
        {
            content: req.body.content,
            title: req.body.title,
            kind: req.body.type,
            text: req.body.text,
            time: getNowTime().formattedDateTime,
            timestamp: getNowTime().timestamp,
            imageUrl: req.body.img,
        },
        function (err, result) {
            if (err) {
                return res.status(400).send({ message: "输入信息有误！" });
            }
            if (result.affectedRows !== 1) {
                return res.status(408).send({ message: "保存文章失败，请稍后再试" });
            }
            res.status(200).send({ message: "保存文章成功" });
        },
    );
});

//获取种类文章信息
router.get("/article/:kind", function (req, res) {
    const kind = req.params.kind; // 从请求的 URL 参数中获取 kind 的值

    const sqlFind = "select * from article where kind = ?";
    db.query(sqlFind, [kind], function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//获取全部文章信息
router.get("/allarticle", function (req, res) {
    const sqlFind = "select * from article";
    db.query(sqlFind, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//获取单个文章信息
router.get("/blog/:id", function (req, res) {
    const id = req.params.id;
    const sqlFind = "SELECT * FROM article WHERE ID = ?";
    db.query(sqlFind, [id], function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//删除单个文章
router.get("/deleteblog/:id", function (req, res) {
    const id = req.params.id;
    const sqlDelete = "delete from article where article.id  = ?";
    db.query(sqlDelete, [id], function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//修改单个文章
router.post("/modifyblog/:id", function (req, res) {
    const id = req.params.id;
    const modifySql =
        "UPDATE article SET content = ?, text = ?, imageUrl = ?, kind = ?, title = ? WHERE id = ?";
    console.log(req.body);
    db.query(
        modifySql,
        [req.body.content, req.body.text, req.body.img, req.body.kind, req.body.title, id],
        function (err, result) {
            if (err) {
                return err;
            }
            res.send(result);
        },
    );
});

//获取“关于我”页面的富文本内容
router.get("/aboutme", function (req, res) {
    const sqlFindMaxId = "SELECT * FROM aboutme ORDER BY id DESC LIMIT 1";
    db.query(sqlFindMaxId, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//保存“关于我”页面的富文本内容
router.post("/saveaboutme", function (req, res) {
    const sqlAddAboutme = "insert into aboutme set ?";
    db.query(
        sqlAddAboutme,
        {
            aboutMeHtml: req.body.aboutMeHtml,
            text: req.body.text,
            time: getNowTime().formattedDateTime,
            timestamp: getNowTime().timestamp,
        },
        function (err, result) {
            if (err) {
                return res.send("错误处理" + err);
            }
            res.send("已经成功处理" + result);
        },
    );
});

//保存评论内容
router.post("/saveremark", function (req, res) {
    const sqlSaveRemark = "insert into remark set ?";
    db.query(
        sqlSaveRemark,
        {
            content: req.body.content,
            relatedArticles: req.body.relatedArticles,
            userId: req.body.userId,
            time: getNowTime().formattedDateTime,
            userEmail: req.body.userEmail,
            timeStamp: getNowTime().timestamp,
            deep: req.body.deep,
            priorUserId: req.body.priorUserId,
            priorRemarkId: req.body.priorRemarkId,
            topRemarkId: req.body.topRemarkId,
        },
        function (err, result) {
            if (err) {
                return res.send("错误处理" + err);
            } else {
                res.cookie("userId", req.body.userId, {
                    expires: new Date(Date.now()),
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: false,
                });
                if (req.body.userEmail) {
                    res.cookie("userEmail", req.body.userEmail, {
                        expires: new Date(Date.now()),
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        httpOnly: false,
                    });
                }
                res.send("已经成功处理" + result);
            }
        },
    );
});

//获取关联文章评论信息
router.get("/remark/:id", function (req, res) {
    const id = req.params.id;
    const sqlFind = "SELECT * FROM remark WHERE relatedArticles = ?";
    db.query(sqlFind, [id], function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//获取全部评论信息
router.get("/allremark", function (req, res) {
    const sql = "select * from remark";
    db.query(sql, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//根据remaekId删除评论
router.get("/deleteremark/:id", function (req, res) {
    const id = req.params.id;
    const sql = "delete from remark where remark.remarkId = ?";
    db.query(sql, [id], function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//获取地址信息
router.get("/address", function (req, res) {
    const sqlFind = "SELECT citymessage.name ,citymessage.adcode FROM citymessage";
    db.query(sqlFind, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//获取友情链接信息
router.get("/getfriendlink", function (req, res) {
    const sqlGetFriendLink = "SELECT * FROM friendlink";
    db.query(sqlGetFriendLink, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//删除友情链接信息
router.get("/deletefriendlink", function (req, res) {
    const sqlDeleteFriendLink = `delete from friendlink where  friendlink.id = ${req.query.id}`;
    db.query(sqlDeleteFriendLink, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//添加友情链接信息
router.post("/addfriendlink", function (req, res) {
    const sqlAddFriendLink = `insert into friendlink(name) values  (?)`;
    db.query(sqlAddFriendLink, [req.body.name], function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

let xingHuoReplyResult = "";
async function xingHuoAnswer(question) {
    try {
        xingHuoReplyResult = await sendMsg(question);
        console.log(xingHuoReplyResult);
    } catch (error) {
        console.error(error);
    }
}
//AI提问信息
router.post("/aireply", async function (req, res) {
    console.log(req.body);
    await xingHuoAnswer(req.body.question);
    await res.send(xingHuoReplyResult);
});

//搜索文章信息
router.post("/search", function (req, res) {
    const sqlSearch = `select * from article where article.text like '%${req.body.keyword}%'`;
    db.query(sqlSearch, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//获取底部座右铭信息
router.get("/getmotto", function (req, res) {
    const sql = "select * from motto";
    db.query(sql, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

//修改底部座右铭信息
router.post("/modifymotto", function (req, res) {
    const sql = "update motto set content = ?, author = ?";
    db.query(sql, [req.body.content, req.body.author], function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

app.use("/api", router);

xingHuoWebSocket.on("connection", function (answerSocket) {
    console.log("new connection");
    answerSocket.on("message", function (message) {
        sendMsg(message, answerSocket);
    });
});

app.listen(3007, function () {
    console.log("api server running at http://127.0.0.1:3007");
});
