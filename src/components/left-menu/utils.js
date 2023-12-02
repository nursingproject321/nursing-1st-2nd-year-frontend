import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import PageviewIcon from "@mui/icons-material/Pageview";

export const DrawerWidth = 300;

// export const Menus = [
//     {
//         id: "hospital-list",
//         name: "List of available agencies - Hospital",
//         Icon: PeopleAltIcon
//     },
//     {
//         id: "cc-list",
//         name: "List of available agencies - Community Clinical",
//         Icon: LocalHospitalIcon
//     },
//     {
//         id: "location-form",
//         name: "Clinical plan",
//         Icon: SchoolIcon
//     },
//     {
//         id: "hospital-register",
//         name: "Hospital Registration Form",
//         Icon: PersonIcon
//     },
//     {
//         id: "cc-register",
//         name: "Community Registration Form",
//         Icon: LocationOnIcon
//     },
//     {
//         id: "registered-agencies",
//         name: "Registered Agencies",
//         Icon: HowToRegIcon
//     }
// ];

export const getMenus = (userType) => {
    if (userType === "student") {
        return [
            {
                id: "hospital-list",
                name: "Hospital Agencies",
                Icon: LocalHospitalIcon
            },
            {
                id: "cc-list",
                name: "Community Clinical Agencies",
                Icon: PeopleIcon
            },
            {
                id: "hospital-register",
                name: "Hospital Registration",
                Icon: LocalHospitalIcon
            },
            {
                id: "cc-register",
                name: "Community Registration",
                Icon: PeopleIcon
            },
            {
                id: "registered-agencies",
                name: "Registered Agencies",
                Icon: HowToRegIcon
            },
            {
                id: "location-form",
                name: "Clinical plan",
                Icon: PageviewIcon
            },
            {
                id: "registered-clinical-plan",
                name: "Registered Clinical plan",
                Icon: HowToRegIcon
            }
        ];
    }
    return [
        {
            id: "hospital-list",
            name: "List of available agencies - Hospital",
            Icon: PeopleAltIcon
        },
        {
            id: "community-list",
            name: "List of available agencies - Community Clinical",
            Icon: LocalHospitalIcon
        },
        {
            id: "create-clinical-plan",
            name: "Create Clinical Plan",
            Icon: SchoolIcon
        },
        {
            id: "clinical-plan-list",
            name: "List of Clinical Plans of Students",
            Icon: SchoolIcon
        },
        {
            id: "hospital-placements",
            name: "Hospital Placements",
            Icon: PersonIcon
        },
        {
            id: "community-placements",
            name: "Community Placements",
            Icon: LocationOnIcon
        },
        {
            id: "student-placements",
            name: "Student Placements",
            Icon: HowToRegIcon
        },
        {
            id: "registration-toggle",
            name: "Turn Registration On/Off",
            Icon: ToggleOnIcon
        }
    ];
};

// import HomeIcon from "@mui/icons-material/Home";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import SchoolIcon from "@mui/icons-material/School";
// import PersonIcon from "@mui/icons-material/Person";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PersonPinIcon from "@mui/icons-material/PersonPin";

// export const DrawerWidth = 300;

// export const Menus = [
//     {
//         id: "students",
//         name: "Hospital Agencies",
//         Icon: PeopleAltIcon
//     },
//     {
//         id: "hospitals",
//         name: "Community Agencies",
//         Icon: LocalHospitalIcon
//     },
//     {
//         id: "schools",
//         name: "Clinical plan",
//         Icon: SchoolIcon
//     },
//     {
//         id: "instructors",
//         name: "Hospital Registrations",
//         Icon: PersonIcon
//     },
//     {
//         id: "placement-locations",
//         name: "Community Registration",
//         Icon: LocationOnIcon
//     },
//     {
//         id: "placements",
//         name: "Form Settings",
//         Icon: PersonPinIcon
//     },
//     {
//         id: "student-links",
//         name: "Student Links",
//         Icon: PersonPinIcon
//     }
// ];
