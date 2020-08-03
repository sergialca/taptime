import axios from "axios";
import Parse from "parse";

const url = "https://parseapi.back4app.com";
const appId = "";
const normalHeaders = {
    "X-Parse-Application-Id": appId,
    "X-Parse-REST-API-Key": "",
    "Content-Type": "application/json",
};
const saveError = async (e, description) => {
    if (e.mail) {
        await axios({
            method: "post",
            url: `${url}/classes/Errors`,
            headers: normalHeaders,
            data: {
                code: 401,
                error: "Network Error",
                description,
            },
        });
    } else {
        await axios({
            method: "post",
            url: `${url}/classes/Errors`,
            headers: normalHeaders,
            data: {
                code: e.response.data.code,
                error: e.response.data.error,
                description,
            },
        });
    }

    return;
};

export const getValUserLoged = async (token) => {
    try {
        const val = await axios({
            method: "get",
            url: `${url}/users/me`,
            headers: {
                "X-Parse-Application-Id": appId,
                "X-Parse-REST-API-Key": "",
                "X-Parse-Session-Token": token,
            },
        });
        return val;
    } catch (e) {
        saveError(e, "El token no se ha encontrado al verificar usuario");
        return false;
    }
};

export const isUserLoged = async () => {
    const session = JSON.parse(localStorage.getItem(`Parse/${appId}/currentUser`));
    const localUser = session ? await getValUserLoged(session.sessionToken) : "";
    return localUser ? true : false;
};

export const getRooms = async () => {
    const rooms = Parse.Object.extend("Rooms");
    const query = new Parse.Query(rooms);
    let roomsRes = await query.find();
    return roomsRes;
};

export const getRoom = async (roomName) => {
    const Rooms = Parse.Object.extend("Rooms");
    const query = new Parse.Query(Rooms);
    query.equalTo("name", roomName);
    let res = await query.find();
    return res;
};

export const getRoomById = async (id) => {
    const Rooms = Parse.Object.extend("Rooms");
    const query = new Parse.Query(Rooms);
    let res = await query.get(id);
    return res;
};

export const logout = async () => {
    const noUser = await Parse.User.logOut();
    return;
};
