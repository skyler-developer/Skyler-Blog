import React from "react";
import { Alert } from "antd";
const MyAlert = ({ alertState }) => {
    return alertState.isView ? (
        <Alert
            message={alertState.message}
            description={alertState.description}
            type={alertState.type}
            showIcon
            style={{ width: "30vw", position: "fixed", left: "35vw", top: "15vh", zIndex: "999" }}
        />
    ) : (
        <></>
    );
};

export default MyAlert;
