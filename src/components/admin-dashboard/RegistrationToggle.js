import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import ShowSnackbarAlert from "../common/SnackBarAlert";
import { EVENTS, GlobalEventEmitter } from "../../services";

export default function RegistrationToggle() {
    const [AgencyRegistrationStatus, setAgencyRegistrationStatus] = useState({
        hospital: false,
        community: false
    });
    const [clinicalRegistrationStatus, setClinicalRegistrationStatus] = useState(false);

    const fetchRegistrationStatus = useCallback(async () => {
        try {
            const response = await axios.get("/agency/toggledetails");
            setAgencyRegistrationStatus(response.data.data);
            const response2 = await axios.get("/agency/toggledetails");
            setClinicalRegistrationStatus(response2.data.data.registration_open);
        } catch (error) {
            console.error("Error fetching registration status:", error);
        }
    }, []);

    const handleAgencyToggleChange = useCallback(
        async (event) => {
            const { name, checked } = event.target;

            try {
                const response = await axios.post("/agency/toggleagency", {
                    [name]: checked
                });

                setAgencyRegistrationStatus(response.data.data);
                console.log(response.data.message);
                ShowSnackbarAlert({ message: response.data.message });
            } catch (error) {
                console.error("Error toggling registration status:", error);
                ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
            }
        },
        []
    );

    const handleClinicalToggleChange = useCallback(
        async (event) => {
            const { checked } = event.target;

            try {
                const response = await axios.post("/clinicalplan/toggleregister", {
                    registration_open: checked
                });

                setClinicalRegistrationStatus(response.data.data.registration_open);
                console.log(response.data.message);
                ShowSnackbarAlert({ message: response.data.message });
            } catch (error) {
                console.error("Error toggling registration status:", error);
                ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
            }
        },
        []
    );

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Toggle Registration On/Off"
        });
    });

    useEffect(() => {
        fetchRegistrationStatus();
    }, [fetchRegistrationStatus]);

    return (
        <Box sx={{
            margin: "10px 5% 10px 5%"
        }}
        >
            <FormGroup>
                <FormControlLabel
                    control={(
                        <Switch
                            checked={AgencyRegistrationStatus.hospital}
                            onChange={handleAgencyToggleChange}
                            name="hospital"
                            color="primary"
                            sx={{
                                margin: "10px"
                            }}
                        />
          )}
                    label="Hospital Registration"
                />
                <FormControlLabel
                    control={(
                        <Switch
                            checked={AgencyRegistrationStatus.community}
                            onChange={handleAgencyToggleChange}
                            name="community"
                            color="primary"
                            sx={{
                                margin: "10px"
                            }}
                        />
          )}
                    label="Community Registration"
                />
            </FormGroup>
            <Divider />
            <FormGroup>
                <FormControlLabel
                    control={(
                        <Switch
                            checked={clinicalRegistrationStatus}
                            onChange={handleClinicalToggleChange}
                            name="clinical_plan"
                            color="primary"
                            sx={{
                                margin: "10px"
                            }}
                        />
          )}
                    label="Clinical Plan"
                />
            </FormGroup>
        </Box>
    );
}
