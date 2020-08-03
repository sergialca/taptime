import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/registerForm/registerForm";
import Alert from "../../components/alert/alert";
import TransparentNav from "../../components/transparentNav/transparentNav";
import LangDropdown from "../../components/langDropdown/langDropdown";
import { LangContext } from "../../context/lang";
import { UserContext } from "../../context/user";
import registerCa from "../../json/registerCa.json";
import registerEs from "../../json/registerEs.json";
import "./register.scss";

const Register = ({ history }) => {
    const { lang } = useContext(LangContext);
    const { user } = useContext(UserContext);
    const [display, setDisplay] = useState(false);
    const [content, setContent] = useState("singup");

    useEffect(() => {
        if (lang === "ca") setContent(() => registerCa);
        else if (lang === "es") setContent(() => registerEs);
    }, [lang]);

    useEffect(() => {
        if (user.logged) history.push(`/`);
    }, []);

    const changeDisplay = () => {
        setDisplay(!display);
    };

    const changeRoute = (route) => {
        history.push(`/${route}`);
    };

    return (
        <div>
            <TransparentNav>
                <LangDropdown />
            </TransparentNav>
            <div className="register">
                <div className="formContainer fade">
                    <RegisterForm
                        history={changeRoute}
                        content={content}
                        showAlert={changeDisplay}
                    />
                    <div className="linkWrap">
                        <Link to={`/login`}>{content.back}</Link>
                    </div>
                </div>
                <Alert
                    txt={content.pswRule}
                    txtBtn={content.accept}
                    display={display}
                    aceptar={changeDisplay}
                />
            </div>
        </div>
    );
};

export default Register;
