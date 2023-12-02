import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField, Typography, Container, Grid, Divider
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { EVENTS, GlobalEventEmitter } from "../../services";
import { useStore } from "../../store";

function StudentPlacements() {
    const [placements, setPlacements] = useState([]);
    const [filteredPlacements, setFilteredPlacements] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { studentStore } = useStore();
    const { list, totalCount, fetched } = studentStore;

    useEffect(() => {
        // Fetch student placement details from the API
        axios.post("/student/placements")
            .then((response) => {
                setPlacements(response.data.student);
                setFilteredPlacements(response.data.student);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSearch = (event) => {
        // Use event.target.value directly to avoid lag
        setSearchTerm(event.target.value);

        // Filter placements based on search term
        const filtered = placements.filter((student) => student.fname.toLowerCase().includes(event.target.value.toLowerCase())
            || student.lname.toLowerCase().includes(event.target.value.toLowerCase())
            || student.studentId.includes(event.target.value));
        setFilteredPlacements(filtered);
    };

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Student Placement Details"
        });
    });

    useEffect(() => {
        if (!fetched) {
            studentStore.fetch();
        }
        console.log("studentStore: ", studentStore);
    }, []);

    const [hoveredStudent, setHoveredStudent] = useState(null);

    const handleHover = (student) => {
        const hoveredList = list.find((item) => item.studentId === student.studentId);
        setHoveredStudent(hoveredList);
    };

    return (
        <Container style={{ height: "100vh", overflowY: "auto", marginBottom: "10px" }}>
            <TextField
                label="Search by Name or Student ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Grid container spacing={2}>
                {filteredPlacements.map((student, index) => (
                    <React.Fragment key={student._id}>
                        <Grid
                            item
                            xs={12}
                        >
                            <Divider />
                            <Tooltip
                                title={
                                    hoveredStudent ? (
                                        <div>
                                            <div>
                                                Student ID:
                                                {" "}
                                                {hoveredStudent.studentId}
                                            </div>
                                            <div>
                                                Name:
                                                {" "}
                                                {`${hoveredStudent.fname} ${hoveredStudent.lname}`}
                                            </div>
                                            <div>
                                                Email:
                                                {" "}
                                                {hoveredStudent.email}
                                            </div>
                                            <div>
                                                Year:
                                                {" "}
                                                {hoveredStudent.year}
                                            </div>
                                            <div>
                                                Term:
                                                {" "}
                                                {hoveredStudent.term}
                                            </div>
                                        </div>
                                    ) : ""
                                }
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ mt: "10px" }}
                                    onMouseEnter={() => handleHover(student)}
                                    onMouseLeave={() => setHoveredStudent(null)}
                                >
                                    {`${student.fname} ${student.lname} - ${student.studentId}`}
                                </Typography>
                            </Tooltip>
                        </Grid>
                        {student.placements.map((placement, placementIndex) => (
                            <Grid
                                item
                                xs={12}
                                key={placementIndex}
                            >
                                <div>
                                    <Typography variant="subtitle1">{placement.agency?.name}</Typography>
                                    <Typography variant="body2">
                                        {placement.agency ? `Type: ${placement.agency?.placement_type}, Agency Type: ${placement.agency?.agency_type}` : ""}
                                    </Typography>
                                </div>
                            </Grid>
                        ))}
                    </React.Fragment>
                ))}
            </Grid>
        </Container>
    );
}

export default StudentPlacements;
