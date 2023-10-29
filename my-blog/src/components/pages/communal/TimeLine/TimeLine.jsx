import React from "react";
import { NavLink } from "react-router-dom"; //路由链接
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "antd"; //antd栅格化布局组件
import axios from "axios";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./TimeLine.css";

const LinePot = () => {
    const [result, setResult] = useState(null);
    useEffect(() => {
        async function findAllArcicle() {
            const response = await axios({
                url: "http://127.0.0.1:3007/api/allarticle",
                method: "get",
            });
            await setResult(response.data.reverse());
        }
        findAllArcicle();
    }, []);
    function judgeKind(item) {
        switch (item.kind) {
            case 1:
                return "学习笔记";
            case 2:
                return "技术杂谈";
            case 3:
                return "生活随写";
            default:
                return "未知类型";
        }
    }
    return (
        <>
            {result &&
                result.map((item) => {
                    return (
                        <div className="entry" key={item.id}>
                            <div className="title">
                                <h3>{item.time}</h3>
                            </div>
                            <div className="body">
                                <p>
                                    <NavLink to={`/blog/article/${item.id}`}>{item.title}</NavLink>
                                </p>
                                <ul>
                                    <li>{judgeKind(item)}</li>
                                </ul>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

const TimeLine = () => {
    return (
        <>
            {" "}
            <Col
                span={12}
                offset={6}
                style={{
                    backgroundColor: "rgb(255,255,255)",
                    marginTop: "9vh",
                    marginBottom: "2vh",
                    border: "1px solid rgb(212, 212, 213)",
                    // minHeight: "100vh",
                }}>
                <div className="outside">
                    <div className="timeline">
                        <LinePot />
                    </div>
                </div>
            </Col>
            <Col
                span={5}
                offset={1}
                style={{
                    marginTop: "11vh",
                }}>
                <WeatherCard />
            </Col>
        </>
    );
};

export default TimeLine;
