import React from "react";
import { useRoutes } from "react-router-dom";
import routerArr from "./components/routerArr.js/routerArr";
import { AuthProvider } from "./token/LoginContext";
import "./App.css";

const App = () => {
    const element = useRoutes(routerArr);
    return (
        <div className="App">
            <AuthProvider>{element}</AuthProvider>
        </div>
    );
};

export default App;
