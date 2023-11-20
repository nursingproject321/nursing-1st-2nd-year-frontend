import React, { useState, useEffect } from "react";
import {
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid
} from "@mui/material";
import axios from "axios";
import ShowSnackbarAlert from "../common/SnackBarAlert";

function HospitalFormComponent({ agencyType }) {
    const [placementType, setPlacementType] = useState("");
    const [agencyName, setAgencyName] = useState("");
    const [placementTypes, setPlacementTypes] = useState([]);
    const [agencyNames, setAgencyNames] = useState([]);
    const [notes, setNotes] = useState("");

    // Fetch placement types from the API endpoint
    useEffect(() => {
        axios.post("student/placementTypes", {
            agency_type: agencyType
        })
            .then((response) => setPlacementTypes(response.data.placement_types))
            .catch((error) => console.error(error));
    }, []);

    // Fetch agency names based on the selected placement type
    useEffect(() => {
        if (placementType) {
            axios.post("student/agencyNames", {
                agency_type: agencyType,
                placement_type: placementType
            })
                .then((response) => setAgencyNames(response.data.agency))
                .catch((error) => console.error(error));
        }
    }, [placementType]);

    const handlePlacementTypeChange = (event) => {
        setPlacementType(event.target.value);
        setAgencyName("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit the form data to the API
        // const body = {
        //     agency_name: agencyName,
        //     placement_type: placementType,
        //     notes
        // };
        // console.log("body: ", body);
        axios.post(`/student/${agencyType}/`, {
            agency_name: agencyName,
            placement_type: placementType,
            notes
        })
            .then((response) => {
                console.log(response.data.message);
                ShowSnackbarAlert({ message: response.data.message });
            })
            .catch((error) => {
                console.error(error.response.data.message);
                ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Placement Type</InputLabel>
                        <Select
                            value={placementType}
                            onChange={handlePlacementTypeChange}
                        >
                            {placementTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {placementType && (
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Agency Name</InputLabel>
                        <Select
                            value={agencyName}
                            onChange={(event) => setAgencyName(event.target.value)}
                        >
                            {agencyNames.map((agency) => (
                                <MenuItem key={agency._id} value={agency.name}>
                                    {agency.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                )}

                <Grid item xs={12}>
                    <TextField
                        label="Notes to Lead Teacher"
                        fullWidth
                        multiline
                        rows={4}
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default HospitalFormComponent;
