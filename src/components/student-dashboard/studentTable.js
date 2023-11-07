import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TextField,
    Link
} from "@mui/material";
// import { Link } from "react-router-dom";
// import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function StudentTable({ data }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredData = data.filter(
        (row) => row.name.toLowerCase().includes(searchText.toLowerCase()) || row.id.toString().includes(searchText)
    );

    let i = 1;

    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Hospital Name</TableCell>
                            <TableCell>Agency Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, id) => (
                                <TableRow key={id}>
                                    {/* <TableCell>{row.id}</TableCell> */}
                                    <TableCell>{i++}</TableCell>

                                    {/* <TableCell>{row.name}</TableCell> */}
                                    {/* <Link to={`/hospital/${row.id}`}>{row.name}</Link> */}
                                    {/* <TableCell><Link to="/hospital_list">{row.name}</Link></TableCell> */}
                                    <TableCell>
                                        <Link component={RouterLink} to={`/hospital_details/${row._id}`}>
                                            {row.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {row.placement_type}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}

// import {
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
// } from "@mui/material";

// export default function StudentTable({ data }) {
//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>No.</TableCell>
//                         <TableCell>Hospital Name</TableCell>
//                     </TableRow>
//                 </TableHead>

//                 <TableBody>
//                     {data.map((row, id) => (
//                         <TableRow key={id}>
//                             <TableCell>{row.id}</TableCell>
//                             <TableCell>{row.name}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }
