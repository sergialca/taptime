import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./submitButton.scss";
const SubmitButton = ({ txt, loading }) => {
    return (
        <button type="submit" className="submitBtn">
            {txt}
            <span className="spin">
                <ClipLoader loading={loading} color={"#fff"} size={12} />
            </span>
        </button>
    );
};

export default SubmitButton;
