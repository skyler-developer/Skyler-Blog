import React from "react";

import { Layout, Breadcrumb } from "antd";
const { Content } = Layout;

const MiddleContent = ({ breadcrumb = [{ title: "DashBoard" }], children }) => {
    return (
        <Content
            style={{
                margin: "0 4vw",
            }}>
            <Breadcrumb
                style={{
                    margin: "4vh 0",
                }}
                items={breadcrumb}
            />
            {children}
        </Content>
    );
};

export default MiddleContent;
