import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user";
import { LangContext } from "../../context/lang";
import profileEs from "../../json/profileEs.json";
import profileCa from "../../json/profileCa.json";
import { logout } from "../../api/api";
import "./profile.scss";

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const { lang } = useContext(LangContext);
    const [content, setContent] = useState("p");

    useEffect(() => {
        if (lang === "ca") {
            setContent(() => profileCa);
        } else if (lang === "es") {
            setContent(() => profileEs);
        }
    }, [lang]);

    const onLogout = async () => {
        await logout();
        setUser((prev) => ({ ...prev, logged: false }));
    };

    return (
        <div className="profileCont">
            <div className="userMail">
                <span className="mail">Mail: </span>
                <span>{user.mail}</span>
            </div>
            <button className="logout" onClick={() => onLogout()}>
                {content.logout}
            </button>
        </div>
    );
};

export default Profile;
