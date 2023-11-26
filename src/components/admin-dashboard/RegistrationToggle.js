import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import ShowSnackbarAlert from "../common/SnackBarAlert";
import { EVENTS, GlobalEventEmitter } from "../../services";

export default function RegistrationToggle() {
    const [registrationStatus, setRegistrationStatus] = useState({
        hospital: false,
        community: false
    });

    const fetchRegistrationStatus = useCallback(async () => {
        try {
            const response = await axios.get("/agency/toggledetails");
            setRegistrationStatus(response.data.data);
        } catch (error) {
            console.error("Error fetching registration status:", error);
        }
    }, []);

    const handleToggleChange = useCallback(
        async (event) => {
            const { name, checked } = event.target;

            try {
                const response = await axios.post("/agency/toggleagency", {
                    [name]: checked
                });

                setRegistrationStatus(response.data.data);
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
                            checked={registrationStatus.hospital}
                            onChange={handleToggleChange}
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
                            checked={registrationStatus.community}
                            onChange={handleToggleChange}
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
        </Box>
    );
}
