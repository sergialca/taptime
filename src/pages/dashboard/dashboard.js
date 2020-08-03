import React, { useContext, useEffect, useState } from "react";
import dashboardCa from "../../json/dashboardCa.json";
import dashboardEs from "../../json/dashboardEs.json";
import Room from "../../components/room/room";
import Select from "react-select";
import TimeAlert from "../../components/alert/timeAlert";
import ResponseAlert from "../../components/alert/responseAlert";
import ClipLoader from "react-spinners/ClipLoader";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import { LangContext } from "../../context/lang";
import { FiltersContext } from "../../context/filters";
import { BookingContext } from "../../context/booking";
import { UserContext } from "../../context/user";
import { newBooking, getValUserLoged, getRooms, getBooking, getRoom } from "../../api/api";
import moment from "moment";
import "./dashboard.scss";

const Dashboard = (props) => {
    const { lang } = useContext(LangContext);
    const { filters, setFilters } = useContext(FiltersContext);
    const { booking, setBooking } = useContext(BookingContext);
    const { user } = useContext(UserContext);
    const [display, setDisplay] = useState({
        timeAlert: false,
        loading: false,
        loadingBtn: false,
        responseAlert: false,
        response: "ok",
    });
    const [datePicker, setDayPicker] = useState({ focus: false });
    const [selectable, setSelectable] = useState([]);
    const [rooms, setRooms] = useState([]);

    const selectLang = () => {
        if (lang === "ca") {
            return dashboardCa;
        } else if (lang === "es") {
            return dashboardEs;
        }
    };
    const [content, setContent] = useState(selectLang());

    useEffect(() => {
        if (lang === "ca") {
            setContent(() => dashboardCa);
        } else if (lang === "es") {
            setContent(() => dashboardEs);
        }
        changeLangSelect();
    }, [lang]);

    const dbRooms = async () => {
        setDisplay((prev) => ({
            ...prev,
            loading: true,
        }));
        const resRooms = await getRooms();
        for (let i = 0; i < resRooms.length; i++) {
            const bo = await getBooking(filters.dayFormatted, resRooms[i].id);
            if (bo.length > 0) {
                const reNew = bo.map((t) => {
                    return t.attributes.time;
                });
                reNew.map((tt) => {
                    resRooms[i].attributes.times.map((et, pos) => {
                        if (tt === et.timeInt) resRooms[i].attributes.times.splice(pos, 1);
                        return tt;
                    });
                    return tt;
                });
            }
            if (resRooms[i].attributes.times.length === 0) {
                resRooms[i].attributes.times.push("No time available");
            }
            if (i === 0) setRooms(() => [resRooms[i]]);
            else setRooms((prev) => [...prev, resRooms[i]]);
        }
        setDisplay((prev) => ({
            ...prev,
            loading: false,
        }));
        setFilters((prev) => ({ ...prev, select: false, dayPicker: false }));
        return;
    };

    const dbRoom = async () => {
        setDisplay((prev) => ({
            ...prev,
            loading: true,
        }));
        const resRooms = await getRoom(filters.room);
        const bo = await getBooking(filters.dayFormatted, resRooms[0].id);
        if (bo.length > 0) {
            const reNew = bo.map((t) => {
                return t.attributes.time;
            });
            reNew.map((tt) => {
                resRooms[0].attributes.times.map((et, pos) => {
                    if (tt === et.timeInt) resRooms[0].attributes.times.splice(pos, 1);
                    return tt;
                });
                return tt;
            });
        }
        if (resRooms[0].attributes.times.length === 0) {
            resRooms[0].attributes.times.push("No time available");
        }
        setRooms(() => [resRooms[0]]);
        setDisplay((prev) => ({
            ...prev,
            loading: false,
        }));
        setFilters((prev) => ({ ...prev, select: false, dayPicker: false }));
        return;
    };

    const changeLangSelect = () => {
        const leng = selectable.length;
        if (leng > 0) {
            for (let i = 0; i < selectable.length; i++) {
                if (i === selectable.length - 1) {
                    //Should use setSelectable?
                    selectable[i].label = lang === "ca" ? "Totes" : lang === "es" ? "Todas" : "All";
                    //setSelectable(() => selectable);?
                }
            }
        }
    };

    const selectableRooms = async () => {
        const results = await getRooms();
        for (let i = 0; i < results.length; i++) {
            if (i === 0) {
                setSelectable(() => [{ value: results[i].id, label: results[i].attributes.name }]);
            } else if (i === results.length - 1) {
                setSelectable((prev) => [
                    ...prev,
                    { value: results[i].id, label: results[i].attributes.name },
                    {
                        value: "all",
                        label: lang === "ca" ? "Totes" : lang === "es" ? "Todas" : "All",
                    },
                ]);
            } else {
                setSelectable((prev) => [
                    ...prev,
                    { value: results[i].attributes.name, label: results[i].attributes.name },
                ]);
            }
        }
    };

    useEffect(() => {
        //verifyUser();
        selectableRooms();
        dbRooms();
        return () => {
            setDisplay((dis) => ({ ...dis, timeAlert: false }));
        };
    }, []);

    useEffect(() => {
        if (filters.select || filters.dayPicker) {
            if (filters.roomId === "all") {
                dbRooms();
            } else {
                dbRoom();
            }
        }
    }, [filters.select, filters.dayPicker]);

    const aceptarTimeAlert = async () => {
        setDisplay((prev) => ({ ...prev, loadingBtn: true }));
        const newBo = await newBooking(filters.dayEuropean);
        if (newBo) {
            setBooking((prev) => ({
                ...prev,
                booked: true,
            }));
            setDisplay((dis) => ({
                ...dis,
                timeAlert: false,
                responseAlert: true,
                loadingBtn: false,
                response: "ok",
            }));
        } else
            setDisplay((dis) => ({
                ...dis,
                timeAlert: false,
                responseAlert: true,
                loadingBtn: false,
                response: "fail",
            }));
    };

    const cancelar = () => {
        setDisplay((dis) => ({ ...dis, timeAlert: false }));
    };

    const aceptarResponseAlert = async () => {
        setDisplay((dis) => ({ ...dis, responseAlert: false }));
    };

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            borderRadius: "250px",
            width: "120px",
            fontSize: "16px",
            padding: "0.5px",
        }),
    };

    return (
        <div className="dashboard">
            <ResponseAlert
                aceptar={aceptarResponseAlert}
                response={display.response}
                txtOk={content.successAlertOkTxt}
                txtFail={content.successAlertFailTxt}
                btnTxt={content.successAlertBtn}
                display={display.responseAlert}
            />
            <TimeAlert
                display={display.timeAlert}
                txt={content}
                aceptar={aceptarTimeAlert}
                cancelar={cancelar}
                loadingBtn={display.loadingBtn}
            />
            <div className="filters">
                <div className="labelInput">
                    <span className="label">{content.day}:</span>
                    <SingleDatePicker
                        date={filters.day}
                        onDateChange={(date) =>
                            setFilters((prev) => ({
                                ...prev,
                                day: date,
                                dayPicker: true,
                            }))
                        }
                        focused={datePicker.focus} // PropTypes.bool
                        onFocusChange={({ focused }) => {
                            setDayPicker(() => ({ focus: focused }));
                        }}
                        numberOfMonths={1}
                        displayFormat={"DD/MM/YYYY"}
                        readOnly={true}
                        firstDayOfWeek={1}
                        isOutsideRange={(day) =>
                            day.isBefore(moment().hours(0)) || day.isAfter(moment().add(7, "days"))
                        }
                        id="dayComp"
                    />
                </div>
                <div className="labelInput second">
                    <span className="label">{content.room}:</span>
                    <Select
                        styles={colourStyles}
                        options={selectable}
                        defaultValue={selectable[2]}
                        placeholder={content.all}
                        onChange={(val) =>
                            setFilters((prev) => ({
                                ...prev,
                                room: val.label,
                                roomId: val.value,
                                select: true,
                            }))
                        }
                    />
                </div>
            </div>
            <div className="rooms">
                {display.loading ? (
                    <ClipLoader color={"#0093fc"} size={50} />
                ) : filters.isSunday ? (
                    <span className="isSunday">{content.close}</span>
                ) : (
                    rooms.map((m) => {
                        return (
                            <Room
                                key={m._objCount}
                                name={m.attributes.name}
                                time={m.attributes.times}
                                roomId={m.id}
                                setDisplay={setDisplay}
                                dayFormatted={filters.dayFormatted}
                                noTimes={content.complete}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Dashboard;
