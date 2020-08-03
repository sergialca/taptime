import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { MenuContext } from "../../context/menu";
import { LangContext } from "../../context/lang";
import navbarCa from "../../json/navbarCa.json";
import navbarEs from "../../json/navbarEs.json";
import "./main.scss";

const Layout = ({ children }) => {
    const { menu } = useContext(MenuContext);
    const { lang } = useContext(LangContext);
    const [content, setContent] = useState("login");
    const [txtMenu, setTxtMenu] = useState("b");

    useEffect(() => {
        if (lang === "ca") setContent(() => navbarCa);
        else if (lang === "es") setContent(() => navbarEs);
    }, [lang]);

    useEffect(() => {
        switch (menu) {
            case "Reservar":
                setTxtMenu(() =>
                    lang === "ca" ? "Reservar" : lang === "es" ? "Reservar" : "Booking"
                );
                break;
            case "Mis":
                setTxtMenu(() =>
                    lang === "ca"
                        ? "Les meves reserves"
                        : lang === "es"
                        ? "Mis reservas"
                        : "My Bookings"
                );
                break;
            case "Profile":
                setTxtMenu(() =>
                    lang === "ca"
                        ? "Perfil d'usuari"
                        : lang === "es"
                        ? "Perfil de usuario"
                        : "Profile"
                );
                break;
            default:
                setTxtMenu(() => "Booking");
        }
    }, [menu, lang]);

    return (
        <div className="layout">
            <Navbar content={content} />
            <div className="header">{txtMenu}</div>
            {children}
        </div>
    );
};

export default Layout;
