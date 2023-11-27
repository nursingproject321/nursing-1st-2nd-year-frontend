import React, {
    useContext, useRef, useCallback, useEffect, useState
} from "react";
import { redirect, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { Box } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import TextField from "../common/TextField";
import LoadingButton from "../common/LoadingButton";
import ShowSnackbarAlert from "../common/SnackBarAlert";
import * as ValidateUtils from "./utils";
import { UserContext } from "../../services";
import Logo from "../../images/logo.png";
import { setAuthTokenToLocalStorage, setSessionTokenToLocalStorage } from "../../axios";

export default function Login() {
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const btnRef = useRef(null);

    const handleLogin = async (userType) => {
        try { // Perform login logic
            const username = usernameRef.current.value();
            const password = passwordRef.current.value();
            // console.log(username, password);
            const isUsernameValid = ValidateUtils.validateUsername(username, usernameRef.current);
            // const isPasswordValid = ValidateUtils.validatePassword(password, passwordRef.current);
            // if (!isUsernameValid || !isPasswordValid) {
            if (!isUsernameValid) {
                throw new Error();
            }
            const res = await axios.post(
                "/user/login",
                {
                    username,
                    password
                // user_type: userType
                }
            );
            const { user } = res.data;
            setUserData({ user, fetched: true });
            const route = userType === "admin" ? "/admin" : "/student";
            navigate(route);
            // navigate("/student");
        } catch (err) {
            console.error(err);
            ShowSnackbarAlert({ message: err.response.data.message, severity: "error" });
        }
    };

    const handleAdminLogin = () => {
        handleLogin("admin");
    };

    const handleStudentLogin = () => {
        handleLogin("student");
    };

    function renderUsername() {
        return (
            <TextField
                label="Username"
                ref={usernameRef}
                autoFocus
                required
                // onKeyDown={handleKeyDown}
                autoComplete="off"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    )
                }}
            />
        );
    }

    function renderPassword() {
        return (
            <TextField
                label="Password"
                ref={passwordRef}
                type="password"
                autoComplete="off"
                required
                // onKeyDown={handleKeyDown}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    )
                }}
            />
        );
    }

    function renderAdminLoginBtn() {
        return (
            <LoadingButton
                ref={btnRef}
                label="Admin Login"
                // onClick={handleSubmit}
                onClick={handleAdminLogin}
                sx={{ mt: 3, width: 150 }}
            />
        );
    }

    function renderStudentLoginBtn() {
        return (
            <LoadingButton
                ref={btnRef}
                label="Student Login"
                // onClick={handleStudentSubmit}
                onClick={handleStudentLogin}
                sx={{ mt: 3, width: 150, ml: 3 }}
            />
        );
    }

    function renderTopBar() {
        return (
            <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Link href="/">
                        <img src={Logo} style={{ width: "40px", height: "40px" }} />
                    </Link>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, ml: 1, mt: -1 }}
                    >
                        Nursing Placement Schedular
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }

    // const { user } = userData;
    // if (user) {
    //     console.log("Logged In");
    //     navigate("/student");
    // } else {
    //     console.log("Not Logged In");
    // }

    useEffect(() => {
        const { user } = userData;

        if (user) {
            const userType = user.type;
            navigate(`/${userType}`);
        }
    }, []);

    return (
        <Box sx={{ overflow: "auto" }}>
            {renderTopBar()}
            <Paper
                elevation={4}
                square={false}
                sx={{
                    width: { xs: "95%", lg: "30%" },
                    margin: "5% auto",
                    textAlign: "center",
                    borderRadius: 5,
                    p: 3
                }}
            >

                <Typography
                    color="primary"
                    variant="h5"
                    noWrap
                    component="div"
                    p={1}
                >
                    Login
                </Typography>

                {renderUsername()}
                {renderPassword()}
                {renderAdminLoginBtn()}
                {renderStudentLoginBtn()}
            </Paper>
        </Box>
    );
}

// import React, {
//     useContext, useRef, useCallback, useEffect, useState
// } from "react";
// import { redirect, useNavigate } from "react-router-dom";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import InputAdornment from "@mui/material/InputAdornment";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import LockIcon from "@mui/icons-material/Lock";
// import { Box } from "@mui/system";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
// import axios from "axios";
// import TextField from "../common/TextField";
// import LoadingButton from "../common/LoadingButton";
// import ShowSnackbarAlert from "../common/SnackBarAlert";
// import * as ValidateUtils from "./utils";
// import { UserContext } from "../../services";
// import Logo from "../../images/logo.png";
// import { setAuthTokenToLocalStorage, setSessionTokenToLocalStorage } from "../../axios";

