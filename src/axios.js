import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;

export const getAuthTokenFromLocalStorage = () => localStorage.getItem("auth-token");

export const setTokenInHeader = () => {
    // axios.defaults.headers.common["x-auth-token"] = getAuthTokenFromLocalStorage();
    // eslint-disable-next-line operator-linebreak
    axios.defaults.headers.common["x-auth-token"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWMyMmUzNzE0ODM1Mzk3MGM0YjRjOCIsImlhdCI6MTY5NjQzMDk5Nn0.ANELuY4NqxiIh1wcGTjCOkMqZdD_dc0n6sH7V0jVRr0";
};

export const setAuthTokenToLocalStorage = (authToken) => {
    localStorage.setItem("auth-token", authToken);
    setTokenInHeader();
};
