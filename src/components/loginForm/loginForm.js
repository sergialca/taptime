import React, { useState, useContext } from "react";
import { MdMail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import SubmitButton from "../submitButton/submitButton";
import Input from "../input/input";
import FormError from "../formError/formError";
import { UserContext } from "../../context/user";
import Parse from "parse";
import "./loginForm.scss";

const LoginForm = ({ content, history }) => {
    const [account, setAccount] = useState({ mail: "", psw: "" });
    const [error, setError] = useState({ mail: "", psw: "", submit: "" });
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);

    const accountChange = (e) => {
        setError((error) => ({ ...error, mail: "", psw: "" }));
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
            setError((error) => ({ ...error, psw: content.pswRule }));
            return false;
        } else if (!account.psw) {
            setError((error) => ({ ...error, psw: content.pswRequired }));
            return false;
        } else {
            setError((error) => ({ ...error, psw: "" }));
            return true;
        }
    };

    const logIn = (e) => {
        e.preventDefault();
        setLoading(true);
        setError((error) => ({ ...error, submit: "" }));
        const mail = validMail();
        const psw = validPsw();
        if (mail && psw) {
            Parse.User.logIn(account.mail, account.psw)
                .then((newUser) => {})
                .catch((error) => {
                    error.code === 205
                        ? setError((error) => ({ ...error, submit: content.submitErrorVerify }))
                        : setError((error) => ({ ...error, submit: content.submitError }));
                })
                .finally(() => {
                    setLoading(false);
                });
        } else setLoading(false);
    };

    return (
        <div className="formWrapper">
            <p className="loginTxt">{content.loginTitle}</p>
            <form className="loginForm" onSubmit={logIn}>
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
                <Input
                    name="psw"
                    account={account.psw}
                    accountChange={accountChange}
                    placeholder={content.pswPlaceholder}
                    type="password"
                >
                    <span>
                        <BsLockFill />
                    </span>
                </Input>
                <FormError txt={error.psw} />
                <div className="loginBtnWrapper space">
                    <SubmitButton loading={loading} txt={content.submitBtn} />
                </div>
                <FormError txt={error.submit} />
                <div className="space recover">
                    <span>{content.recoveryTxt} </span>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
