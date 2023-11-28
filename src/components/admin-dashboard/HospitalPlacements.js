import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField, Typography, Container, Grid, Button, Box, Divider
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ShowSnackbarAlert from "../common/SnackBarAlert";
import { EVENTS, GlobalEventEmitter } from "../../services";

function HospitalPlacements() {
    const [agencies, setAgencies] = useState([]);
    const [selectedAgency, setSelectedAgency] = useState(null);
    const [students, setStudents] = useState([]);
    const [searchAgency, setSearchAgency] = useState("");
    const [searchStudent, setSearchStudent] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post("/agency/list", { type: "hospital" });
                setAgencies(response.data.data);
            } catch (error) {
                ShowSnackbarAlert({
                    message: error.response?.data?.message || "Error fetching data",
                    severity: "error"
                });
            }
        }

        fetchData();
    }, []);

    const handleAgencyChange = async (event, newValue) => {
        setSelectedAgency(newValue);

        try {
            const response = await axios.post("/agency/placements", { id: newValue._id });
            setStudents(response.data.agency.placements.map((placement) => placement.student));
        } catch (error) {
            ShowSnackbarAlert({
                message: error.response?.data?.message || "Error fetching placements",
                severity: "error"
            });
        }
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Hospital Placements
            </Typography>

            <Autocomplete
                options={agencies}
                getOptionLabel={(option) => option.name}
                value={selectedAgency}
                onChange={handleAgencyChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Agencies"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            {selectedAgency && (
                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        {selectedAgency.name}
                    </Typography>

                    <TextField
                        label="Search Students"
                        variant="outlined"
                        fullWidth
                        value={searchStudent}
                        onChange={(e) => setSearchStudent(e.target.value)}
                    />

                    <Grid
                        container
                        spacing={2}
                        mt={2}
                    >
                        {students
                            .filter((student) => student.fname.toLowerCase().includes(searchStudent.toLowerCase())
                                || student.lname.toLowerCase().includes(searchStudent.toLowerCase()))
                            .map((student) => (
                                <Grid
                                    item
                                    key={student._id}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <Typography>
                                        {`${student.fname} ${student.lname}`}
                                    </Typography>
                                    <Typography>
                                        {`Email: ${student.email}`}
                                    </Typography>
                                    <Typography>
                                        {`Year: ${student.year}, Term: ${student.term}`}
                                    </Typography>
                                    <Divider />
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
}

export default HospitalPlacements;
