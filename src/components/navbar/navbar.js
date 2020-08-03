import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { GoPerson } from "react-icons/go";
import LangDropdown from "../langDropdown/langDropdown";
import { MenuContext } from "../../context/menu";
import "./navbar.scss";

const Navbar = ({ content }) => {
    const [expanded, setExpanded] = useState(false);
    const { setMenu } = useContext(MenuContext);
    const [selected, setSelected] = useState({ first: true, second: false, profile: false });

    const onExpand = () => {
        setExpanded((expanded) => !expanded);
    };

    const selectTab = (tab) => {
        switch (tab) {
            case "1":
                setSelected(() => ({ first: true, second: false }));
                setMenu(() => "Reservar");
                break;
            case "2":
                setSelected(() => ({ first: false, second: true }));
                setMenu(() => "Mis");
                break;
            case "profile":
                setSelected(() => ({ first: false, second: false, profile: true }));
                setMenu(() => "Profile");
                break;
            default:
                setSelected(() => ({ first: true, second: false }));
                break;
        }
        setExpanded(() => false);
    };

    return (
        <div className={expanded ? "navbar expand" : "navbar"}>
            <Link onClick={() => selectTab("1")} className="link brand" to="/dashboard">
                {content.brand}
            </Link>
            <div className={expanded ? "panel expand" : "panel"}>
                <Link
                    onClick={() => selectTab("1")}
                    className={selected.first ? "link selected" : "link"}
                    to="/"
                >
                    {content.booking}
                </Link>
                <Link
                    onClick={() => selectTab("2")}
                    className={selected.second ? "link selected" : "link"}
                    to="/myspace"
                >
                    {content.myBooking}
                </Link>
                <div className="lang">
                    <LangDropdown />
                </div>
            </div>
            <Link to="/profile" onClick={() => selectTab("profile")}>
                <div className={selected.profile ? "profile selected" : "profile"}>
                    <GoPerson />
                </div>
            </Link>
            <div className="icon" onClick={onExpand}>
                <TiThMenu />
            </div>
        </div>
    );
};

export default Navbar;
