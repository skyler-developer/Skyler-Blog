import React, { useState } from "react";
import { Col, Row } from "antd"; //antd栅格化布局组件
import { Button } from "antd"; //底部按钮组件
import { Image } from "antd"; //图像组件
import { NavLink } from "react-router-dom"; //路由链接
import { FieldTimeOutlined, FileTextOutlined, TagOutlined } from "@ant-design/icons"; //图表组件
import "./Content.css";
const Content = ({ contentArrayList }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function judgeKind() {
        switch (contentArrayList.kind) {
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
        <Row className="rowWeight">
            <Col
                sm={{ span: 12, offset: 6 }}
                xs={{ span: 22, offset: 1 }}
                className="col"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "rgb(255,255,255)",
                }}>
                <Row className="firstRow">
                    <Col className="Content-title" span={24}>
                        {contentArrayList.title}
                    </Col>
                </Row>
                <Row justify="space-around" className="secondRow" style={{ display: "flex" }}>
                    <Col key={"time"} span={7} className="Content-littleTitle">
                        <FieldTimeOutlined />
                        {contentArrayList.time}
                    </Col>
                    <Col key={"wordage"} span={7} className="Content-littleTitle">
                        <FileTextOutlined />
                        {contentArrayList.text.length}
                    </Col>
                    <Col key={"type"} span={7} className="Content-littleTitle">
                        <TagOutlined />
                        {judgeKind()}
                    </Col>
                </Row>
                <div className="Content-contentArticle">
                    {contentArrayList.text && contentArrayList.text.substring(0, 200)}
                </div>
                <Image
                    className="Content-img"
                    src={contentArrayList.imageUrl}
                    height={windowWidth < 500 ? 160 : 400}
                />
                <NavLink to={`/blog/article/${contentArrayList.id}`}>
                    <Button type="detailContent" className="Content-detailContent">
                        阅读全文
                    </Button>
                </NavLink>
            </Col>
        </Row>
    );
};

export default Content;
