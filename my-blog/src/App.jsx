import React from "react";
import routerArr from "./components/routerArr/routerArr";
import { useRoutes } from "react-router-dom";
import "./App.css";
const App = () => {
    const element = useRoutes(routerArr);
    return <div>{element}</div>;
};

export default App;
