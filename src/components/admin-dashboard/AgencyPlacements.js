import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Grid,
    Button
} from "@mui/material";
import ShowSnackbarAlert from "../common/SnackBarAlert";

function AgencyPlacements(props) {
    const { agencyType } = props;
    const [agencyList, setAgencyList] = useState([]);
    const [filteredAgencies, setFilteredAgencies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedAgencyId, setSelectedAgencyId] = useState(null);
    const [agencyPlacements, setAgencyPlacements] = useState([]);
    const [studentsFetched, setStudentsFetched] = useState(false);

    const handleAgencyClick = async (agencyId) => {
        setSelectedAgencyId(agencyId);
    };

    const fetchAgencyPlacements = async () => {
        try {
            const response = await axios.post("/agency/placements", {
                id: selectedAgencyId
            });
            setAgencyPlacements(response.data.agency.placements);
            setStudentsFetched(true);
        } catch (error) {
            ShowSnackbarAlert({
                message: error.response?.data?.message || "Error fetching placements",
                severity: "error"
            });
        }
    };

    useEffect(() => {
        if (selectedAgencyId) {
            fetchAgencyPlacements();
        }
    }, [selectedAgencyId]);

    const handleBack = async () => {
        setAgencyPlacements([]);
        setSelectedAgencyId(null);
        setStudentsFetched(false);
    };

    const fetchAgencies = async () => {
        try {
            const response = await axios.post("/agency/list", {
                type: agencyType
            });
            setAgencyList(response.data.data);
            setFilteredAgencies(response.data.data);
        } catch (error) {
            ShowSnackbarAlert({
                message: error.response?.data?.message || "Error fetching data",
                severity: "error"
            });
        }
    };

    useEffect(() => {
        handleBack();
        fetchAgencies();
    }, [agencyType]);

    const handleSearchChange = (event) => {
        // event.persist();

        const search = event.target.value.toLowerCase();
        setSearchTerm(search);

        // Use the searchTerm directly instead of relying on the previous state
        setFilteredAgencies(agencyList.filter((agency) => agency.name.toLowerCase().includes(search)));
    };

    const renderAgencies = () => (
        <>
            <Typography variant="h5" gutterBottom>
                {agencyType === "hospital" ? "Hospital Placements" : "Community Placements"}
            </Typography>

            <TextField
                label="Search Agency"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginY: 2 }}
            />

            <Grid container spacing={2}>
                {filteredAgencies.map((agency) => (
                    <Grid
                        item
                        key={agency._id}
                        xs={12}
                        sm={6}
                        md={4}
                    >
                        <Card onClick={() => handleAgencyClick(agency._id)} sx={{ cursor: "pointer" }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {agency.placement_type}
                                </Typography>
                                <Typography variant="body2">
                                    {agency.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );

    const renderStudents = () => (
        <Box sx={{ marginTop: "20px" }}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleBack}
            >
                Back
            </Button>
            <Typography variant="h6" gutterBottom>
                Students Registered:
            </Typography>
            <ul>
                {agencyPlacements.map((placement) => (
                    <li key={placement.student._id}>
                        {placement.student.fname}
                        {" "}
                        {placement.student.lname}
                        {" "}
                        -
                        {" "}
                        {placement.student.email}
                        {" "}
                        {placement.student.studentID}
                    </li>
                ))}
            </ul>
        </Box>
    );

    return (
        <Box sx={{ margin: "10px" }}>
            {!studentsFetched && renderAgencies()}
            {/* Display the list of students */}
            {studentsFetched && renderStudents()}
        </Box>
    );
}

export default AgencyPlacements;
