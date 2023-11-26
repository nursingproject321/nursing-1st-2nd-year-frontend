import {
    useCallback, useEffect, useState, useMemo, useRef
} from "react";
import {
    useNavigate, useParams, createSearchParams, useLocation
} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/EditRounded";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import UploadIcon from "@mui/icons-material/Upload";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import SkeletonLoader from "../common/SkeletonLoader";
import LoadingButton from "../common/LoadingButton";
import SelectBox from "../common/SelectBox";
import TextField from "../common/TextField";
import { useStore } from "../../store";
import ShowConfirmDialog from "../common/ConfirmDialog";
import ShowSnackbarAlert, { ShowErrorAlert, ShowSuccessAlert } from "../common/SnackBarAlert";
import Table from "../common/Table";
import ShowDialog from "../common/Dialog";
import UploadFile from "../common/UploadFile";
import {
    SCHOOL_IMPORT_REQUIRED_HEADERS, getYearsList, TermsList, isValidEmailAddress
} from "../utils";
import Topbar from "../topbar";
import LeftMenuHeader from "./header";
import { DrawerWidth, Menus } from "./utils";
import { EVENTS, GlobalEventEmitter } from "../../services";
import TabPanel from "../common/TabPanel";
import StudentPlacementHistory from "../students/student-placement-history";

function LocationForm() {
    const [loading, setLoading] = useState(true);
    const [clinicalScheduleList, setClinicalScheduleList] = useState([]);
    const [loadingClinicalSchedule, setLoadingClinicalSchedule] = useState(true);
    const navigate = useNavigate();

    const beginSiteRef = useRef(null);
    const completeSiteRef = useRef(null);
    const semSeqRef = useRef(null);
    const hospitalRef = useRef(null);
    const communityRef = useRef(null);

    const validate = useCallback((value, el, errMsg) => {
        let err = null;

        if (!value) {
            err = errMsg;
        }

        el.setError(err);
        return err === null;
    }, []);

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

    const handleSubmit = useCallback(async () => {
        // event.preventDefault();

        const beginSite = beginSiteRef.current.value();
        const completeSite = completeSiteRef.current.value();
        const semSeq = semSeqRef.current.value();
        const hospital = hospitalRef.current.value();
        const community = communityRef.current.value();

        console.log("semSeq: ", semSeq);

        try {
            const response = await axios.post("/clinicalplan/register", {
                begin_nursing_site: beginSite,
                completing_nursing_site: completeSite,
                semester_sequence: semSeq,
                preffered_hospital_location: hospital,
                preffered_community_location: community
            });
            ShowSnackbarAlert({ message: response.data.message });
        } catch (error) {
            ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
        }
    }, []);

    // const handleSubmit = useCallback(async () => {
    //     const fname = fnameRef.current.value();
    //     const lname = lnameRef.current.value();
    //     const studentId = studentIdRef.current.value();
    //     const email = emailRef.current.value();
    //     // const phoneNumber = phoneNumberRef.current.value();
    //     // const school = schoolRef.current.getSelectedValue();
    //     const year = yearRef.current.getSelectedValue();
    //     const term = termRef.current.getSelectedValue();
    //     const notes = notesRef.current.value();

    //     const isFNameValid = validate(fname, fnameRef.current, "Please enter the First name");
    //     const isLNameValid = validate(lname, lnameRef.current, "Please enter the Last name");
    //     const isStudentIdValid = validate(studentId, studentIdRef.current, "Please enter the Student ID");
    //     const isEmailValid = validateEmailAddress();
    //     // const isPhoneValid = validate(phoneNumber, phoneNumberRef.current, "Please enter the phone number");
    //     // const isSchoolValid = validate(school, schoolRef.current, "Please select the school");
    //     const isYearValid = validate(year, yearRef.current, "Please select the year");
    //     const isTermValid = validate(term, termRef.current, "Please select the term");

    //     if (!isFNameValid || !isLNameValid || !isStudentIdValid || !isEmailValid || !isYearValid || !isTermValid) {
    //         return;
    //     }

    //     const params = {
    //         fname, lname, studentId, email, year, term, notes
    //     };
    //     try {
    //         if (editObj) {
    //             await studentStore.edit(editObj._id, params);
    //             ShowSnackbarAlert({
    //                 message: "Saved successfully"
    //             });
    //         } else {
    //             await studentStore.addNew(params);
    //             ShowSnackbarAlert({
    //                 message: "Added successfully"
    //             });
    //         }

    //         goBack();
    //     } catch (err) {
    //         ShowSnackbarAlert({
    //             message: err.response?.data?.message || err.message,
    //             severity: "error"
    //         });
    //     }
    // }, [editObj]);

    useEffect(() => {
        getClinicalScheduleList();
    }, []);

    function renderContent() {
        const nursingList = ["University of Windsor", "St. Clair College Windsor", "St. Clair College Chatham", "Lambton College Sarnia"];
        // const staticClinicalScheduleList = ["Clinical in Fall (10 remaining)", "Clinical in Winter (0 remaining)", "Clinical in Summer (0 remaining)"];
        const dynamicClinicalScheduleList = clinicalScheduleList.map((item) => ({
            name: `${item.field} (${item.seats - item.seats_filled} remaining)`,
            value: item.field
        }));
        console.log("clinicalScheduleList: ", clinicalScheduleList);
        console.log("dynamicClinicalScheduleList: ", dynamicClinicalScheduleList);

        const hospitalList = ["Windsor-Essex", "Chatham-Kent", "Sarnia-Lambton"];
        return (
            <Stack spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
                <SelectBox
                    label="At which site did you begin your nursing?"
                    ref={beginSiteRef}
                    required
                    selected=""
                    options={getYearsList()}
                />
                <SelectBox
                    label="At which site will you be completing your final term of the nursing program?"
                    ref={completeSiteRef}
                    selected=""
                    options={nursingList}
                    required
                />
                <Divider />
                <SelectBox
                    label="Please select the semester sequence for your clinical schedule"
                    ref={semSeqRef}
                    selected=""
                    options={dynamicClinicalScheduleList}
                    loading={loadingClinicalSchedule}
                    style={{ fontSize: "16px" }}
                    required

                />
                <SelectBox
                    label="Preferred placement location for Hospital Clinical"
                    ref={hospitalRef}
                    selected=""
                    options={hospitalList}
                    required
                />
                <SelectBox
                    label="Preferred placement location for Community Clinical"
                    ref={communityRef}
                    selected=""
                    options={hospitalList}
                    required
                />
            </Stack>
        );
    }

    function renderActions() {
        return (
            <Box sx={{ mb: 2 }}>
                <LoadingButton
                    label="Submit"
                    onClick={handleSubmit}
                    sx={{ mr: 1 }}
                />
                <Button
                    // onClick={clearFields}
                    color="grey"
                    variant="outlined"
                >
                    Cancel
                </Button>
            </Box>
        );
    }

    function renderTabs() {
        return (
            <>
                {renderContent()}
                {renderActions()}
            </>
        );
    }

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Location Form"
        });
    }, []);

    return (
        <Box>
            <Box sx={{ overflow: "auto", height: "calc(100vh - 60px)", px: 2 }}>
                <h1>Location Form</h1>
                {renderTabs()}
            </Box>
        </Box>
    );
}

export default observer(LocationForm);
