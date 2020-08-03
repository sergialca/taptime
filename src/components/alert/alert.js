import React from "react";
import "./alert.scss";
const Alert = ({ txt, aceptar, txtBtn, display }) => {
    return (
        <div className={display ? "alert" : "noAlert"}>
            <div className="alertBack"></div>
            <div className="container">
                <div className="info">
                    <div className="txtWrap">
                        <span className="txt">{txt}</span>
                    </div>
                    <div className="btnWrap">
                        <button className="btn" onClick={() => aceptar()}>
                            {txtBtn}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
