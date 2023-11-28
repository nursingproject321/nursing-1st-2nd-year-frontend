import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams, useNavigate, useLocation
} from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Details from "./details";

function DetailsPage() {
    const { id } = useParams();
    const [apiResponse, setApiResponse] = useState(null);
    const endpoint = "/agency/id";

    useEffect(() => {
        axios.post(endpoint, {
            id
        })
            .then((response) => {
                setApiResponse(response.data);
            })
            .catch((error) => (
                <div>
                    Error fetching data:
                    {" "}
                    {error.response.data.message}
                </div>
            ));
    }, [id]);

    return (
        <Box
            sx={{
                margin: "10px 10px 10px 10px",
                textAlign: "center"
            }}
        >
            <div>
                {apiResponse ? (
                    <Details data={apiResponse} />
                ) : (
                    <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                    </Box>
                )}
            </div>
        </Box>
    );
}

export default DetailsPage;
