import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField, Typography, Container, Grid, Divider
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useStore } from "../../store";
import { EVENTS, GlobalEventEmitter } from "../../services";

function ClinicalPlansList() {
    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { studentStore } = useStore();
    const { list, totalCount, fetched } = studentStore;

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
            text: "Clinical Plans"
        });
    });

    useEffect(() => {
        if (!fetched) {
            studentStore.fetch();
        }
        console.log("studentStore: ", studentStore);
    }, []);

    const [hoveredStudent, setHoveredStudent] = useState(null);

    const handleHover = (student) => {
        const hoveredList = list.find((item) => item.studentId === student.studentId);
        setHoveredStudent(hoveredList);
    };

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
                            <Tooltip
                                title={
                                    hoveredStudent ? (
                                        <div>
                                            <div>
                                                Student ID:
                                                {" "}
                                                {hoveredStudent.studentId}
                                            </div>
                                            <div>
                                                Name:
                                                {" "}
                                                {`${hoveredStudent.fname} ${hoveredStudent.lname}`}
                                            </div>
                                            <div>
                                                Email:
                                                {" "}
                                                {hoveredStudent.email}
                                            </div>
                                            <div>
                                                Year:
                                                {" "}
                                                {hoveredStudent.year}
                                            </div>
                                            <div>
                                                Term:
                                                {" "}
                                                {hoveredStudent.term}
                                            </div>
                                        </div>
                                    ) : ""
                                }
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ mt: "10px" }}
                                    onMouseEnter={() => handleHover(student)}
                                    onMouseLeave={() => setHoveredStudent(null)}
                                >
                                    {/* {`${student.fname} ${student.lname} - ${student.studentId}`} */}
                                    {`${student.studentId}`}
                                </Typography>
                            </Tooltip>
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
