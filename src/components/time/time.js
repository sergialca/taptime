import React, { useContext, useState, useEffect } from "react";
import { BookingContext } from "../../context/booking";
import "./time.scss";

const Time = ({ time, setDisplay, dayFormatted }) => {
    const { booking, setBooking } = useContext(BookingContext);
    const [localState, setLocalState] = useState({
        booked: false,
    });

    const onTimeClick = () => {
        setBooking(() => ({
            dayFormatted,
            booked: false,
        }));
        setDisplay((prev) => ({ ...prev, timeAlert: true }));
    };

    useEffect(() => {
        if (booking.timeId === localState.timeId && booking.booked) {
            setLocalState((prev) => ({ ...prev, booked: true }));
        }
    }, [booking.booked]);

    return (
        <div className={localState.booked ? "noTime" : "timebadge"} onClick={() => onTimeClick()}>
            <span>{time}</span>
        </div>
    );
};

export default Time;
