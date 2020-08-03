import React, { useContext, useState } from "react";
import { LangContext } from "../../context/lang";
import "./langDropdown.scss";

const LangDropdown = () => {
    const { lang, setLang } = useContext(LangContext);
    const [show, setShow] = useState(false);

    const selectLang = (la) => {
        if (la === "ca") {
            setLang("ca");
        } else if (la === "es") {
            setLang("es");
        }
        setShow((show) => !show);
    };

    const changeShow = () => {
        setShow((show) => !show);
    };

    return (
        <div className="dropdown">
            <div onClick={changeShow} className="dropbtn">
                {lang === "es" ? "ESP" : lang === "ca" ? "CAT" : "ENG"}
            </div>
            <div onClick={changeShow} className="arrow"></div>
            <div className={show ? "dropdown-content" : "noDropdown"}>
                <div className="langDrop" onClick={() => selectLang("es")}>
                    ESP
                </div>
                <div className="langDrop" onClick={() => selectLang("ca")}>
                    CAT
                </div>
            </div>
        </div>
    );
};

export default LangDropdown;
