import React from "react";
import { useState, useEffect } from "react";

import { Layout, Button, Space, Input } from "antd";
import axios from "axios";
import LeftHeader from "../../../communal/LeftHeader/LeftHeader";
import BottomFooter from "../../../communal/BottomFooter/BottomFooter";
import MiddleContent from "../../../communal/MiddleContent/MiddleContent";
import MyAlert from "../../../communal/MyAlert/MyAlert";

const PageFriendLink = () => {
    const [alertState, setAlertState] = useState({ isView: false }); //设置警告框的状态
    const [friendResult, setFriendResult] = useState(null);
    const [content, setContent] = useState(null);
    const [motto, setMotto] = useState({
        content: null,
        author: null,
    });
    let alertStateObject = {}; //设置警告框状态对象
    let alertType; //警告框状态类型
    let alertMessage; //警告框状态信息
    const fetchData = () => {
        axios({
            url: "http://127.0.0.1:3007/api/getfriendlink",
            method: "get",
        })
            .then((res) => {
                console.log(res.data);
                setFriendResult(res.data.reverse());
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleClick = (item) => {
        axios({
            url: "http://127.0.0.1:3007/api/deletefriendlink",
            method: "get",
            params: {
                id: item.id,
            },
        })
            .then((res) => {
                console.log(res.data);
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleContentChange = (e) => {
        console.log(e.target.value);
        setMotto({
            content: e.target.value,
            author: motto.author,
        });
    };

    const handleAuthorChange = (e) => {
        console.log(e.target.value);
        setMotto({
            content: motto.content,
            author: e.target.value,
        });
    };

    const handleAddClick = () => {
        axios({
            url: "http://127.0.0.1:3007/api/addfriendlink",
            method: "post",
            data: {
                name: content,
            },
        })
            .then((res) => {
                console.log(res.data);
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleMottoClick = () => {
        axios({
            url: "http://127.0.0.1:3007/api/modifymotto",
            method: "post",
            data: {
                content: motto.content,
                author: motto.author,
            },
        })
            .then((response) => {
                console.log(response.data);
                if (response.status / 100 === 2) {
                    alertType = "success";
                    alertMessage = "修改成功！";
                } else if (response.status / 100 === 4) {
                    alertType = "error";
                    alertMessage = "修改失败！";
                }
                alertStateObject = {
                    isView: true,
                    type: alertType,
                    message: alertMessage,
                    description: response.data.message,
                };
                setAlertState(alertStateObject);
                setTimeout(() => {
                    setAlertState({ isView: false });
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}>
            <LeftHeader active={"friendLink"} />
            <Layout>
                <MiddleContent>
                    <Space wrap={true} size="large" align="center">
                        {friendResult &&
                            friendResult.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        style={{
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "30vw",
                                            minHeight: "5vh",
                                            backgroundColor: "#bfc",
                                            margin: "1vh 0",
                                            fontSize: "1rem",
                                            color: "rgb(22, 119, 255)",
                                        }}>
                                        {item.name}
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                handleClick(item);
                                            }}
                                            style={{ margin: "0 2vw" }}>
                                            删除
                                        </Button>
                                    </div>
                                );
                            })}
                    </Space>
                    <div style={{ margin: "5vh" }}>
                        <Space wrap={true} size="large" align="center">
                            <Input placeholder="输入新增友链......" onChange={handleChange} />
                            <Button type="primary" onClick={handleAddClick}>
                                添加
                            </Button>
                        </Space>
                    </div>
                    <div style={{ margin: "5vh" }}>
                        <Space wrap={true} size="large" align="center">
                            <Input
                                placeholder="输入底部语句......"
                                onChange={handleContentChange}
                            />
                            <Input placeholder="输入作者......" onChange={handleAuthorChange} />
                            <Button type="primary" onClick={handleMottoClick}>
                                修改
                            </Button>
                            <MyAlert alertState={alertState} />
                        </Space>
                    </div>
                </MiddleContent>
                <BottomFooter />
            </Layout>
        </Layout>
    );
};

export default PageFriendLink;
