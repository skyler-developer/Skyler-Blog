import { Navigate } from "react-router-dom";

//导入登录组件
import Administrator from "../pages/Administrator/Administrator.jsx";

import { RequireAuth } from "../../token/LoginContext.jsx";

//导入博客管理组件
import AddBlog from "../pages/BlogManage/AddBlog/AddBlog.jsx";
import ModifyBlog from "../pages/BlogManage/ModifyBlog/ModifyBlog.jsx";

//导入页面管理组件
import PageAboutMe from "../pages/PageManage/PageAboutMe/PageAboutMe.jsx";
import PageFriendLink from "../pages/PageManage/PageFriendLink/PageFriendLink";

//导入评论管理组件
import ModifyComment from "../pages/CommentManage/ModifyComment.jsx";

//导入首页仪表盘组件
import Dashboard from "../pages/Dashboard/Dashboard.jsx";

//设置路由规则
const routerArr = [
    {
        path: "/login",
        element: <Administrator />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },

    //博客管理路由规则
    {
        path: "/blogmanage/addblog",
        element: (
            <RequireAuth>
                <AddBlog />
            </RequireAuth>
        ),
    },
    {
        path: "/blogmanage/modifyblog",
        element: (
            <RequireAuth>
                <ModifyBlog />
            </RequireAuth>
        ),
    },

    //页面管理路由规则
    {
        path: "/pagemanage/pageaboutme",
        element: (
            <RequireAuth>
                <PageAboutMe />
            </RequireAuth>
        ),
    },
    {
        path: "/pagemanage/pagefriendlink",
        element: (
            <RequireAuth>
                <PageFriendLink />
            </RequireAuth>
        ),
    },

    //评论管理路由规则
    {
        path: "/commentmanage/modifycomment",
        element: <ModifyComment />,
    },

    //默认跳转
    {
        path: "/",
        element: <Navigate to="/dashboard" />,
    },
];

export default routerArr;
