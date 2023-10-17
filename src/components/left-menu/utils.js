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
        id: "students",
        name: "Hospital Agencies",
        Icon: PeopleAltIcon
    },
    {
        id: "hospitals",
        name: "Community Agencies",
        Icon: LocalHospitalIcon
    },
    {
        id: "schools",
        name: "Clinical plan",
        Icon: SchoolIcon
    },
    {
        id: "instructors",
        name: "Hospital Registrations",
        Icon: PersonIcon
    },
    {
        id: "placement-locations",
        name: "Community Registration",
        Icon: LocationOnIcon
    },
    {
        id: "placements",
        name: "Form Settings",
        Icon: PersonPinIcon
    },
    {
        id: "student-links",
        name: "Student Links",
        Icon: PersonPinIcon
    }
];
