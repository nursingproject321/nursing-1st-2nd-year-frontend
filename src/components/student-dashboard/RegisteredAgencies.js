import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
    useEffect,
    useState
} from "react";
import axios from "axios";
import { EVENTS, GlobalEventEmitter } from "../../services";

export default function RegisteredAgencies() {
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        axios.post("/student/placements")
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
    }, []);

    useEffect(() => {
        GlobalEventEmitter.emit(EVENTS.UPDATE_TOP_BAR, {
            text: "Registered Agencies"
        });
    });

    return (
        <Box
            sx={{
                margin: "10px 10px 10px 10px"
            }}
        >
            {apiResponse && apiResponse.student && apiResponse.student.placements
        && apiResponse.student.placements.map((placement, index) => (
            <Card key={index} sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {placement.agency.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Type:
                        {" "}
                        {placement.agency.agency_type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Placement Type:
                        {" "}
                        {placement.agency.placement_type}
                    </Typography>
                </CardContent>
            </Card>
        ))}
        </Box>
    );
}
