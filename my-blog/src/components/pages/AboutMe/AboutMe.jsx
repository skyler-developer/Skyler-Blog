import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Col, Row } from "antd"; //antd栅格化布局组件
import BlinkLoop from "../communal/BlinkLoop/BlinkLoop";
import Header from "../communal/Header/Header";
import MyCard from "../communal/MyCard/MyCard";
import RemarkAreas from "../communal/RemarkArea/RemarkAreas";
import Footer from "../communal/Footer/Footer";
import WeatherCard from "../communal/WeatherCard/WeatherCard";
import baseUrl from "../../../axios/baseUrl";


export default function AboutMe() {
    const [contentStr, setContentStr] = useState(" ");
    useEffect(() => {
        async function getContentAboutMe() {
            const req = await axios({
                url: `${baseUrl}/aboutme`,
                method: "get",
            });
            const temp = req.data[0].aboutMeHtml;
            setContentStr(temp);
        }
        getContentAboutMe();
    }, []);
    return (
        <>
            <Header headerBackgroundColor={"rgba(102, 196, 251,0.7)"} active={"about"} />

            <MyCard />
            <Row>
                <Col
                    span={12}
                    offset={6}
                    style={{
                        backgroundColor: "rgb(255,255,255)",
                        marginTop: "9vh",
                        marginBottom: "2vh",
                        border: "1px solid rgb(212, 212, 213)",
                        minHeight: "100vh",
                    }}>
                    <div
                        style={{
                            backgroundColor: "rgb(255,255,255)",
                            height: "90%",
                            width: "90%",
                            padding: "5%",
                        }}>
                        <h1
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "3vh",
                                height: "10vh",
                            }}>
                            关于帅气的Skyler
                        </h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: contentStr }}
                            style={{ fontSize: "1vw", lineHeight: "5vh", letterSpacing: "3px" }}
                        />
                    </div>
                    <BlinkLoop />
                </Col>
                <Col
                    span={5}
                    offset={1}
                    style={{
                        marginTop: "11vh",
                    }}>
                    <WeatherCard />
                </Col>
                <Col span={24}>
                    <Row>
                        <RemarkAreas relatedArticleId={0} />
                        <Footer />
                    </Row>
                </Col>
            </Row>
        </>
    );
}
