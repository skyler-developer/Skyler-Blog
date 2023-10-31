import React from "react";
import { Layout } from "antd";
import { Button } from "antd"; //按钮
import axios from "axios";
import baseUrl from "../../../../axios/baseUrl";
import MiddleContent from "../../../communal/MiddleContent/MiddleContent";
import Edit from "../../../communal/Edit/Edit";
import LeftHeader from "../../../communal/LeftHeader/LeftHeader";
import BottomFooter from "../../../communal/BottomFooter/BottomFooter";
const PageAboutMe = () => {
    const [content, setContent] = React.useState(""); //编辑器中的富文本内容
    const [text, setText] = React.useState(""); //编辑器中的纯文本内容
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
                <MiddleContent>
                    <Edit onContentChange={handleContentChange} />
                </MiddleContent>
                <Button
                    type="primary"
                    style={{ width: "100px", height: "50px", margin: "auto" }}
                    onClick={handleButtonClick}>
                    发布文章
                </Button>
                <BottomFooter />
            </Layout>
        </Layout>
    );
};

export default PageAboutMe;
