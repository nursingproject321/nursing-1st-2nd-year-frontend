import {
    useEffect, useState, useRef
} from "react";
import Box from "@mui/material/Box";
import { observer } from "mobx-react";
import { EVENTS, GlobalEventEmitter } from "../../services";
import HospitalFormComponent from "./hospital_form";

function HospitalRegistrationForm() {
    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Community Registration Form"
        });
    });

    return (

        <Box sx={{
            margin: "10px 5% 10px 5%"
        }}
        >
            <HospitalFormComponent agencyType="community" />
        </Box>
    );
}

export default observer(HospitalRegistrationForm);
