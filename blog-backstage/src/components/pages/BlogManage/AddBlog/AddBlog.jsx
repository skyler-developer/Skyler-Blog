import React from "react";
import { useEffect, useState } from "react";
import { Layout } from "antd";
import LeftHeader from "../../../communal/LeftHeader/LeftHeader"; //左侧导航区
import MiddleContent from "../../../communal/MiddleContent/MiddleContent"; //中间内容区
import BottomFooter from "../../../communal/BottomFooter/BottomFooter"; //底部内容区
import Edit from "../../../communal/Edit/Edit"; //富文本编辑器
import MyAlert from "../../../communal/MyAlert/MyAlert"; //警告提示组件
import { Input } from "antd"; //输入框
import { Select } from "antd"; //选择器
import { Button } from "antd"; //按钮
import axios from "axios";
import baseUrl from "../../../../axios/baseUrl";
import { useLocation } from "react-router-dom";

const AddBlog = () => {
    const location = useLocation();

    const [modifyId, setModifyId] = useState(null); // 修改文章的id值（若存在）
    const [title, setTitle] = useState(""); // 输入框的值(文章标题)
    const [img, setImg] = useState("https://s2.loli.net/2023/10/07/melwSzCUxjg46dQ.png"); // 输入框的值(文章主图url)
    const [type, setType] = useState(1); // 选择器的值（文章类型）
    const [content, setContent] = useState(""); //编辑器中的富文本内容
    const [text, setText] = useState(""); //编辑器中的纯文本内容
    const [alertState, setAlertState] = useState({ isView: false }); //设置警告框的状态
    let alertStateObject = {}; //设置警告框状态对象
    let alertType; //警告框状态类型
    let alertMessage; //警告框状态信息
    const [editContentState, setEditContentState] = useState(false); //设置编辑器内容状态，发布成功之后清空内容

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get("id");
        setModifyId(id);
        console.log(id); // 打印查询参数 id 的值
        console.log(modifyId);

        if (modifyId != null) {
            axios({
                url: `${baseUrl}/blog/${modifyId}`,
                method: "get",
            })
                .then((res) => {
                    console.log(res.data[0]);
                    setType(res.data[0].kind);
                    setTitle(res.data[0].title);
                    setContent(res.data[0].content);
                    setImg(res.data[0].imageUrl);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [modifyId]);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
        console.log("Change:", e.target.value);
    };
    const onChangeImg = (e) => {
        setImg(e.target.value);
        console.log("Change:", e.target.value);
    };
    const handleChange = (value) => {
        setType(value);
        console.log(`selected ${value}`);
    };
    const handleContentChange = (richText, plainText) => {
        setContent(richText);
        setText(plainText);
    };
    const handleButtonClick = () => {
        //如果有选项为空不进行数据提交
        if (title.length === 0 || img.length === 0 || text.length === 0) {
            alertType = "error";
            alertMessage = "发布失败";
            alertStateObject = {
                isView: true,
                type: alertType,
                message: alertMessage,
                description: "请检查是否有选项为空！",
            };
            setAlertState(alertStateObject);

            //三秒后警告框消失
            setTimeout(() => {
                setAlertState({ isView: false });
            }, 3000);
            return;
        }
        if (modifyId === null) {
            axios({
                url: `${baseUrl}/savearticle`,
                method: "post",
                data: {
                    title: title,
                    type: type,
                    content: content,
                    text: text,
                    img: img,
                },
            })
                .then((response) => {
                    // 处理成功响应
                    console.log(response);

                    if (response.status / 100 === 2) {
                        alertType = "success";
                        alertMessage = "发布成功！";
                    } else if (response.status / 100 === 4) {
                        alertType = "error";
                        alertMessage = "发布失败！";
                    }
                    alertStateObject = {
                        isView: true,
                        type: alertType,
                        message: alertMessage,
                        description: response.data.message,
                    };
                    setAlertState(alertStateObject);
                    setEditContentState(true);
                    setTitle("");
                    setImg("https://s2.loli.net/2023/10/07/melwSzCUxjg46dQ.png");
                    setTimeout(() => {
                        setAlertState({ isView: false });
                        setEditContentState(false);
                    }, 3000);
                })
                .catch((error) => {
                    // 处理错误
                    console.error(error);
                });
        } else {
            axios({
                url: `${baseUrl}/modifyblog/${modifyId}`,
                method: "post",
                data: {
                    content: content,
                    title: title,
                    kind: type,
                    text: text,
                    img: img,
                },
            })
                .then((response) => {
                    console.log(response);
                    if (response.status / 100 === 2) {
                        alertType = "success";
                        alertMessage = "发布成功！";
                    } else if (response.status / 100 === 4) {
                        alertType = "error";
                        alertMessage = "发布失败！";
                    }
                    alertStateObject = {
                        isView: true,
                        type: alertType,
                        message: alertMessage,
                        description: response.data.message,
                    };
                    setAlertState(alertStateObject);
                    setEditContentState(true);
                    setTitle("");
                    setImg("https://s2.loli.net/2023/10/07/melwSzCUxjg46dQ.png");
                    setTimeout(() => {
                        setAlertState({ isView: false });
                        setEditContentState(false);
                    }, 3000);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <Layout>
            <LeftHeader active={"add"} />
            <Layout>
                <MiddleContent breadcrumb={[{ title: "博客管理" }, { title: "写新文章" }]}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "20px",
                        }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "500px",
                                paddingRight: "100px",
                            }}>
                            <span style={{ width: "100px" }}>文章标题：</span>
                            <Input
                                showCount
                                onChange={onChangeTitle}
                                style={{ width: "15vw" }}
                                value={title}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "500px",
                                paddingRight: "100px",
                            }}>
                            <span style={{ width: "100px" }}>文章主图URL：</span>
                            <Input
                                showCount
                                onChange={onChangeImg}
                                allowClear
                                style={{ width: "15vw" }}
                                value={img}
                            />
                        </div>
                        <div>
                            文章类型：
                            <Select
                                value={type ? type : 1}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 1,
                                        label: "学习笔记",
                                    },
                                    {
                                        value: 2,
                                        label: "技术杂谈",
                                    },
                                    {
                                        value: 3,
                                        label: "生活随写",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <Edit
                        onContentChange={handleContentChange}
                        editContentState={editContentState}
                        editContent={content}
                    />
                </MiddleContent>
                <Button
                    type="primary"
                    style={{ width: "100px", height: "50px", margin: "auto" }}
                    onClick={handleButtonClick}>
                    发布文章
                </Button>
                <BottomFooter />
                <MyAlert alertState={alertState} />
            </Layout>
        </Layout>
    );
};

export default AddBlog;
