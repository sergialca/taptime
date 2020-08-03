import React, { useState, useContext, useEffect } from "react";
import DeleteButton from "../deleteButton/deleteButton";
import "./row.scss";
import { LangContext } from "../../context/lang";
import { DeleteContext } from "../../context/deleteBooking";

const Row = ({ id, roomName, day, btnTxt, setDisplay }) => {
    const { lang } = useContext(LangContext);
    const { deleteData } = useContext(DeleteContext);
    const [deleted, setDeleted] = useState({
        id,
        deleted: false,
    });

    useEffect(() => {
        if (deleteData.id === deleted.id) {
            setDeleted((prev) => ({ ...prev, deleted: deleteData.deleted }));
        }
    }, [deleteData.deleted]);

    return (
        <tr className={deleted.deleted ? "noRow" : "row"} rowid={id}>
            <td>{roomName}</td>
            {lang === "ca" || lang === "es" ? <td>{euroDate}</td> : <td>{day}</td>}
            <td>{time}</td>
            <td>
                <DeleteButton id={id} btnTxt={btnTxt} room={roomName} setDisplay={setDisplay} />
            </td>
        </tr>
    );
};

export default Row;
