import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ShowSnackbarAlert from "../common/SnackBarAlert";
import { useStore } from "../../store";
import { EVENTS, GlobalEventEmitter } from "../../services";

function AddAgency() {
    const { agencyType } = useParams();
    const { hospitalStore } = useStore();
    const navigate = useNavigate();
    const [agencyInfo, setAgencyInfo] = useState({
        name: "",
        placement_type: "",
        address: "",
        description: "",
        website: "",
        student_roles: "",
        lab_practice_required: false,
        required_readings: "",
        car_needed: false,
        languages: "",
        police_clearance: "",
        total_capacity: 0,
        visibility: true
    });

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: agencyType === "hospital" ? "Add new Hospital" : "Add new Community Clinic"
        });
    }, [agencyType]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAgencyInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const requestBody = { ...agencyInfo, agency_type: agencyType };
            const response = await axios.post("/agency/register", requestBody);
            await hospitalStore.fetchAll();
            console.log("Agency created successfully:", response.data);
            ShowSnackbarAlert({ message: "Hospital Added" });
            navigate(`/admin/${agencyType}-list/`);
        } catch (error) {
            // Handle errors
            console.error("Error creating agency:", error);
            ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
        }
    };

    return (
        <Box sx={{ margin: "10px 5% 10px 5%", overflowY: "auto", marginBottom: "10px" }}>
            <form>
                <TextField
                    label="Agency Name"
                    name="name"
                    value={agencyInfo.name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Placement Type"
                    name="placement_type"
                    value={agencyInfo.placement_type}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Address"
                    name="address"
                    value={agencyInfo.address}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={agencyInfo.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Website"
                    name="website"
                    value={agencyInfo.website}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Student Roles"
                    name="student_roles"
                    value={agencyInfo.student_roles}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ marginBottom: 2 }}
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            name="lab_practice_required"
                            checked={agencyInfo.lab_practice_required}
                            onChange={handleInputChange}
                        />
          )}
                    label="Lab Practice Required"
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Required Readings"
                    name="required_readings"
                    value={agencyInfo.required_readings}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ marginBottom: 2 }}
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            name="car_needed"
                            checked={agencyInfo.car_needed}
                            onChange={handleInputChange}
                        />
          )}
                    label="Car Needed"
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Languages"
                    name="languages"
                    value={agencyInfo.languages}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Police Clearance"
                    name="police_clearance"
                    value={agencyInfo.police_clearance}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Total Capacity"
                    name="total_capacity"
                    type="number"
                    value={agencyInfo.total_capacity}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            name="visibility"
                            checked={agencyInfo.visibility}
                            onChange={handleInputChange}
                        />
          )}
                    label="Visibility"
                    sx={{ marginBottom: 2 }}
                />
                <br />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ marginTop: 2 }}
                >
                    Create Agency
                </Button>
            </form>
        </Box>
    );
}

export default AddAgency;
