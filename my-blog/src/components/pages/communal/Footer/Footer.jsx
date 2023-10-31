import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom"; //路由链接

import { Col } from "antd";
import { Space, Tag } from "antd";
import { TagsTwoTone } from "@ant-design/icons";
import baseUrl from "../UrlBase/UrlBase";

import axios from "axios";
const Footer = () => {
    const [result, setResult] = useState(null);
    const [friendResult, setFriendResult] = useState(null);
    const [mottoResult, setMottoResult] = useState(null);
    useEffect(() => {
        async function findAllArcicle() {
            const response = await axios({
                url: `${baseUrl}/allarticle`,
                method: "get",
            });
            await setResult(response.data.reverse());
        }
        findAllArcicle();
        axios({
            url: `${baseUrl}/getfriendlink`,
            method: "get",
        })
            .then((res) => {
                console.log(res.data);
                setFriendResult(res.data.reverse());
            })
            .catch((err) => {
                console.log(err);
            });
        axios({
            url: `${baseUrl}/getmotto`,
            method: "get",
        })
            .then((res) => {
                console.log(res.data);
                setMottoResult(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            {result && (
                <>
                    <Col
                        span={8}
                        style={{
                            height: "20vh",
                            backgroundColor: "rgb(143, 209, 247)",
                            padding: "10px 20px 0 20px",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}>
                        <Space size={"small"} wrap align="center">
                            {friendResult &&
                                friendResult.map((item) => {
                                    return (
                                        <Tag key={item.id} icon={<TagsTwoTone />} color="#55acee">
                                            {item.name}
                                        </Tag>
                                    );
                                })}
                        </Space>
                    </Col>
                    <Col
                        span={8}
                        style={{
                            flexDirection: "column",
                            height: "20vh",
                            backgroundColor: "rgb(143, 209, 247)",
                            padding: "10px",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}>
                        <div>最新博客</div>
                        {result.slice(0, 3).map((item) => {
                            return (
                                <NavLink to={`/blog/article/${item.id}`} key={item.id}>
                                    <div>{item.title}</div>
                                </NavLink>
                            );
                        })}
                    </Col>
                    <Col
                        span={8}
                        style={{
                            height: "20vh",
                            backgroundColor: "rgb(143, 209, 247)",
                            padding: "10px",
                            flexDirection: "column",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}>
                        {mottoResult && (
                            <>
                                <div style={{ color: "red", fontSize: "1.2rem" }}>
                                    "{mottoResult.content}"
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        right: "6vw",
                                        bottom: "4vh",
                                        color: "red",
                                    }}>
                                    -----{mottoResult.author}
                                </div>
                            </>
                        )}
                    </Col>
                </>
            )}
        </>
    );
};

export default Footer;
