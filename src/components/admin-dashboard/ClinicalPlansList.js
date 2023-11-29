import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField, Typography, Container, Grid, Divider
} from "@mui/material";
import { EVENTS, GlobalEventEmitter } from "../../services";

function ClinicalPlansList() {
    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
    // Fetch student placement details from the API
        axios.post("/clinicalplan")
            .then((response) => {
                setPlans(response.data.data);
                setFilteredPlans(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSearch = (event) => {
    // Use event.target.value directly to avoid lag
        setSearchTerm(event.target.value);

        // Filter placements based on search term
        const filtered = plans.filter((student) => student.studentId.includes(event.target.value));
        setFilteredPlans(filtered);
    };

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Student Placement Details"
        });
    });

    return (
        <Container style={{ height: "100vh", overflowY: "auto", marginBottom: "10px" }}>

            <TextField
                label="Search by Student ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearch}
            />

            <Grid container spacing={2}>
                {filteredPlans.map((student, index) => (
                    <React.Fragment key={student._id}>
                        <Grid
                            item
                            xs={12}
                        >
                            <Divider />
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ mt: "10px" }}
                            >
                                {/* {`${student.fname} ${student.lname} - ${student.studentId}`} */}
                                {`${student.studentId}`}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography>Site where student begun:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{student.begin_nursing_site}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography>Site where student will complete:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{student.completing_nursing_site}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography>Semester Sequence:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{student.semester_sequence}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography>Preferred Hospital Location:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{student.preffered_hospital_location}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography>Preferred Community Location:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{student.preffered_community_location}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        {/* {student.placements.map((placement, placementIndex) => (
                            <Grid
                                item
                                xs={12}
                                key={placementIndex}
                            >
                                <div>
                                    <Typography variant="subtitle1">{placement.agency.name}</Typography>
                                    <Typography variant="body2">
                                        {`Type: ${placement.agency.placement_type}, Agency Type: ${placement.agency.agency_type}`}
                                    </Typography>
                                </div>
                            </Grid>
                        ))} */}
                    </React.Fragment>
                ))}
            </Grid>
        </Container>
    );
}

export default ClinicalPlansList;
