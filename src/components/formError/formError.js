import React from "react";
import "./formError.scss";

const formError = ({ txt }) => {
    return <div className="loginError">{txt}</div>;
};

export default formError;
