import React from "react";
import { NavLink } from "react-router-dom"; //路由跳转链接

import {
    DashboardOutlined,
    DiffOutlined,
    SnippetsOutlined,
    FormOutlined,
    ScissorOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    MessageOutlined,
} from "@ant-design/icons"; //所需图标

import { Layout, Menu, Avatar } from "antd"; //布局组件
const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(
        "SkylerAdministrator",
        "administrator",
        <Avatar src="https://s2.loli.net/2023/09/23/6Dw1GomA4rOcbia.png" size={"small"} />,
    ),

    //仪表盘，查看访问量，评论数量等信息
    getItem(
        <NavLink to="/dashboard">Dashboard</NavLink>,
        "dashboard",
        <DashboardOutlined />,
    ),
    //添加折线区分模块
    {
        type: "divider",
    },
    getItem("博客管理", "manage", <DiffOutlined />, [
        getItem(<NavLink to="/blogmanage/addblog">写新文章</NavLink>, "add", <FormOutlined />),
        getItem(
            <NavLink to="/blogmanage/modifyblog">修改文章</NavLink>,
            "modify",
            <ScissorOutlined />,
        ),
    ]),
    {
        type: "divider",
    },
    getItem("页面管理", "pageManage", <SnippetsOutlined />, [
        getItem(
            <NavLink to="/pagemanage/pageaboutme">关于我</NavLink>,
            "aboutMe",
            <UserOutlined />,
        ),
        getItem(
            <NavLink to="/pagemanage/pagefriendlink">友情链接</NavLink>,
            "friendLink",
            <UsergroupAddOutlined />,
        ),
    ]),
    {
        type: "divider",
    },
    getItem("评论管理", "commentManage", <MessageOutlined />, [
        getItem(
            <NavLink to="/commentmanage/modifycomment">修改评论</NavLink>,
            "modifycomment",
            <ScissorOutlined />,
        ),
    ]),
];
const LeftHeader = ({ active }) => {
    const onClick = (e) => {
        console.log("click ", e);
    };

    return (
        <Sider collapsible={"true"} theme={"light"} width={"15vw"}>
            <Menu
                onClick={onClick}
                style={{
                    width: "100%",
                }}
                defaultSelectedKeys={[active]}
                mode="inline"
                items={items}
                defaultOpenKeys={["manage", "pageManage", "commentManage"]}
            />
        </Sider>
    );
};
export default LeftHeader;
