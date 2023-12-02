import {
    useCallback, useEffect, useMemo, useRef
} from "react";
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
import { EVENTS, GlobalEventEmitter } from "../../services";
import { AGENCY_IMPORT_REQUIRED_HEADERS } from "../utils";

function AdminAgencyList(props) {
    const { agencyType } = props;
    const agencyStore = agencyType === "hospital" ? useStore().hospitalStore : useStore().communityStore;
    const uploadFileRef = useRef(null);
    const navigate = useNavigate();

    const { list, totalCount, fetched } = agencyStore;

    const handleAddClick = useCallback(() => {
        navigate(`/admin/add-agency/${agencyType}`);
    }, []);

    const handleImportClick = useCallback(() => {
        ShowDialog({
            title: "Import Agency",
            actionBtnName: "Import",
            content: <UploadFile
                ref={uploadFileRef}
                headers={AGENCY_IMPORT_REQUIRED_HEADERS}
            />,
            onConfirm: async () => {
                const fileData = await uploadFileRef.current.getFileData();
                if (fileData) {
                    try {
                        console.log("fileData: ", fileData);
                        await agencyStore.import(fileData);
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

    const handleEditRow = useCallback(async (index) => {
        const schoolList = toJS(agencyStore.list);
        const id = agencyStore.list[index]._id;
        console.log("index", id);
        navigate(`/admin/edit-agency/hospital/${id}`);
        await agencyStore.fetchAll();
    }, []);

    const handleDeleteRow = useCallback((index) => {
        ShowConfirmDialog({
            title: "Delete Agency",
            description: "Are you sure you want to delete this agency?",
            actionBtnName: "Delete",
            onConfirm: async () => {
                try {
                    await agencyStore.delete(index);
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
            title: "Delete Agency",
            description: `Are you sure you want to delete these ${selectedRows.length} agency(s)?`,
            actionBtnName: "Delete",
            onConfirm: async () => {
                try {
                    await agencyStore.deleteMultiple(selectedRows);
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
            name: "placement_type", label: "Placement Type"
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
        const fetchAgencies = async () => {
            if (!fetched) {
                await agencyStore.fetchAll();
            }
        };

        fetchAgencies();
    }, [fetched]);

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: agencyType === "hospital" ? "Hospital List" : "Community Clinic List"
        });
    }, [agencyType]);

    return (
        <Box>
            <Box
                sx={{
                    margin: "10px 10px 10px 10px",
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
                        // downloadOptions: {
                        //     filename: "Hospitals"
                        // },
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

export default observer(AdminAgencyList);
