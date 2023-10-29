const mysql = require("mysql");
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "blogsql",
    charset: "UTF8MB4_UNICODE_CI",
});
db.getConnection((err, connection) => {
    if (err) {
        console.error("Failed to connect to database:", err);
        return;
    }
    console.log("Connected to the database");

    // 进行数据库操作...

    connection.release(); // 释放连接到连接池中
});
module.exports = db;
