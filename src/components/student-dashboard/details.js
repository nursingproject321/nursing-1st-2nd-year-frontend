import React from "react";
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Link, Grid
} from "@mui/material";

function Details({ data }) {
    const details = data;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <Typography variant="h5" gutterBottom>
                                {details.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {details.description}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography>Placement Type:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{details.placement_type}</Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography>Agency Type:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{details.agency_type}</Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography>Address:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{details.address}</Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography>Website:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link
                                        href={details.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {details.website}
                                    </Link>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography>Languages:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{details.languages}</Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography>Police Clearance:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{details.police_clearance}</Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography>Total Capacity:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{details.total_capacity}</Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography>Current Capacity:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{details.current_capacity}</Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Details;