// export default function Login() {
//     // const { userData, setUserData } = useContext(UserContext);
//     const [userData, setUserData] = useState({ user: null, fetched: false });
//     const navigate = useNavigate();

//     const [loginResponse, setLoginResponse] = useState(null);
//     const [agencyResponse, setAgencyResponse] = useState(null);

//     const usernameRef = useRef(null);
//     const passwordRef = useRef(null);
//     const userTypeRef = useRef(null);
//     const btnRef = useRef(null);

//     useEffect(() => {
//         console.log(userData);
//         localStorage.setItem("userdata", userData);
//         ShowSnackbarAlert({ message: "Logged in successfully" });
//         // navigate("/studentdashboard");
//     }, [userData]);

//     const validate = useCallback((email, password) => {
//         usernameRef.current.setError(email ? null : "Please enter the username");
//         passwordRef.current.setError(password ? null : "Please enter the password");
//         return email && password;
//     }, []);

//     const sendLoginReq = async (userType) => {
//         try {
//             const username = usernameRef.current.value();
//             const password = passwordRef.current.value();
//             // console.log(username, password);
//             const isUsernameValid = ValidateUtils.validateUsername(username, usernameRef.current);
//             // const isPasswordValid = ValidateUtils.validatePassword(password, passwordRef.current);
//             // if (!isUsernameValid || !isPasswordValid) {
//             if (!isUsernameValid) {
//                 throw new Error();
//             }
//             const res = await axios.post(
//                 "/user/login",
//                 {
//                     username,
//                     password,
//                     user_type: userType
//                 }
//             );
//             setUserData({ user: res.data.user, fetched: true });
//         } catch (err) {
//             // console.error(err);
//             ShowSnackbarAlert({ message: err.response.data.message, severity: "error" });
//         }
//     };

//     const handleStudentLogin = () => {
//         sendLoginReq("student");
//     };

//     const handleAdminLogin = async () => {
//         try {
//             const username = usernameRef.current.value();
//             const password = passwordRef.current.value();
//             const isUsernameValid = ValidateUtils.validateUsername(username, usernameRef.current);
//             const isPasswordValid = ValidateUtils.validatePassword(password, passwordRef.current);
//             if (!isUsernameValid || !isPasswordValid) {
//                 throw new Error();
//             }
//             const res = await axios.post(
//                 "/user/login",
//                 {
//                     username,
//                     password,
//                     user: "admin"
//                 }
//             );
//             const { user } = res.data;
//             setUserData({ user, fetched: true, user_type: "student" });
//             localStorage.setItem("userData", JSON.stringify(userData));
//             // navigate("/studentdashboard");
//             ShowSnackbarAlert({ message: "Logged in successfully" });
//         } catch (err) {
//             // console.error(err);
//             ShowSnackbarAlert({ message: err.response.data.message, severity: "error" });
//         }
//     };

