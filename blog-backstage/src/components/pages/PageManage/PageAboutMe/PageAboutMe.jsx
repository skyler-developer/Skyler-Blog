import React, { useState } from "react";
import { Layout } from "antd";
import { Button } from "antd"; //按钮
import axios from "axios";
import baseUrl from "../../../../axios/baseUrl";
import MiddleContent from "../../../communal/MiddleContent/MiddleContent";
import Edit from "../../../communal/Edit/Edit";
import LeftHeader from "../../../communal/LeftHeader/LeftHeader";
import BottomFooter from "../../../communal/BottomFooter/BottomFooter";
import MyAlert from "../../../communal/MyAlert/MyAlert";

const PageAboutMe = () => {
    const [content, setContent] = React.useState(""); //编辑器中的富文本内容
    const [editContentState, setEditContentState] = useState(false); //设置编辑器内容状态，发布成功之后清空内容

    const [text, setText] = React.useState(""); //编辑器中的纯文本内容
    const [alertState, setAlertState] = useState({ isView: false }); //设置警告框的状态
    let alertStateObject = {}; //设置警告框状态对象
    let alertType; //警告框状态类型
    let alertMessage; //警告框状态信息

    const handleButtonClick = () => {
        axios({
            url: `${baseUrl}/saveaboutme`,
            method: "post",
            data: {
                aboutMeHtml: content,
                text: text,
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
                setTimeout(() => {
                    setAlertState({ isView: false });
                    setEditContentState(false);
                }, 3000);
            })
            .catch((error) => {
                // 处理错误
                console.error(error);
            });
    };
    const handleContentChange = (richText, plainText) => {
        setContent(richText);
        setText(plainText);
    };
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}>
            <LeftHeader active={"aboutMe"} />
            <Layout>
                <MiddleContent breadcrumb={[{ title: "页面管理" }, { title: "关于我" }]}>
                    <Edit
                        onContentChange={handleContentChange}
                        editContentState={editContentState}
                        editContent={content}
                    />
                </MiddleContent>
                <Button
                    type="primary"
                    style={{ width: "100px", height: "50px", margin: "2vh auto" }}
                    onClick={handleButtonClick}>
                    发布文章
                </Button>
                <MyAlert alertState={alertState} />
                <BottomFooter />
            </Layout>
        </Layout>
    );
};

export default PageAboutMe;
