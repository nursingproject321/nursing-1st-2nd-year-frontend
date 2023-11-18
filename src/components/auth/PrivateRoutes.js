// PrivateRoute.js
// import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../services";

function PrivateRoute({ component: Component, userType, ...rest }) {
    const isAuthenticated = () => {
    // Check if the user is authenticated based on your logic
    // You can use localStorage or any other state management approach
        const { userData } = useContext(UserContext);

        // For example, if you are storing user information in localStorage:
        const { user } = userData;

        return user && user.type === userType;
    };

    return (
        <Route
            {...rest}
            render={(props) => (isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            ))}
        />
    );
}

export default PrivateRoute;
