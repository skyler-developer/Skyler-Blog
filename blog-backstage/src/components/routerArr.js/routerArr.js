import { Navigate } from "react-router-dom";

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
        path: "/dashboard",
        element: <Dashboard />,
    },

    //博客管理路由规则
    {
        path: "/blogmanage/addblog",
        element: <AddBlog />,
    },
    {
        path: "/blogmanage/modifyblog",
        element: <ModifyBlog />,
    },

    //页面管理路由规则
    {
        path: "/pagemanage/pageaboutme",
        element: <PageAboutMe />,
    },
    {
        path: "/pagemanage/pagefriendlink",
        element: <PageFriendLink />,
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
