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

function HospitalRegistrationForm() {
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

    const handleAddClick = useCallback(() => {
        navigate({ pathname: "add" });
    }, []);
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    const fetchDetailsIfNeeded = useCallback(async () => {
        if (editId) {
            const student = await studentStore.get(editId);
            setEditObj(student);
        }

        setLoading(false);
    }, []);

    const handleImportClick = useCallback(() => {
        ShowDialog({
            title: "Import Schools",
            actionBtnName: "Import",
            content: <UploadFile
                ref={uploadFileRef}
                headers={SCHOOL_IMPORT_REQUIRED_HEADERS}
            />,
            onConfirm: async () => {
                const fileData = await uploadFileRef.current.getFileData();
                if (fileData) {
                    try {
                        await schoolStore.import(fileData);
                        ShowSuccessAlert("Imported successfully");
                    } catch (err) {
                        ShowErrorAlert(err.message);
                    }
                } else {
                    ShowErrorAlert("Please select the file", 3000);
                }
            }
        });
    }, []);

    const handleEditRow = useCallback((index) => {
        const schoolList = toJS(schoolStore.list);
        navigate({
            pathname: "edit",
            search: createSearchParams({
                id: schoolList[index]._id
            }).toString()
        });
    }, []);

    const handleDeleteRow = useCallback((index) => {
        ShowConfirmDialog({
            title: "Delete School",
            description: "Are you sure you want to delete this school?",
            actionBtnName: "Delete",
            onConfirm: async () => {
                try {
                    await schoolStore.delete(index);
                    ShowSnackbarAlert({
                        message: "Deleted successfully"
                    });
                } catch (err) {
                    ShowSnackbarAlert({
                        message: err.message, severity: "error"

                    });
                }
            }
        });
    }, []);

    const handleDeleteSelectedRows = useCallback((selectedRows) => {
        ShowConfirmDialog({
            title: "Delete Schools",
            description: `Are you sure you want to delete these ${selectedRows.length} school(s)?`,
            actionBtnName: "Delete",
            onConfirm: async () => {
                try {
                    await schoolStore.deleteMultiple(selectedRows);
                    ShowSnackbarAlert({
                        message: "Deleted successfully"
                    });
                } catch (err) {
                    ShowSnackbarAlert({
                        message: err.message, severity: "error"

                    });
                }
            }
        });
    }, []);
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

    const getToolBarActions = useCallback(() => (
        <Box
            sx={{
                width: { xs: "30%", lg: "40%" },
                margin: "1px 1px 1px 1px",
                textAlign: "left"
            }}
        >
            <Button
                startIcon={<AddIcon />}
                onClick={handleAddClick}
            >
                Add
            </Button>
            <Button
                startIcon={<UploadIcon />}
                onClick={handleImportClick}
            >
                Import
            </Button>
        </Box>
    ), []);

    const columns = useMemo(() => [
        {
            name: "name", label: "Name"
        },
        {
            name: "campus", label: "Campus"
        },
        {
            name: "",
            options: {
                viewColumns: false,
                setCellProps: () => ({ style: { width: "100px" } }),
                // eslint-disable-next-line react/no-unstable-nested-components
                customBodyRender: (value, tableMeta) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip
                            title="Edit"
                            arrow
                            placement="left"
                        >
                            <EditIcon
                                color="action"
                                className="actionIcon"
                                fontSize="small"
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleEditRow(tableMeta.rowIndex)}
                            />
                        </Tooltip>
                        <Tooltip
                            title="Delete"
                            arrow
                            placement="right"
                        >
                            <DeleteIcon
                                color="error"
                                className="actionIcon"
                                fontSize="small"
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleDeleteRow(tableMeta.rowIndex)}
                            />
                        </Tooltip>
                    </Box>
                )
            }
        }
    ], []);

    useEffect(() => {
        const fetchSchools = async () => {
            if (!fetched) {
                await schoolStore.fetchAll();
            }
        };

        fetchSchools();
    }, []);
    // const handleChange = (e) => {
    //     const { name, value, type } = e.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: type === "checkbox" ? e.target.checked : value
    //     }));
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post("/students", formData);
    //         console.log("Server Response:", response.data); // Add this line
    //         alert("Student created successfully!");
    //         setFormData({
    //             firstName: "",
    //             lastName: "",
    //             phoneNumber: "",
    //             email: "",
    //             studentNumber: "",
    //             intake: ""
    //         });
    //     } catch (error) {
    //         console.error("Error creating student:", error);
    //         alert("Error creating student.");
    //     }
    // };
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
        return (
            <Stack sx={{ width: "50%", my: 2 }} spacing={2}>
                <TextField
                    label="Student ID"
                    ref={studentIdRef}
                    value={editObj?.studentId}
                    required
                    autoFocus
                />
                <TextField
                    label="First name"
                    ref={fnameRef}
                    value={editObj?.fname}
                    required
                />
                <TextField
                    label="Last name"
                    ref={lnameRef}
                    value={editObj?.lname}
                    required
                />
                <TextField
                    label="Email"
                    ref={emailRef}
                    value={editObj?.email}
                    required
                />
                {/* <TextField
                    label="Phone number"
                    ref={phoneNumberRef}
                    value={editObj?.phoneNumber}
                    required
                />
                <SelectBox
                    label="Select School"
                    ref={schoolRef}
                    required
                    selected={editObj?.school._id}
                    options={schoolList}
                /> */}
                <SelectBox
                    label="Select Year"
                    ref={yearRef}
                    required
                    selected={editObj?.year || ""}
                    options={getYearsList()}
                />
                <SelectBox
                    label="Select Term"
                    ref={termRef}
                    selected={editObj?.term || ""}
                    options={TermsList}
                    required
                />
                <TextField
                    label="Notes"
                    ref={notesRef}
                    value={editObj?.notes || ""}
                    multiline
                    rows={4}
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

    useEffect(() => {
        fetchDetailsIfNeeded();

        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: editId ? "Edit Student" : "Add Student",
            navigateBackTo: "/hospital_form"
        });
    }, []);

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: editObj ? (
                <>
                    Student -
                    <em>
                        {`${editObj.fname} ${editObj.lname}`}

                    </em>
                </>
            ) : "Add New Student",
            navigateBackTo: "/hospital_form"
        });
    }, [editObj]);

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
                <h1>Hospital Registration Form</h1>
                {loading ? <SkeletonLoader /> : renderTabs()}
            </Box>
        </Box>
    );
}

export default observer(HospitalRegistrationForm);
