import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";

const AppRoute = ({ component: Component, layout: Layout, render, ...rest }) => {
    const { user } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user.logged) return <Redirect to="/login" />;
                return Component ? (
                    <Layout key="l">
                        <Component {...props} />
                    </Layout>
                ) : (
                    render(props)
                );
            }}
        />
    );
};
export default AppRoute;
