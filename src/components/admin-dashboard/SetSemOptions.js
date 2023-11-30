import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {
    Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, TextField, Button,
    Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Input
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ShowSnackbarAlert from "../common/SnackBarAlert";
import { EVENTS, GlobalEventEmitter } from "../../services";
import ShowConfirmDialog from "../common/ConfirmDialog";

export default function SetSemOptions() {
    const [semOptions, setSemOptions] = useState([]);
    const [editedRow, setEditedRow] = useState(null);
    const [editedFields, setEditedFields] = useState({ field: "", seats: 0 });
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [newSemFields, setNewSemFields] = useState({ field: "", seats: 0 });

    const fetchSemOptions = useCallback(async () => {
        try {
            const response = await axios.post("/clinicalplan/getsemoptions");
            setSemOptions(response.data.data);
        } catch (error) {
            console.error("Error fetching registration status:", error);
        }
    }, []);

    const handleEdit = (semId, currentField, currentSeats) => {
        setEditedRow(semId);
        setEditedFields({ field: currentField, seats: currentSeats });
    };

    const handleSave = async (semId) => {
        try {
            const requestBody = {
                [editedFields.field]: editedFields.seats
            };
            const response = await axios.post("/clinicalplan/setsemoptions", requestBody);
            setSemOptions(response.data.data);
            ShowSnackbarAlert({ message: response.data.message });
        } catch (error) {
            ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
            console.error("Error fetching registration status:", error);
        }
        setEditedRow(null);
    };

    const handleCancel = () => {
        setEditedRow(null);
    };

    const handleDelete = async () => {
        ShowConfirmDialog({
            title: "Delete Student",
            description: "Are you sure you want to delete all the Options?",
            actionBtnName: "Delete",
            onConfirm: async () => {
                try {
                    const response = await axios.post("/clinicalplan/delsemoptions");
                    setSemOptions([]);
                    ShowSnackbarAlert({ message: response.data.message });
                } catch (error) {
                    ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
                    console.error("Error fetching registration status:", error);
                }
            }
        });
    };

    const handleIndvDelete = (semId) => {
        // Add logic to handle the delete action for the sem option with the given ID
        console.log(`Delete clicked for sem option with ID: ${semId}`);
    };

    const handleAdd = () => {
        setAddFormVisible(true);
    };

    const handleAddCancel = () => {
        setAddFormVisible(false);
    };

    const handleAddSubmit = async () => {
        // Add logic to handle submitting the new sem option
        try {
            const requestBody = {
                [newSemFields.field]: newSemFields.seats
            };
            const response = await axios.post("/clinicalplan/setsemoptions", requestBody);
            setSemOptions(response.data.data);
            ShowSnackbarAlert({ message: response.data.message });
        } catch (error) {
            ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
            console.error("Error adding sem option:", error);
        }

        // Reset form fields and hide the form
        setNewSemFields({ field: "", seats: 0 });
        setAddFormVisible(false);
    };

    const handleRestet = async () => {
        ShowConfirmDialog({
            title: "Delete Student",
            description: "Are you sure you want to Reset all the Options? This will set filled seats for all semester sequence to 0",
            actionBtnName: "Reset",
            onConfirm: async () => {
                try {
                    const response = await axios.post("/clinicalplan/setsemoptions", {
                        reset_seats_filled: true
                    });
                    setSemOptions(response.data.data);
                    ShowSnackbarAlert({ message: response.data.message });
                } catch (error) {
                    ShowSnackbarAlert({ message: error.response.data.message, severity: "error" });
                    console.error("Error fetching registration status:", error);
                }
            }
        });
    };

    useEffect(() => {
        fetchSemOptions(); // Fetch sem options when component mounts
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Toggle Registration On/Off"
        });
    }, [fetchSemOptions]);

    return (
        <Box sx={{
            margin: "10px 5% 10px 5%"
        }}
        >
            <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handleAdd}
                sx={{ m: "10px" }}
            >
                Add
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleRestet}
                sx={{ m: "10px" }}
            >
                Reset
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ m: "10px" }}
            >
                Delete All
            </Button>
            {isAddFormVisible && (
                <FormControl sx={{
                    display: "flex", flexDirection: "row", alignItems: "center", m: "10px"
                }}
                >
                    <InputLabel htmlFor="new-sem-field">Sequence Name:</InputLabel>
                    <Input
                        id="new-sem-field"
                        type="text"
                        value={newSemFields.field}
                        onChange={(e) => setNewSemFields({ ...newSemFields, field: e.target.value })}
                        sx={{ m: "10px" }}
                    />
                    <InputLabel htmlFor="new-sem-seats">Seats:</InputLabel>
                    <Input
                        id="new-sem-seats"
                        type="number"
                        value={newSemFields.seats}
                        onChange={(e) => setNewSemFields({ ...newSemFields, seats: e.target.value })}
                        sx={{ m: "10px" }}

                    />
                    <Button
                        onClick={handleAddSubmit}
                        color="primary"
                        sx={{ m: "10px" }}
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={handleAddCancel}
                        color="secondary"
                        sx={{ m: "10px" }}
                    >
                        Cancel
                    </Button>
                </FormControl>
            )}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "50%" }}>Semester Sequence</TableCell>
                            <TableCell sx={{ width: "13%" }}>Seats Filled</TableCell>
                            <TableCell sx={{ width: "13%" }}>Total Seats</TableCell>
                            <TableCell sx={{ width: "24%" }}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {semOptions.map((sem) => (
                            <TableRow key={sem._id}>
                                <TableCell sx={{ width: "50%" }}>
                                    {editedRow === sem._id ? (
                                        <TextField
                                            value={editedFields.field}
                                            onChange={(e) => setEditedFields({ ...editedFields, field: e.target.value })}
                                        />
                                    ) : (
                                        sem.field
                                    )}
                                </TableCell>
                                <TableCell sx={{ width: "13%" }}>{sem.seats_filled}</TableCell>
                                <TableCell sx={{ width: "13%" }}>
                                    {editedRow === sem._id ? (
                                        <TextField
                                            type="number"
                                            value={editedFields.seats}
                                            onChange={(e) => setEditedFields({ ...editedFields, seats: e.target.value })}
                                        />
                                    ) : (
                                        sem.seats
                                    )}
                                </TableCell>
                                <TableCell sx={{ width: "24%" }}>
                                    {editedRow === sem._id ? (
                                        <>
                                            <Button onClick={() => handleSave(sem._id)} color="primary">
                                                Save
                                            </Button>
                                            <Button onClick={handleCancel} color="secondary">
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton onClick={() => handleEdit(sem._id, sem.field, sem.seats)} color="primary">
                                                <Edit />
                                            </IconButton>
                                            {/* <IconButton onClick={() => handleIndvDelete(sem._id)} color="error">
                                                <Delete />
                                            </IconButton> */}
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
