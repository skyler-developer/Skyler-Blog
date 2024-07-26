import { lazy } from "react";
import MySuspense from "./MySuspense";
import Home from "../pages/Home/Home";
import { Navigate } from "react-router-dom"; //设置默认跳转

const AboutMe = lazy(() => import("../pages/AboutMe/AboutMe")); //关于我组件
const Note = lazy(() => import("../pages/Classify/Note/Note")); //学习笔记组件
const RandomWriting = lazy(() => import("../pages/Classify/RandomWriting/RandomWriting")); //生活随写组件
const TittleTattle = lazy(() => import("../pages/Classify/TittleTattle/TittleTattle")); //技术杂谈组件
const Trends = lazy(() => import("../pages/Trends/Trends")); //动态组件
const DetailContent = lazy(() => import("../pages/communal/DetailContent/DetailContent")); //文章详情组件

//设置路由规则
const routerArr = [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/classify/note",
        element: (
            <MySuspense>
                <Note />
            </MySuspense>
        ),
    },
    {
        path: "/classify/tittletattle",
        element: (
            <MySuspense>
                <TittleTattle />
            </MySuspense>
        ),
    },
    {
        path: "/classify/randomwriting",
        element: (
            <MySuspense>
                <RandomWriting />
            </MySuspense>
        ),
    },
    {
        path: "/trends",
        element: (
            <MySuspense>
                <Trends />
            </MySuspense>
        ),
    },
    {
        path: "/about",
        element: (
            <MySuspense>
                <AboutMe />
            </MySuspense>
        ),
    },
    {
        path: "/blog/article/:id",
        element: (
            <MySuspense>
                <DetailContent />
            </MySuspense>
        ),
    },
    {
        path: "/",
        element: <Navigate to="/home" />,
    },
];
export default routerArr;
