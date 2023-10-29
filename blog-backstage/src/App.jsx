import React from "react";
import { useRoutes } from "react-router-dom";
import routerArr from "./components/routerArr.js/routerArr";
import "./App.css";

const App = () => {
    const element = useRoutes(routerArr);
    return <div className="App">{element}</div>;
};

export default App;
