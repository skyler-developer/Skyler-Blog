import React from "react";
import LeftHeader from "../../communal/LeftHeader/LeftHeader";
import { Layout } from "antd";
const Doshboard = () => {
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}>
            <LeftHeader />
        </Layout>
    );
};

export default Doshboard;
