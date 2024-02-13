import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd"; //antd栅格化布局组件
import { FieldTimeOutlined, FileTextOutlined, TagOutlined } from "@ant-design/icons"; //图表组件
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Prism from "prismjs";
import Header from "../Header/Header";
import MyCard from "../MyCard/MyCard";
import BlinkLoop from "../BlinkLoop/BlinkLoop";
import RemarkAreas from "../RemarkArea/RemarkAreas";
import Footer from "../Footer/Footer";
import WeatherCard from "../WeatherCard/WeatherCard";
import baseUrl from "../../../../axios/baseUrl";

import "./DetailContent.css";
import "prismjs/themes/prism-tomorrow.min.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";

const DetailContent = () => {
    const { id } = useParams();
    const [itemArticle, setItemArticle] = useState(null);
    const windowWith = window.innerWidth;

    useEffect(() => {
        async function getItemArticle() {
            const resultPromise = await axios({
                url: `${baseUrl}/blog/${id}`,
                method: "get",
            });
            setItemArticle(resultPromise.data[0]);
            await setTimeout(() => {
                Prism.highlightAll();
            }, 0);
        }
        getItemArticle();
    }, [id]);

    let activeObj = {};
    function judgeKind(itemArticle) {
        switch (itemArticle.kind) {
            case 1:
                activeObj = { kind: "学习笔记", action: "note" };
                return activeObj;
            case 2:
                activeObj = { kind: "技术杂谈", action: "tittletattle" };
                return activeObj;
            case 3:
                activeObj = { kind: "生活随写", action: "randomwriting" };
                return activeObj;
            default:
                activeObj = { kind: "未知类型", action: "null" };
                return activeObj;
        }
    }

    return (
        itemArticle && (
            <Row>
                <Header
                    headerBackgroundColor={"rgba(102, 196, 251,0.7)"}
                    active={judgeKind(itemArticle).action}
                />
                <Col
                    sm={{ span: 12, offset: 6 }}
                    xs={{ span: 22, offset: 1 }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "rgb(255,255,255)",
                        marginTop: "9vh",
                        marginBottom: "2vh",
                        border: "1px solid rgb(212, 212, 213)",
                        minHeight: "90vh",
                    }}>
                    <Row className="firstRow">
                        <Col className="DetailContent-title" span={24}>
                            {itemArticle.title}
                        </Col>
                    </Row>
                    <Row justify="space-around" className="secondRow" style={{ display: "flex" }}>
                        <Col className="DetailContent-time" key={"time"} span={7}>
                            时间&nbsp;
                            <FieldTimeOutlined />
                            &nbsp;
                            {itemArticle.time}
                        </Col>
                        <Col className="DetailContent-wordage" key={"wordage"} span={7}>
                            字数&nbsp;
                            <FileTextOutlined />
                            &nbsp;
                            {itemArticle.text.length}
                        </Col>
                        <Col className="DetailContent-kind" key={"type"} span={7}>
                            类型&nbsp;
                            <TagOutlined />
                            &nbsp;
                            {judgeKind(itemArticle).kind}
                        </Col>
                    </Row>

                    <div
                        className="contentArticle line-numbers"
                        dangerouslySetInnerHTML={{ __html: itemArticle.content }}
                    />

                    <MyCard />
                    <BlinkLoop />
                </Col>
                {windowWith > 500 && (
                    <Col
                        span={5}
                        offset={1}
                        style={{
                            marginTop: "11vh",
                        }}>
                        <WeatherCard />
                    </Col>
                )}
                <Col span={24} style={{ marginTop: "2vh" }}>
                    <Row>
                        <RemarkAreas relatedArticleId={id} />
                        <Footer />
                    </Row>
                </Col>
            </Row>
        )
    );
};

export default DetailContent;
