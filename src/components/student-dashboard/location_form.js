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
    const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(true);
    const { studentStore, schoolStore } = useStore();
    const [editObj, setEditObj] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const { id: editId } = useParams();
    // const { schoolStore } = useStore();
    const uploadFileRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const studentIdRef = useRef(null);
    const emailRef = useRef(null);
    // const phoneNumberRef = useRef(null);
    // const schoolRef = useRef(null);
    const yearRef = useRef(null);
    const termRef = useRef(null);
    const notesRef = useRef(null);

    const { list, totalCount, fetched } = schoolStore;
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const goBack = useCallback(() => {
        navigate("/students");
    }, []);
    const validate = useCallback((value, el, errMsg) => {
        let err = null;

        if (!value) {
            err = errMsg;
        }

        el.setError(err);
        return err === null;
    }, []);
    const validateEmailAddress = useCallback(() => {
        const value = emailRef.current.value();
        let err = null;

        if (!value) {
            err = "Please enter the email";
        } else if (!isValidEmailAddress(value)) {
            err = "Invalid email address";
        }

        emailRef.current.setError(err);
        return err === null;
    }, []);

    const handleSubmit = useCallback(async () => {
        const fname = fnameRef.current.value();
        const lname = lnameRef.current.value();
        const studentId = studentIdRef.current.value();
        const email = emailRef.current.value();
        // const phoneNumber = phoneNumberRef.current.value();
        // const school = schoolRef.current.getSelectedValue();
        const year = yearRef.current.getSelectedValue();
        const term = termRef.current.getSelectedValue();
        const notes = notesRef.current.value();

        const isFNameValid = validate(fname, fnameRef.current, "Please enter the First name");
        const isLNameValid = validate(lname, lnameRef.current, "Please enter the Last name");
        const isStudentIdValid = validate(studentId, studentIdRef.current, "Please enter the Student ID");
        const isEmailValid = validateEmailAddress();
        // const isPhoneValid = validate(phoneNumber, phoneNumberRef.current, "Please enter the phone number");
        // const isSchoolValid = validate(school, schoolRef.current, "Please select the school");
        const isYearValid = validate(year, yearRef.current, "Please select the year");
        const isTermValid = validate(term, termRef.current, "Please select the term");

        if (!isFNameValid || !isLNameValid || !isStudentIdValid || !isEmailValid || !isYearValid || !isTermValid) {
            return;
        }

        const params = {
            fname, lname, studentId, email, year, term, notes
        };
        try {
            if (editObj) {
                await studentStore.edit(editObj._id, params);
                ShowSnackbarAlert({
                    message: "Saved successfully"
                });
            } else {
                await studentStore.addNew(params);
                ShowSnackbarAlert({
                    message: "Added successfully"
                });
            }

            goBack();
        } catch (err) {
            ShowSnackbarAlert({
                message: err.response?.data?.message || err.message,
                severity: "error"
            });
        }
    }, [editObj]);
    function renderContent() {
        const nursingList = ["University of Windsor", "St. Clair College Windsor", "St. Clair College Chatham", "Lambton College Sarnia"];
        const clinicalScheduleList = ["Clinical in Fall (10 remaining)", "Clinical in Winter (0 remaining)", "Clinical in Summer (0 remaining)"];
        const hospitalList = ["Windsor-Essex", "Chatham-Kent", "Sarnia-Lambton"];
        return (
            <Stack sx={{ width: "50%", my: 2 }} spacing={2}>
                <SelectBox
                    label="At which site did you begin your nursing?"
                    ref={yearRef}
                    required
                    selected=""
                    options={nursingList}
                />
                <SelectBox
                    label="At which site will you be completing your final term of the nursing program?"
                    ref={termRef}
                    selected=""
                    options={nursingList}
                    required
                />
                <SelectBox
                    label="Please select the semester sequence for your clinical schedule"
                    ref={termRef}
                    selected=""
                    options={clinicalScheduleList}
                    required
                />
                <SelectBox
                    label="Preferred placement location for Hospital Clinical"
                    ref={termRef}
                    selected=""
                    options={hospitalList}
                    required
                />
                <SelectBox
                    label="Preferred placement location for Community Clinical"
                    ref={termRef}
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
                    label={editObj ? "Save" : "Submit"}
                    onClick={handleSubmit}
                    sx={{ mr: 1 }}
                />
                <Button
                    onClick={goBack}
                    color="grey"
                    variant="outlined"
                >
                    Cancel
                </Button>
            </Box>
        );
    }

    function renderTabs() {
        if (!editObj) {
            return (
                <>
                    {renderContent()}
                    {renderActions()}
                </>
            );
        }

        return (
            <Box sx={{ mt: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                    >
                        <Tab label="Details" />
                        <Tab label="Placement History" />
                    </Tabs>
                </Box>
                <TabPanel value={selectedTab} index={0}>
                    {renderContent()}
                    {renderActions()}
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <StudentPlacementHistory
                        placementsHistory={editObj.placementsHistory}
                        placementLocationsHistory={editObj.placementLocationsHistory}
                    />
                </TabPanel>
            </Box>
        );
    }

    // useEffect(() => {
    //     fetchDetailsIfNeeded();

    //     GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
    //         text: editId ? "Edit Student" : "Add Student",
    //         navigateBackTo: "/location_form"
    //     });
    // }, []);

    // useEffect(() => {
    //     GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
    //         text: "Year 4 Clinical Placement Plan",
    //         navigateBackTo: "/location_form"
    //     });
    // }, [editObj]);

    return (
        <Box>
            <Drawer
                variant="permanent"
                sx={{
                    width: DrawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": { width: DrawerWidth, boxSizing: "border-box" }
                }}
            >
                <LeftMenuHeader />
                <List>
                    {Menus.map((menu) => {
                        const selected = location.pathname.startsWith(`/${menu.id}`);
                        const { Icon } = menu;
                        return (
                            <ListItem
                                key={menu.id}
                                disablePadding
                                selected={selected}
                                onClick={() => navigate(`/${menu.id}`)}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Icon color={selected ? "primary" : ""} />
                                    </ListItemIcon>
                                    <ListItemText primary={menu.name} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <Box sx={{ overflow: "auto", height: "calc(100vh - 60px)", px: 2 }}>
                <h1>Location Form</h1>
                {renderTabs()}
                {/* <div>
                    <label htmlFor="text-field">Text Field:</label>
                    <input
                        type="text"
                        id="text-field"
                        disabled={isTextFieldDisabled}
                    />
                    <button type="button" onClick={toggleTextField}>
                        {isTextFieldDisabled ? "Enable" : "Disable"}
                    </button>
                </div> */}
            </Box>
        </Box>
    );
}

export default observer(LocationForm);
