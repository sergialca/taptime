import React from "react";
import Row from "../row/row";
import "./table.scss";

const Table = ({ header, data, btnTxt, setDisplay }) => {
    return (
        <div className="containerTable">
            <table className="table">
                <thead>
                    <tr className="trHeader">
                        {header.map((h) => (
                            <th key={h.unique}>{h.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((el) => (
                        <Row
                            key={el.id}
                            id={el.id}
                            roomName={el.roomName}
                            day={el.day}
                            euroDate={el.euroDate}
                            timeId={el.timeId}
                            time={el.time}
                            btnTxt={btnTxt}
                            setDisplay={setDisplay}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
