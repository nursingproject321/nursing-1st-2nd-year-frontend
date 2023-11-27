// Import necessary components and modules
import "./scss/common.scss";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Div100vh from "react-div-100vh";
import axios from "axios";
import Topbar from "./components/topbar";
import LeftMenu from "./components/left-menu";
import AppRoutes from "./App-routes";
import ShowSnackbarAlert from "./components/common/SnackBarAlert";
import { UserContextProvider } from "./services";
import { Theme } from "./theme";
import {
    getAuthTokenFromLocalStorage,
    setAuthTokenToLocalStorage
} from "./axios";
// eslint-disable-next-line import/extensions
import HospitalList from "./components/student-dashboard/HospitalList.js";
// eslint-disable-next-line import/extensions

export default function App() {
    const [userData, setUserData] = useState({
        user: undefined,
        fetched: false
    });

    // const fetchCurrentUser = useCallback(async () => {
    //     userData = localStorage.getItem("userdata");
    //     return {
    //         user: userData.user
    //     };
    // }, []);

    const checkIfUserLoggedIn = useCallback(async () => {
        try {
            const res = await axios.post("/user/details");
            if (res.data.loggedin) {
                const { user } = res.data;
                setUserData({ user, fetched: true });
            }
        } catch (error) {
            console.log("Error Fetching user details");
            ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
        }
        // const user = JSON.parse(localStorage.getItem("userdata"));
        // console.log("user set:", user);
        // if (user) {
        //     setUserData({
        //         user,
        //         fetched: true
        //     });
        // }
    }, []);

    useEffect(() => {
        checkIfUserLoggedIn();
    }, []);

    function renderContent() {
        return (
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Div100vh style={{
                    display: "flex",
                    flexDirection: "column"
                }}
                >
                    <Topbar />
                    <AppRoutes />
                </Div100vh>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={Theme}>
            <BrowserRouter>
                <UserContextProvider value={{ userData, setUserData }}>
                    <Box sx={{ display: "flex" }}>
                        <CssBaseline />
                        <LeftMenu />
                        {renderContent()}
                    </Box>
                </UserContextProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}
