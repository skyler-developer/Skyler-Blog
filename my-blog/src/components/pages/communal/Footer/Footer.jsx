import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom"; //路由链接

import { Col } from "antd";
import { Space, Tag, Divider } from "antd";
import { TagsTwoTone } from "@ant-design/icons";
import baseUrl from "../../../../axios/baseUrl";

import axios from "axios";
import "./Footer.css";

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
                    <Col className="Footer-friendLink" span={8}>
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
                    <Col className="Footer-newBlog" span={8}>
                        <div>最新博客</div>
                        {result.slice(0, 3).map((item) => {
                            return (
                                <NavLink to={`/blog/article/${item.id}`} key={item.id}>
                                    <div>{item.title}</div>
                                </NavLink>
                            );
                        })}
                    </Col>
                    <Col className="Footer-motto" span={8}>
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
                    <div
                        style={{
                            width: "100%",
                            height: "0px",
                            border: "solid 1px rgb(248, 228, 169)",
                        }}></div>
                    <Col
                        span={8}
                        style={{
                            backgroundColor: "rgb(143, 209, 247)",
                            height: "10vh",
                            padding: "10px",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            alignItems: "center",
                            color: "white",
                        }}>
                        Copyright © 2023 SKYLER'S BLOG
                    </Col>

                    <Col
                        span={8}
                        style={{
                            backgroundColor: "rgb(143, 209, 247)",
                            height: "10vh",
                            padding: "10px",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}>
                        <a href="https://beian.miit.gov.cn" target="blank">
                            豫ICP备2023029430号
                        </a>
                    </Col>
                    <Col
                        span={8}
                        style={{
                            backgroundColor: "rgb(143, 209, 247)",
                            height: "10vh",
                            padding: "10px",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            alignItems: "center",
                            color: "white",
                        }}>
                        本网站由又拍云提供云存储服务
                    </Col>
                </>
            )}
        </>
    );
};

export default Footer;
