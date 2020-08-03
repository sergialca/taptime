import React, { useState } from "react";
import { MdMail, MdInfo } from "react-icons/md";
import { BsLockFill, BsPersonFill } from "react-icons/bs";
import SubmitButton from "../submitButton/submitButton";
import Input from "../input/input";
import FormError from "../formError/formError";
import Parse from "parse";
import "./registerForm.scss";

const RegisterForm = ({ showAlert, content }) => {
    const [account, setAccount] = useState({ mail: "", psw: "", name: "", rePsw: "" });
    const [error, setError] = useState({ mail: "", psw: "", rePsw: "", name: "", submit: "" });
    const [loading, setLoading] = useState(false);

    const accountChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const validMail = () => {
        if (
            account.mail &&
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                account.mail
            )
        ) {
            setError((error) => ({ ...error, mail: content.mailError }));
            return false;
        } else if (!account.mail) {
            setError((error) => ({ ...error, mail: content.mailRequired }));
            return false;
        } else {
            setError((error) => ({ ...error, mail: "" }));
            return true;
        }
    };

    const validPsw = () => {
        if (account.psw && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(account.psw)) {
            setError((error) => ({
                ...error,
                psw: content.pswRule,
            }));
            return false;
        } else if (!account.psw) {
            setError((error) => ({
                ...error,
                psw: content.pswRequired,
            }));
            return false;
        } else {
            setError((error) => ({
                ...error,
                psw: "",
            }));
            return true;
        }
    };

    const validRePsw = () => {
        if (account.psw !== account.rePsw) {
            setError((error) => ({ ...error, rePsw: content.rePswError }));
            return false;
        } else if (!account.rePsw) {
            setError((error) => ({ ...error, rePsw: content.rePswRequired }));
            return false;
        } else {
            setError((error) => ({ ...error, rePsw: "" }));
            return true;
        }
    };

    const validName = () => {
        if (!account.name) {
            setError((error) => ({ ...error, name: content.nameRequired }));
            return false;
        } else {
            setError((error) => ({ ...error, name: "" }));
            return true;
        }
    };

    const mailVerification = () => {
        const https = require("https");
        const params = { email: account.mail };

        const req = https.request(options, (res) => {
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on("end", () => {
                console.log("No more data in response.");
            });
        });

        req.on("error", (e) => {
            console.error(`Problem with request: ${e.message}`);
        });
        req.write(params);
        req.end();
    };

    const signIn = (e) => {
        e.preventDefault();
        setLoading(true);
        setError((error) => ({ ...error, submit: "" }));
        const mail = validMail();
        const name = validName();
        const psw = validPsw();
        const rePsw = validRePsw();
        if (mail && psw && rePsw && name) {
            const user = new Parse.User();
            user.set("name", account.name);
            user.signUp()
                .then((user) => {
                    setError((error) => ({ ...error, submit: content.submitOk }));
                    mailVerification();
                })
                .catch((error) => {
                    setError((error) => ({ ...error, submit: content.submitError }));
                })
                .finally(() => setLoading(false));
        } else setLoading(false);
    };

    return (
        <div className="formWrapper">
            <p className="signinTxt">{content.signupTitle}</p>
            <form className="signinForm" onSubmit={signIn}>
                <Input
                    name="name"
                    account={account.name}
                    accountChange={accountChange}
                    placeholder={content.namePlaceholder}
                    type=""
                >
                    <span className="svg">
                        <BsPersonFill />
                    </span>
                </Input>
                <FormError txt={error.name} />
                <Input
                    name="mail"
                    account={account.mail}
                    accountChange={accountChange}
                    placeholder="Mail"
                    type="mail"
                >
                    <span className="svg">
                        <MdMail />
                    </span>
                </Input>
                <FormError txt={error.mail} />
                <div className="inputInfoContainer space">
                    <div className="inputInfoWrapper">
                        <span>
                            <BsLockFill />
                        </span>
                        <input
                            className="inputInfo"
                            name="psw"
                            type="password"
                            value={account.psw}
                            onChange={accountChange}
                            placeholder={content.pswPlaceholder}
                        />
                    </div>
                    <MdInfo onClick={() => showAlert()} className="info" />
                </div>
                <FormError txt={error.psw} />
                <Input
                    name="rePsw"
                    account={account.rePsw}
                    accountChange={accountChange}
                    placeholder={content.rePswPlaceholder}
                    type="password"
                >
                    <span>
                        <BsLockFill />
                    </span>
                </Input>
                <FormError txt={error.rePsw} />
                <div className="signinBtnWrapper">
                    <SubmitButton loading={loading} txt={content.submitBtn} />
                </div>
                <FormError txt={error.submit} />
            </form>
        </div>
    );
};

export default RegisterForm;