//     // const sendLoginRequest = async () => {
//     //     console.log("Huh!?");
//     //     const response = await fetch("http://localhost:8000/user/login", {
//     //         method: "POST",
//     //         headers: {
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify({
//     //             username: "alex@uwindsor.ca",
//     //             password: "alex"
//     //         })
//     //     });

//     //     const responseBody = await response.json();
//     //     setLoginResponse(responseBody);

//     //     // Extract the session token from the response headers
//     //     console.log("Session token: ", response);
//     //     const sessionToken = response.headers.get("set-cookie");
//     // };

//     const handleTempSubmit = async () => {
//         // sendLoginRequest();
//         const username = "alex@uwindsor.ca";
//         const password = "alex";
//         const response = await axios.post(
//             "/user/login",
//             {
//                 username,
//                 password
//             }
//         );
//         navigate("/studentdashboard");
//     };
//     // const handleSubmit = async () => {
//     //     try {
//     //         // debugger;
//     //         const username = usernameRef.current.value();
//     //         const password = passwordRef.current.value();

//     //         const isUsernameValid = ValidateUtils.validateUsername(username, usernameRef.current);
//     //         const isPasswordValid = ValidateUtils.validatePassword(password, passwordRef.current);

//     //         if (!isUsernameValid || !isPasswordValid) {
//     //             throw new Error();
//     //         }

//     //         const res = await axios.post("/user/login", { username, password });
//     //         const { token, user } = res.data;
//     //         setUserData({ token, user, fetched: true });
//     //         setAuthTokenToLocalStorage(token);
//     //         ShowSnackbarAlert({ message: "Logged in successfully" });
//     //     } catch (err) {
//     //         ShowSnackbarAlert({ message: err.response.data.message, severity: "error" });
//     //     }
//     // };

//     // const handleStudentSubmit = async () => {
//     //     try {
//     //         const username = usernameRef.current.value();
//     //         const password = passwordRef.current.value();

//     //         const isUsernameValid = ValidateUtils.validateUsername(username, usernameRef.current);
//     //         const isPasswordValid = ValidateUtils.validatePassword(password, passwordRef.current);

//     //         if (!isUsernameValid || !isPasswordValid) {
//     //             throw new Error();
//     //         }

//     //         const res = await axios.post("/user/StudentDashboard", { username, password });
//     //         const { token, user } = res.data;
//     //         setUserData({ token, user, fetched: true });
//     //         setAuthTokenToLocalStorage(token);
//     //         ShowSnackbarAlert({ message: "Logged in successfully" });
//     //     } catch (err) {
//     //         ShowSnackbarAlert({ message: err.response.data.message, severity: "error" });
//     //     }
//     // };

//     // const handleStudentSubmit = async () => {
//     //     window.location.replace("/studentdashboard");
//     // };

//     const handleKeyDown = useCallback((event) => {
//         if (event.key === "Enter") {
//             btnRef.current.click();
//         }
//     });

//     function renderRegisterOption() {
//         // return (
//         //     <Typography
//         //             color="primary"
//         //             align="right"
//         //             sx={{
//         //                 textDecoration: "underline",
//         //                 mt: 3,
//         //                 cursor: "pointer",
//         //                 display: "inline-block",
//         //                 float: "right"
//         //             }}
//         //             onClick={() => { navigate("/register"); }}
//         //         >
//         //             Register
//         //         </Typography>
//         // )

//         return "";
//     }

//     function renderUsername() {
//         return (
//             <TextField
//                 label="Username"
//                 ref={usernameRef}
//                 autoFocus
//                 required
//                 onKeyDown={handleKeyDown}
//                 autoComplete="off"
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <AccountCircle />
//                         </InputAdornment>
//                     )
//                 }}
//             />
//         );
//     }

//     function renderPassword() {
//         return (
//             <TextField
//                 label="Password"
//                 ref={passwordRef}
//                 type="password"
//                 autoComplete="off"
//                 required
//                 onKeyDown={handleKeyDown}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <LockIcon />
//                         </InputAdornment>
//                     )
//                 }}
//             />
//         );
//     }

//     function renderStudentLoginBtn() {
//         return (
//             <LoadingButton
//                 ref={btnRef}
//                 label="Student Login"
//                 // onClick={handleSubmit}
//                 onClick={handleStudentLogin}
//                 sx={{ mt: 3, width: 150 }}
//             />
//         );
//     }

//     function renderAdminLoginBtn() {
//         return (
//             <LoadingButton
//                 ref={btnRef}
//                 label="Admin Login"
//                 // onClick={handleStudentSubmit}
//                 onClick={handleAdminLogin}
//                 sx={{ mt: 3, width: 150, ml: 3 }}
//             />
//         );
//     }

//     function renderTopBar() {
//         return (
//             <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//                 <Toolbar>
//                     <Link href="/">
//                         <img src={Logo} style={{ width: "40px", height: "40px" }} />
//                     </Link>
//                     <Typography
//                         variant="h6"
//                         component="div"
//                         sx={{ flexGrow: 1, ml: 1, mt: -1 }}
//                     >
//                         Nursing Placement Schedular
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//         );
//     }

//     return (
//         <Box sx={{ overflow: "auto" }}>
//             {renderTopBar()}
//             <Paper
//                 elevation={4}
//                 square={false}
//                 sx={{
//                     width: { xs: "95%", lg: "30%" },
//                     margin: "5% auto",
//                     textAlign: "center",
//                     borderRadius: 5,
//                     p: 3
//                 }}
//             >

//                 <Typography
//                     color="primary"
//                     variant="h5"
//                     noWrap
//                     component="div"
//                     p={1}
//                 >
//                     Login
//                 </Typography>

//                 {renderUsername()}
//                 {renderPassword()}
//                 {renderRegisterOption()}
//                 {renderAdminLoginBtn()}
//                 {renderStudentLoginBtn()}
//             </Paper>
//         </Box>
//     );
// }
