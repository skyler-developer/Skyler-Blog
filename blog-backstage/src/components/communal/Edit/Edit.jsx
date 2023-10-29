import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "./Edit.css";
const Edit = ({ onContentChange, editContentState, editContent }) => {
    // editor 实例
    const [editor, setEditor] = useState(null);
    if (editContentState) {
        editor.clear();
        editContentState = !editContentState;
    }
    // 编辑器内容
    const [html, setHtml] = useState();

    const handleChildComponentChange = (editor) => {
        onContentChange(editor.getHtml(), editor.getText());
    };
    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        console.log(editContent);
        setTimeout(() => {
            setHtml(editContent);
        }, 0);
    }, [editContent]);

    // 工具栏配置
    const toolbarConfig = {};

    //排除工具栏子项，上传本地图片，上传视频
    toolbarConfig.excludeKeys = ["group-video", "uploadImage"];

    // 编辑器配置
    const editorConfig = {
        MENU_CONF: {},
        placeholder: "请输入内容...",
    };

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return;
            editor.destroy();
            setEditor(null);
        };
    }, [editor]);
    return (
        <>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        border: "1px solid #ccc",
                        zIndex: 100,
                        width: "37vw",
                        display: "inline-block",
                        minHeight: "65vh",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{
                            borderBottom: "1px solid #ccc",
                            width: "100%" /* height: "15vh" */,
                        }}
                    />
                    <div style={{ flex: "1" }}>
                        <Editor
                            defaultConfig={editorConfig}
                            value={html}
                            onCreated={setEditor}
                            onChange={handleChildComponentChange}
                            mode="default"
                            style={{
                                height: "100%",
                                width: "100%",
                                overflowY: "hidden",
                                borderBottom: "1px solid #ccc",
                            }}
                        />
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: html }} style={{ display: "none" }} />
                <div
                    style={{
                        display: "inline-block",
                        width: "37vw",
                        minHeight: "65vh",
                        backgroundColor: "rgb(255,255,255)",
                        verticalAlign: "top",
                        margin: "0 1vw",
                        border: "1px solid #ccc",
                        fontSize: "1vw",
                        letterSpacing: "0.1rem",
                        lineHeight: "5vh",
                    }}>
                    {html && <div dangerouslySetInnerHTML={{ __html: html }} className="preview" />}
                </div>
            </div>
        </>
    );
};

export default Edit;
