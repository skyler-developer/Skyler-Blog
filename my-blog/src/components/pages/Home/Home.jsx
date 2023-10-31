import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import { Row, Col } from "antd";

import Header from "../communal/Header/Header";
import Background from "../communal/Background/Background";
import WaveLineUp from "../communal/WaveLineUp/WaveLineUp";
import Footer from "../communal/Footer/Footer";
import BlinkLoop from "../communal/BlinkLoop/BlinkLoop";
import Paging from "../communal/Paging/Paging";
import Content from "../communal/Content/Content";
import MyCard from "../communal/MyCard/MyCard";
import { Button, Input, Select, Space, Spin } from "antd";
import baseUrl from "../communal/UrlBase/UrlBase";

const { Search } = Input;
const { TextArea } = Input;
export default function Home() {
    const [contentArray, setContentArray] = useState(null);
    const [newContentArray, setNewContentArray] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [userQuestion, setUserQuestion] = useState(null);
    const [xingHuoReply, setXingHuoReply] = useState(null);
    const pageOnChange = (number) => {
        setPageNumber(number);
    };

    useEffect(() => {
        axios({
            url: `${baseUrl}/allarticle`,
            method: "get",
        })
            .then((content) => {
                const contentArray = content.data;
                setContentArray(contentArray.reverse());
                setNewContentArray(
                    contentArray.slice((pageNumber - 1) * 5, (pageNumber - 1) * 5 + 5),
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pageNumber]);
    const handleChange = (event) => {
        console.log(event.target.value);
        setUserQuestion(event.target.value);
    };

    const handelClick = () => {
        setXingHuoReply("等待回复中......请耐心等候......");
        axios({
            method: "post",
            url: `${baseUrl}/aireply`,
            data: {
                question: userQuestion,
            },
        }).then((res) => {
            console.log(res);
            setXingHuoReply(res.data);
        });
    };

    return (
        <>
            <Row style={{ zIndex: "999" }}>
                <Header active={"homePage"} />
                <Background />
                <BlinkLoop />
                <Col span={24} style={{ backgroundColor: "rgb(239, 239, 239)", zIndex: "999" }}>
                    <WaveLineUp />
                </Col>
                <Col
                    span={12}
                    offset={6}
                    style={{
                        backgroundColor: "rgb(255, 255, 255)",
                        minHeight: "50vh",
                        marginTop: "20vh",
                        padding: "2vw",
                        borderRadius: "1vw",
                    }}>
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.3rem",
                            margin: "2vh auto",
                        }}>
                        "治愈心情”AI智能问答
                    </div>
                    <TextArea
                        rows={4}
                        placeholder="在此输入你的问题"
                        // maxLength={6}
                        // disabled={true
                        onChange={handleChange}
                        style={{ width: "40vw", marginRight: "1vw" }}
                    />
                    <Button type="primary" style={{ width: "4vw" }} onClick={handelClick}>
                        提问
                    </Button>
                    <div
                        style={{
                            margin: "5vh 0",
                            minHeight: "30vh",
                            padding: "10px 20px",
                            border: "solid 1px rgb(64, 150, 255)",
                            fontSize: "1.2rem",
                            borderRadius: "5px",
                            fontFamily: "HYLeMiaoTi,STXinwei,Microsoft JhengHei",
                        }}>
                        {xingHuoReply}
                    </div>
                </Col>

                {newContentArray && (
                    <Col span={24} style={{ height: "500px" }}>
                        {newContentArray.map((item) => {
                            return <Content key={item.id} contentArrayList={item} />;
                        })}
                        <Row>
                            <Col
                                span={12}
                                offset={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: "3vh",
                                }}>
                                <Paging
                                    pageOnChange={pageOnChange}
                                    contentTotal={contentArray.length}
                                />
                            </Col>
                            <Footer />
                        </Row>
                    </Col>
                )}
            </Row>
            <MyCard />
        </>
    );
}
