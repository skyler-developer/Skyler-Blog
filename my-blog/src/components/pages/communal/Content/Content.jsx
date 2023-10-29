import React from "react";
import { Col, Row } from "antd"; //antd栅格化布局组件
import { Button } from "antd"; //底部按钮组件
import { Image } from "antd"; //图像组件
import { NavLink } from "react-router-dom"; //路由链接
import { FieldTimeOutlined, FileTextOutlined, TagOutlined } from "@ant-design/icons"; //图表组件
import "./Content.css";
const Content = ({ contentArrayList }) => {
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
                span={12}
                offset={6}
                className="col"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "rgb(255,255,255)",
                }}>
                <Row className="firstRow">
                    <Col
                        span={24}
                        style={{
                            // backgroundColor: "pink",
                            color: "black",
                            fontSize: "2vw",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        {contentArrayList.title}
                    </Col>
                </Row>
                <Row justify="space-around" className="secondRow" style={{ display: "flex" }}>
                    <Col
                        key={"time"}
                        span={7}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <FieldTimeOutlined />
                        {contentArrayList.time}
                    </Col>
                    <Col
                        key={"wordage"}
                        span={7}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <FileTextOutlined />
                        {contentArrayList.text.length}
                    </Col>
                    <Col
                        key={"type"}
                        span={7}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <TagOutlined />
                        {judgeKind()}
                    </Col>
                </Row>
                <div className="contentArticle" style={{ fontSize: "1vw" }}>
                    {contentArrayList.text && contentArrayList.text.substring(0, 200)}
                </div>
                <Image
                    src={contentArrayList.imageUrl}
                    style={{
                        padding: "10px",
                        // backgroundColor: "pink",
                        display: "block",
                        height: "50vh",
                        objectFit: "cover",
                    }}
                />
                <NavLink to={`/blog/article/${contentArrayList.id}`}>
                    <Button
                        type="detailContent"
                        style={{
                            backgroundColor: "rgb(148, 214, 252)",
                            margin: "20px auto",
                            display: "block",
                            textAlign: "center",
                            height: "50px",
                        }}>
                        阅读全文
                    </Button>
                </NavLink>
            </Col>
        </Row>
    );
};

export default Content;
