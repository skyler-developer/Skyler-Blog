import React, { useState } from "react";
import { Row, Col } from "antd";

import { debounce } from "lodash";
const imgUrl = [
    "https://s2.loli.net/2023/10/31/8gsyzwDRTiu2KB4.webp", //图片一，最左侧
    "https://s2.loli.net/2023/10/29/HUfqIvRj2Vt13Xe.webp", //图片二，中间
    "https://s2.loli.net/2023/10/29/FzrylvXBhpjqODu.webp", //图片三，最右侧
];
const Background = () => {
    const [imageUrl, setImageUrl] = useState(imgUrl[1]);

    const handleMouseMove = debounce((event) => {
        const screenWidth = window.innerWidth; //获取屏幕宽度
        const mouseX = event.clientX; //获取鼠标位置

        //根据鼠标位置切换背景图片
        if (mouseX < screenWidth / 3) {
            setImageUrl(imgUrl[0]);
        } else if (mouseX < (screenWidth / 3) * 2) {
            setImageUrl(imgUrl[1]);
        } else {
            setImageUrl(imgUrl[2]);
        }
    }, 1000); // 设置防抖延迟时间为1秒

    return (
        <Col
            span={24}
            style={{
                backgroundImage: `url(${imageUrl})`,
                height: "100vh",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                transition: "1s",
                zIndex: "1",
            }}
            onMouseMove={handleMouseMove}></Col>
    );
};

export default Background;
