import {
    useCallback, useEffect, useState, useMemo, useRef
} from "react";
import Box from "@mui/material/Box";
import { observer } from "mobx-react";
import { useStore } from "../../store";
import StudentTable from "./studentTable";
import { EVENTS, GlobalEventEmitter } from "../../services";

function cclist() {
    const { communityStore } = useStore();
    const { list, fetched } = communityStore;

    useEffect(() => {
        const fetchSchools = async () => {
            if (!fetched) {
                await communityStore.fetchAll();
            }
        };

        fetchSchools();
    }, []);

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Community List"
        });
    });

    return (
        <Box
            sx={{
                margin: "10px 10px 10px 10px",
                textAlign: "center"
            }}
        >
            <StudentTable data={list} />
        </Box>
    );
}

export default observer(cclist);
