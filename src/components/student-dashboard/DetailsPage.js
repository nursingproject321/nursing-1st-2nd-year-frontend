// HospitalDetails.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams, createSearchParams, useNavigate, useLocation
} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import LeftMenuHeader from "./header";
import { DrawerWidth, Menus } from "./utils";
import Details from "./details";

function DetailsPage() {
    const { id } = useParams();
    const [apiResponse, setApiResponse] = useState(null);
    const endpoint = "/agency/id";
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(endpoint, {
            id
        })
            .then((response) => {
                setApiResponse(response.data);
            })
            .catch((error) => (
                <div>
                    Error fetching data:
                    {" "}
                    {error.response.data.message}
                </div>
            ));
    }, [id]);

    console.log("ID: ", id);
    console.log("API data: ", apiResponse);

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
                    margin: "10px 10px 10px 10px",
                    textAlign: "center"
                }}
            >
                <div>
                    {apiResponse ? (
                        <Details data={apiResponse} />
                    ) : (
                        <Box sx={{ display: "flex" }}>
                            <CircularProgress />
                        </Box>
                    )}
                </div>
            </Box>
        </Box>
    );
}

export default DetailsPage;
