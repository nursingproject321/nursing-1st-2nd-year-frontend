import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { EVENTS, GlobalEventEmitter } from "../../services";
import ShowSnackbarAlert from "../common/SnackBarAlert";

export default function RegisteredClinicalPlan() {
    const [clinicalPlan, setClinicalPlan] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/clinicalplan/");
                setClinicalPlan(response.data.data[0]); // Access the first (and only) data object
            } catch (error) {
                ShowSnackbarAlert({
                    message: error.response?.data?.message || "Error fetching data",
                    severity: "error"
                });
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Registered Clinical Plan"
        });
    }, []);

    return (
        <Box sx={{ margin: "10px 10px 10px 10px" }}>
            {clinicalPlan && (
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        Student ID:
                        {" "}
                        {clinicalPlan.studentId}
                    </Typography>
                    <Typography sx={{ marginBottom: 1 }}>
                        Begin Nursing Site:
                        {" "}
                        {clinicalPlan.begin_nursing_site}
                    </Typography>
                    <Typography sx={{ marginBottom: 1 }}>
                        Completing Nursing Site:
                        {" "}
                        {clinicalPlan.completing_nursing_site}
                    </Typography>
                    <Typography sx={{ marginBottom: 1 }}>
                        Semester Sequence:
                        {" "}
                        {clinicalPlan.semester_sequence}
                    </Typography>
                    <Typography sx={{ marginBottom: 1 }}>
                        Preferred Hospital Location:
                        {" "}
                        {clinicalPlan.preferred_hospital_location}
                    </Typography>
                    <Typography sx={{ marginBottom: 1 }}>
                        Preferred Community Location:
                        {" "}
                        {clinicalPlan.preferred_community_location}
                    </Typography>
                    <Typography sx={{ marginBottom: 1 }}>
                        Registered At:
                        {" "}
                        {new Date(clinicalPlan.createdAt).toLocaleString()}
                    </Typography>
                    {/* <Typography>
                        Updated At:
                        {" "}
                        {new Date(clinicalPlan.updatedAt).toLocaleString()}
                    </Typography> */}
                </CardContent>
            </Card>
            )}
        </Box>
    );
}
