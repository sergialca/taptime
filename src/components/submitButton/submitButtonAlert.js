import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./submitButtonAlert.scss";
const SubmitButtonAlert = ({ txt, loading, aceptar }) => {
    return (
        <button className="submitBtnAlert" onClick={() => aceptar()}>
            {txt}
            <span className="spin">
                <ClipLoader loading={loading} color={"#fff"} size={12} />
            </span>
        </button>
    );
};

export default SubmitButtonAlert;
