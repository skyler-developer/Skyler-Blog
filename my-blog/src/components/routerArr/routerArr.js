import AboutMe from "../pages/AboutMe/AboutMe"; //关于我组件
import Note from "../pages/Classify/Note/Note"; //学习笔记组件
import RandomWriting from "../pages/Classify/RandomWriting/RandomWriting"; //生活随写组件
import TittleTattle from "../pages/Classify/TittleTattle/TittleTattle"; //技术杂谈组件
import Home from "../pages/Home/Home"; //首页组件
import Trends from "../pages/Trends/Trends"; //动态组件
import DetailContent from "../pages/communal/DetailContent/DetailContent"; //文章详情组件
import { Navigate } from "react-router-dom"; //设置默认跳转

//设置路由规则
const routerArr = [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/classify/note",
        element: <Note />,
    },
    {
        path: "/classify/tittletattle",
        element: <TittleTattle />,
    },
    {
        path: "/classify/randomwriting",
        element: <RandomWriting />,
    },
    {
        path: "/trends",
        element: <Trends />,
    },
    {
        path: "/about",
        element: <AboutMe />,
    },
    {
        path: "/blog/article/:id",
        element: <DetailContent />,
    },
    {
        path: "/",
        element: <Navigate to="/home" />,
    },
];
export default routerArr;
