import React from "react";
import Header from "../communal/Header/Header"; //顶部导航组件
import TimeLine from "../communal/TimeLine/TimeLine"; //时间线组件
import MyCard from "../communal/MyCard/MyCard"; //卡片组件
import BlinkLoop from "../communal/BlinkLoop/BlinkLoop"; //闪烁字组件
import Footer from "../communal/Footer/Footer";
import { Col, Row } from "antd"; //antd栅格化布局组件

const Trends = () => {
    return (
        <>
            <Header headerBackgroundColor={"rgba(102, 196, 251,0.7)"} active={"trends"} />
            <MyCard />
            <BlinkLoop />
            <Row>
                <TimeLine />
                <Col span={24} style={{ marginTop: "2vh" }}>
                    <Row>
                        <Footer />
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Trends;
