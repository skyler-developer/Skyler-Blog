import React from "react";
import Header from "../../communal/Header/Header"; //顶部导航
import Content from "../../communal/Content/Content"; //导入文章内容组件
import { useEffect } from "react"; //组件渲染完成之后，使用effect获取数据，进行渲染
import MyCard from "../../communal/MyCard/MyCard";
import BlinkLoop from "../../communal/BlinkLoop/BlinkLoop";
import Paging from "../../communal/Paging/Paging";
import axios from "axios";
import { useState } from "react";
import Footer from "../../communal/Footer/Footer";
import { Col, Row } from "antd"; //antd栅格化布局组件
import baseUrl from "../../communal/UrlBase/UrlBase";

const Note = () => {
    const [contentArray, setContentArray] = useState(null);
    const [newContentArray, setNewContentArray] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const pageOnChange = (number) => {
        setPageNumber(number);
    };
    useEffect(() => {
        async function getContent() {
            const content = await axios({
                method: "get",
                url: `${baseUrl}/article/1`,
            });
            const contentArray = content.data;
            setContentArray(contentArray.reverse());
            setNewContentArray(contentArray.slice((pageNumber - 1) * 5, (pageNumber - 1) * 5 + 5));
        }
        getContent();
    }, [pageNumber]);
    return (
        contentArray && (
            <div style={{ marginTop: "9vh" }}>
                <Header headerBackgroundColor={"rgba(102, 196, 251,0.7)"} active={"note"} />
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
                        }}>
                        <Paging pageOnChange={pageOnChange} contentTotal={contentArray.length} />
                    </Col>
                    <Col span={24} style={{ marginTop: "2vh" }}>
                        <Row>
                            <Footer />
                        </Row>
                    </Col>
                </Row>
                <MyCard />
                <BlinkLoop />
            </div>
        )
    );
};

export default Note;
