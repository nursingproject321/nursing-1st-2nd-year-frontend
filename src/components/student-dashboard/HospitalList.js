import {
    useEffect,
    useRef
} from "react";
import Box from "@mui/material/Box";
import { observer } from "mobx-react";
import { useStore } from "../../store";
import StudentTable from "./studentTable";
import { EVENTS, GlobalEventEmitter } from "../../services";

function HospitalList() {
    const { hospitalStore } = useStore();
    const { list, fetched } = hospitalStore;
    useEffect(() => {
        const fetchHosptials = async () => {
            if (!fetched) {
                await hospitalStore.fetchAll();
            }
        };
        fetchHosptials();
    }, []);

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Hospital List"
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

export default observer(HospitalList);
