import React, { useState, useEffect } from "react";
import {
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid
} from "@mui/material";
import axios from "axios";

function HospitalFormComponent({ agencyType }) {
    const [placementType, setPlacementType] = useState("");
    const [agencyName, setAgencyName] = useState("");
    const [placementTypes, setPlacementTypes] = useState([]);
    const [agencyNames, setAgencyNames] = useState([]);
    const [notes, setNotes] = useState("");

    // Fetch placement types from the API endpoint
    useEffect(() => {
        axios.post("http://localhost:8000/student/placementTypes", {
            agency_type: agencyType
        })
            .then((response) => setPlacementTypes(response.data.placement_types))
            .catch((error) => console.error(error));
    }, []);

    // Fetch agency names based on the selected placement type
    useEffect(() => {
        if (placementType) {
            axios.post("http://localhost:8000/student/agencyNames", {
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

    const handleSubmit = () => {
    // Submit the form data to the API
        axios.post(`/student/${agencyType}/`, {
            agency_name: agencyName,
            placement_type: placementType,
            notes
        })
            .then((response) => {
                console.log(response.data.message);
                // Handle success, e.g., show a success message to the user
            })
            .catch((error) => console.error(error));
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
