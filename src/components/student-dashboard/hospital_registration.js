import {
    useEffect, useState, useRef
} from "react";
import {
    useNavigate, useParams, createSearchParams, useLocation
} from "react-router-dom";
import Box from "@mui/material/Box";
import { observer } from "mobx-react";
import { useStore } from "../../store";
import { EVENTS, GlobalEventEmitter } from "../../services";
import HospitalFormComponent from "./hospital_form";

function HospitalRegistrationForm() {
    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Hospital Registration Form"
        });
    });

    return (

        <Box sx={{
            margin: "10px 5% 10px 5%"
        }}
        >
            <HospitalFormComponent agencyType="hospital" />
        </Box>
    );
}

export default observer(HospitalRegistrationForm);
