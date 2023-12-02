import React from "react";
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Link, Grid
} from "@mui/material";

// Function to convert snake_case to readable format
const formatKey = (key) => key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function Details({ data }) {
    const details = data;

    // Keys to exclude from the display
    const excludedKeys = ["_id", "visibility", "createdAt", "updatedAt", "__v", "placements"];

    /* eslint-disable no-nested-ternary */
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {Object.entries(details).map(([key, value]) => (
                        // Exclude keys with empty values or empty strings
                        (value && value !== "" && !excludedKeys.includes(key)) && (
                            <TableRow key={key}>
                                <TableCell>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Typography>
                                                {formatKey(key)}
                                                :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {key === "website" ? (
                                                <Link
                                                    href={value}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {value}
                                                </Link>
                                            ) : (
                                                <Typography>
                                                    {key === "placements"
                                                        ? JSON.stringify(value)
                                                        : typeof value === "boolean"
                                                            ? value ? "Yes" : "No"
                                                            : value}
                                                </Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        )
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Details;
