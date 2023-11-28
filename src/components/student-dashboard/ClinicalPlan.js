import {
    useEffect, useState
} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { observer } from "mobx-react";
import {
    FormControl, InputLabel, Select, MenuItem, Button, Grid
} from "@mui/material";
import ShowSnackbarAlert from "../common/SnackBarAlert";
import { EVENTS, GlobalEventEmitter } from "../../services";

function ClinicalPlan() {
    const [beginSite, setBeginSite] = useState("");
    const [completeSite, setCompleteSite] = useState("");
    const [prefHospital, setPrefHospital] = useState("");
    const [prefCommunity, setprefCommunity] = useState("");
    const [semSeq, setSemSeq] = useState("");

    const [clinicalScheduleList, setClinicalScheduleList] = useState([]);
    const [loadingClinicalSchedule, setLoadingClinicalSchedule] = useState(true);

    const getClinicalScheduleList = async () => {
        try {
            const response = await axios.post("/clinicalplan/getsemoptions");
            setClinicalScheduleList(response.data.data);
        } catch (error) {
            // Handle error, show error message or log the error
            console.error("Error fetching clinical schedule options:", error);
            ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
        } finally {
            setLoadingClinicalSchedule(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("semSeq: ", semSeq);

        try {
            // Prepare the request body
            const requestBody = {
                begin_nursing_site: beginSite,
                completing_nursing_site: completeSite,
                semester_sequence: semSeq,
                preffered_hospital_location: prefHospital,
                preffered_community_location: prefCommunity
            };

            // Make the asynchronous request using async/await
            const response = await axios.post("/clinicalplan/register", requestBody);

            // Handle the successful response
            console.log(response.data.message);
            ShowSnackbarAlert({ message: response.data.message });
        } catch (error) {
            // Handle errors
            console.error(error.response.data.message);
            ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
        }
    };

    useEffect(() => {
        getClinicalScheduleList();
    }, []);

    const renderForm = () => {
        const nursingList = ["University of Windsor", "St. Clair College Windsor", "St. Clair College Chatham", "Lambton College Sarnia"];
        const dynamicClinicalScheduleList = clinicalScheduleList.map((item) => ({
            name: `${item.field} (${item.seats - item.seats_filled} / ${item.seats} remaining)`,
            value: item.field
        }));

        const hospitalList = ["Windsor-Essex", "Chatham-Kent", "Sarnia-Lambton"];
        return (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>At which site did you begin your nursing?</InputLabel>
                            <Select
                                value={beginSite}
                                onChange={(event) => setBeginSite(event.target.value)}
                            >
                                {nursingList.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>At which site will you be completing your final term of the nursing program?</InputLabel>
                            <Select
                                value={completeSite}
                                onChange={(event) => setCompleteSite(event.target.value)}
                            >
                                {nursingList.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Please select the semester sequence for your clinical schedule</InputLabel>
                            <Select
                                value={semSeq}
                                onChange={(event) => setSemSeq(event.target.value)}
                                loading={loadingClinicalSchedule}
                            >
                                {dynamicClinicalScheduleList.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Preferred placement location for Hospital Clinical</InputLabel>
                            <Select
                                value={prefHospital}
                                onChange={(event) => setPrefHospital(event.target.value)}
                            >
                                {hospitalList.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Preferred placement location for Community Clinical</InputLabel>
                            <Select
                                value={prefCommunity}
                                onChange={(event) => setprefCommunity(event.target.value)}
                            >
                                {hospitalList.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
    };

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Clinical Plan"
        });
    });

    return (

        <Box sx={{
            margin: "10px 5% 10px 5%"
        }}
        >
            {renderForm()}
        </Box>
    );
}

export default observer(ClinicalPlan);
