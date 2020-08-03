import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/loginForm/loginForm";
import TransparentNav from "../../components/transparentNav/transparentNav";
import LangDropdown from "../../components/langDropdown/langDropdown";
import { LangContext } from "../../context/lang";
import { UserContext } from "../../context/user";
import loginEs from "../../json/loginEs.json";
import loginCa from "../../json/loginCa.json";
import "./login.scss";

const Login = ({ history }) => {
    const { lang } = useContext(LangContext);
    const { user } = useContext(UserContext);
    const [content, setContent] = useState("login");

    useEffect(() => {
        if (lang === "ca") setContent(() => loginCa);
        else if (lang === "es") setContent(() => loginEs);
    }, [lang]);

    const changeRoute = (route) => {
        history.push(`/${route}`);
    };

    useEffect(() => {
        if (user.logged) history.push(`/`);
    }, []);

    return (
        <div>
            <TransparentNav>
                <LangDropdown />
            </TransparentNav>
            <div className="login">
                <div className="formContainer fade">
                    <LoginForm history={changeRoute} content={content} />
                    <div className="linkWrap">
                        <Link to={`/signup`}>{content.signup}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
