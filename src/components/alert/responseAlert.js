import React from "react";
import { MdInfo } from "react-icons/md";
import "./responseAlert.scss";

const ResponseAlert = ({ aceptar, display, txtOk, txtFail, response, btnTxt }) => {
    return (
        <div className={display ? "responseAlert" : "noResponseAlert"}>
            <div className="alertBack"></div>
            <div className="container">
                <div className={response === "ok" ? "info success" : "info fail"}>
                    <div className="txtWrap">
                        <div className="inline">
                            <MdInfo className="icon" />
                            <span className="txt">{response === "ok" ? txtOk : txtFail}</span>
                        </div>
                    </div>
                    <div className="btnWrap">
                        <button className="btn aceptar" onClick={() => aceptar()}>
                            {btnTxt}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponseAlert;
