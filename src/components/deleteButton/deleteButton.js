import React, { useContext } from "react";
import { DeleteContext } from "../../context/deleteBooking";
import "./deleteButton.scss";

const DeleteButton = ({ btnTxt, setDisplay, id }) => {
    const { setDeleteData } = useContext(DeleteContext);

    const onBtnClick = () => {
        setDeleteData(() => ({
            id,
            deleted: false,
        }));
        setDisplay((prev) => ({
            ...prev,
            deleteAlert: true,
        }));
    };
    return (
        <button className="deleteButton" onClick={() => onBtnClick()}>
            {btnTxt}
        </button>
    );
};

export default DeleteButton;
