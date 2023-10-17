import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonPinIcon from "@mui/icons-material/PersonPin";

export const DrawerWidth = 300;

export const Menus = [
    {
        id: "hospital_list",
        name: "List of available agencies - Hospital",
        Icon: PeopleAltIcon
    },
    {
        id: "cclist",
        name: "List of available agencies - Community Clinical",
        Icon: LocalHospitalIcon
    },
    {
        id: "location_form",
        name: "Clinical plan",
        Icon: SchoolIcon
    },
    {
        id: "hospital_registration",
        name: "Hospital Registration Form",
        Icon: PersonIcon
    },
    {
        id: "cc_registration",
        name: "Community Registration Form",
        Icon: LocationOnIcon
    }
];
