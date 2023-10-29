import React from "react";

import { Layout, Breadcrumb } from "antd";
const { Content } = Layout;

const MiddleContent = ({ children }) => {
    return (
        <Content
            style={{
                margin: "0 4vw",
            }}>
            <Breadcrumb
                style={{
                    margin: "4vh 0",
                }}>
                <Breadcrumb.Item>demo</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            {children}
        </Content>
    );
};

export default MiddleContent;
