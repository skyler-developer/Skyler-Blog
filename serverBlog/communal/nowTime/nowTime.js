const moment = require("moment"); //获取日期

const getNowTime = () => {
    const now = moment(); //获取当前时间
    const formattedDateTime = now.format("YYYY-MM-DD HH:mm:ss");
    const timestamp = now.valueOf(); //时间戳

    const nowTime = {
        formattedDateTime: formattedDateTime,
        timestamp: timestamp,
    };

    return nowTime;
};

module.exports = getNowTime;
