import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import baseUrl from "../UrlBase/UrlBase";
import { FloatButton } from "antd";
import { Col, Row, Menu, Input } from "antd"; //格栅化、导航、输入框所需组件
import {
    HomeOutlined,
    DownOutlined,
    UserOutlined,
    CoffeeOutlined,
    FormOutlined,
    CopyOutlined,
    EditOutlined,
} from "@ant-design/icons"; //图表组件

import "./Header.css";

const { Search } = Input; //结构input中search属性

//导航
const navigatorItems = [
    [
        {
            label: <NavLink to="/home">首页</NavLink>,
            key: "homePage",
            icon: <HomeOutlined />,
        },
    ],
    [
        {
            label: "分类",
            key: "classify",
            icon: <DownOutlined />,
            children: [
                {
                    label: <NavLink to="/classify/note">学习笔记</NavLink>,
                    key: "note",
                    icon: <FormOutlined />,
                },
                {
                    label: <NavLink to="/classify/tittletattle">技术杂谈</NavLink>,
                    key: "tittletattle",
                    icon: <CopyOutlined />,
                },
                {
                    label: <NavLink to="/classify/randomwriting">生活随写</NavLink>,
                    key: "randomwriting",
                    icon: <EditOutlined />,
                },
            ],
        },
    ],
    [
        {
            label: <NavLink to="/trends">动态</NavLink>,
            key: "trends",
            icon: <CoffeeOutlined />,
        },
    ],
    [
        {
            label: <NavLink to="/about">关于我</NavLink>,
            key: "about",
            icon: <UserOutlined />,
        },
    ],
];

//传递过来的内容是Header的背景颜色
const Header = ({ headerBackgroundColor, active }) => {
    const [current, setCurrent] = useState(active);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchContent, setSearchContent] = useState(false);
    const [searchResult, setSearchResult] = useState(false);

    //导航组件，点击效果
    const onClick = (e) => {
        setCurrent(e.key);
    };
    const onSearch = (value, _e, info) => {
        setShowSearchResults(!showSearchResults);
        console.log(info?.source, value);
        console.log(showSearchResults);
        if (showSearchResults === false) {
            axios({
                url: `${baseUrl}/search`,
                method: "post",
                data: {
                    keyword: searchContent,
                },
            })
                .then((res) => {
                    console.log(res.data);
                    setSearchResult(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchContent(e.target.value);
    };
    return (
        <div>
            {/* 头部采用栅格化布局 */}
            <Row
                align="middle"
                className="header"
                style={{ backgroundColor: headerBackgroundColor }}>
                {/* 最左侧文字组件 */}
                <Col span={3} offset={3}>
                    <SkylerFont />
                </Col>

                <Col span={2}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={navigatorItems[0]}
                        style={{ background: "transparent" }}
                    />
                </Col>
                <Col span={2}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={navigatorItems[1]}
                        style={{ background: "transparent" }}
                    />
                </Col>
                <Col span={2}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={navigatorItems[2]}
                        style={{ background: "transparent" }}
                    />
                </Col>
                <Col span={2}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={navigatorItems[3]}
                        style={{ background: "transparent" }}
                    />
                </Col>

                {/* 搜索框 */}
                <Col span={6} offset={3}>
                    <Search
                        placeholder="输入搜索内容..."
                        size="large"
                        onChange={handleChange}
                        style={{
                            width: "15vw",
                        }}
                        onSearch={onSearch}
                    />
                </Col>
            </Row>

            {/* 展示搜索结果div */}
            {showSearchResults && (
                <div
                    style={{
                        width: "12vw",
                        height: "25vh" /* , backgroundColor: "red" */,
                        position: "fixed",
                        left: "70.8vw",
                        zIndex: "99",
                        top: "8vh",
                        padding: "1vh 1vw",
                        border: "solid 1px rgb(212, 212, 213)",
                        backgroundColor: "rgb(255,255,255)",
                        borderRadius: "5px",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}>
                    {searchResult.length ? (
                        searchResult.map((item) => {
                            return (
                                <NavLink
                                    className={"navlinkSearch"}
                                    key={item.id}
                                    to={`/blog/article/${item.id}`}
                                    style={{ textDecoration: "none" }}>
                                    <div
                                        style={{
                                            fontSize: "1rem",
                                            width: "13vw",
                                            marginTop: "1vh",
                                            // color: "rgb(82, 134, 255)",
                                        }}>
                                        {item.title}
                                    </div>
                                </NavLink>
                            );
                        })
                    ) : (
                        <div>无结果</div>
                    )}
                </div>
            )}
            <FloatButton.BackTop />
        </div>
    );
};

//最左侧文字skyler's Blog组件
const SkylerFont = () => {
    return <div className="skylerFont">Skyler's Blog</div>;
};

export default Header;
