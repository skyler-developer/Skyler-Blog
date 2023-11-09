import React from "react";
import { Card } from "antd";
import { Collapse } from "antd";

const { Meta } = Card;
const MyCard = () => {
    const onChange = (key) => {
        console.log(key);
    };
    const text = `吃吃吃吃吃吃`;
    const items = [
        {
            key: "1",
            label: "最喜欢的事情",
            children: <p>{text}</p>,
        },
    ];
    return (
        <Card
            hoverable
            style={{
                width: "15vw",
                position: "fixed",
                top: "15vh",
                left: "9vw",
            }}
            actions={[
                <a href="https://music.163.com/#/user/home?id=417690617">
                    <img
                        alt="wangYiYunIcon"
                        src="http://www.skyler.fun/wangYiYun.png"
                        style={{ width: "30px", height: "30px" }}
                    />
                </a>,
                <a href="https://gitee.com/laihuizhou">
                    <img
                        alt="giteeIcon"
                        src="http://www.skyler.fun/gitee.png"
                        style={{ width: "30px", height: "30px" }}
                    />
                </a>,
                <a href="https://blog.csdn.net/qq_61047719">
                    <img
                        alt="csdnIcon"
                        src="http://www.skyler.fun/csdn.png"
                        style={{ width: "30px", height: "30px" }}
                    />
                </a>,
            ]}
            cover={<img alt="headPhoto" src="http://www.skyler.fun/headPhoto.png" />}>
            <Meta title="Skyler" description="菜鸟也有进大厂的梦" />
            <br />
            <Collapse items={items} defaultActiveKey={["0"]} onChange={onChange} size="small" />
        </Card>
    );
};

export default MyCard;
