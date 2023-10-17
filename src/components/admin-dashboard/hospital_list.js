import {
    useCallback, useEffect, useMemo, useRef
} from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/EditRounded";
import { observer } from "mobx-react";
import { createSearchParams, useNavigate, useLocation } from "react-router-dom";
import { toJS } from "mobx";
import UploadIcon from "@mui/icons-material/Upload";
import { useStore } from "../../store";
import ShowConfirmDialog from "../common/ConfirmDialog";
import ShowSnackbarAlert, { ShowErrorAlert, ShowSuccessAlert } from "../common/SnackBarAlert";
import Table from "../common/Table";
import ShowDialog from "../common/Dialog";
import UploadFile from "../common/UploadFile";
import { SCHOOL_IMPORT_REQUIRED_HEADERS } from "../utils";
import Topbar from "../topbar";
import LeftMenuHeader from "./header";
import { DrawerWidth, Menus } from "./utils";

function HospitalList() {
    const { schoolStore } = useStore();
    const uploadFileRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { list, totalCount, fetched } = schoolStore;

    const handleAddClick = useCallback(() => {
        navigate({ pathname: "add" });
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
            <Box
                sx={{
                    width: { xs: "80%", lg: "76.5%" },
                    margin: "1px 1px 1px 23.5%",
                    textAlign: "center"
                }}
            >
                <Table
                    key={`${Date.now()}`}
                    data={toJS(list)}
                    columns={columns}
                    title={getToolBarActions()}
                    options={{
                        viewColumns: false,
                        search: false,
                        filter: false,
                        count: totalCount,
                        onRowsDelete: ({ data }) => {
                            const indexes = data.map((obj) => obj.index);
                            handleDeleteSelectedRows(indexes);
                            return false;
                        },
                        downloadOptions: {
                            filename: "Schools"
                        },
                        textLabels: {
                            body: {
                                noMatch: !fetched ? "Fetching..." : "No records found"
                            }
                        }
                    }}
                />
            </Box>
        </Box>
    );
}

export default observer(HospitalList);
