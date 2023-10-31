import React from "react";
import LeftHeader from "../../communal/LeftHeader/LeftHeader";
import { Layout } from "antd";
import MiddleContent from "../../communal/MiddleContent/MiddleContent";
const Doshboard = () => {
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}>
            <LeftHeader active={"dashboard"} />
            <Layout>
                <MiddleContent>SkylerBlog的后台管理系统，大哥如果不小心进来的话请不要改东西，求求了，我是菜鸡，实在是懒得再去写路由守卫了，当然我相信就算我写了您也有办法破解，所以大哥，放过小弟吧，小弟真的不容易</MiddleContent>
            </Layout>
        </Layout>
    );
};

export default Doshboard;
