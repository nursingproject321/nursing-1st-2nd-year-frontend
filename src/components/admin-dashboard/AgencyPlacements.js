import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Grid,
    Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import ShowSnackbarAlert from "../common/SnackBarAlert";
import { EVENTS, GlobalEventEmitter } from "../../services";

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
            setAgencyPlacements(response.data.agency);
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
                sx={{ mb: "20px" }}
            >
                Back
            </Button>
            {/* <Typography variant="h6" gutterBottom>
                Students Registered For
            </Typography> */}
            <Typography variant="h6" gutterBottom>
                {agencyPlacements.placement_type}
            </Typography>
            <Typography variant="body2">
                {agencyPlacements.name}
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Term</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {agencyPlacements.placements.map((placement) => (
                            <TableRow key={placement.student._id}>
                                <TableCell>{placement.student.studentId}</TableCell>
                                <TableCell>
                                    {placement.student.fname}
                                    {" "}
                                    {placement.student.lname}
                                </TableCell>
                                <TableCell>
                                    {placement.student.term}
                                    {" "}
                                    {placement.student.year}
                                </TableCell>
                                <TableCell>{placement.student.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: agencyType === "hospital" ? "Hospital Placements" : "Community Placements"
        });
    });

    return (
        <Box sx={{
            margin: "10px 10px 10px 10px"
        }}
        >
            {!studentsFetched && renderAgencies()}
            {/* Display the list of students */}
            {studentsFetched && renderStudents()}
        </Box>
    );
}

export default AgencyPlacements;
