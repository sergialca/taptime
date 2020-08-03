import React from "react";
import "./input.scss";

const Input = ({ children, account, accountChange, placeholder, type, name }) => {
    return (
        <div className="inputWrapper center space">
            {children}
            <input
                className="input"
                name={name}
                type={type}
                value={account}
                onChange={accountChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
