import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HowToRegIcon from "@mui/icons-material/HowToReg";

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
                name: "List of available agencies - Hospital",
                Icon: PeopleAltIcon
            },
            {
                id: "cc-list",
                name: "List of available agencies - Community Clinical",
                Icon: LocalHospitalIcon
            },
            {
                id: "location-form",
                name: "Clinical plan",
                Icon: SchoolIcon
            },
            {
                id: "hospital-register",
                name: "Hospital Registration Form",
                Icon: PersonIcon
            },
            {
                id: "cc-register",
                name: "Community Registration Form",
                Icon: LocationOnIcon
            },
            {
                id: "registered-agencies",
                name: "Registered Agencies",
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
            id: "cc-list",
            name: "List of available agencies - Community Clinical",
            Icon: LocalHospitalIcon
        },
        {
            id: "clinical-plan",
            name: "Create Clinical Plan",
            Icon: SchoolIcon
        },
        {
            id: "list-clinical-plan",
            name: "List of Clinical Plans of Students",
            Icon: SchoolIcon
        },
        {
            id: "hospital-placements",
            name: "Hospital Placements",
            Icon: PersonIcon
        },
        {
            id: "cc-placements",
            name: "Community Placements",
            Icon: LocationOnIcon
        },
        {
            id: "student-placements",
            name: "Student Placements",
            Icon: HowToRegIcon
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
