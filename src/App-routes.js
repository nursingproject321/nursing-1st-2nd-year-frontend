import { useContext, useEffect, useState } from "react";
import {
    Navigate, Outlet, Route, Routes, useLocation, Redirect
} from "react-router-dom";
import Login from "./components/auth/login";
import Hospitals from "./components/hospitals";
import AddEditHospital from "./components/hospitals/add-edit-hospital";
import Schools from "./components/schools";
import AddEditSchool from "./components/schools/add-edit-school";
import Instructors from "./components/instructors";
import Students from "./components/students";
import AddEditInstructor from "./components/instructors/add-edit-instructor";
import PlacementLocations from "./components/placement-locations";
import AddEditPlacementLocation from "./components/placement-locations/add-edit-placement-location";
import AddEditStudent from "./components/students/add-edit-student";
import Placements from "./components/placements";
import NewPlacement from "./components/placements/new-placement";
import ViewPlacement from "./components/placements/view-placement";
import { UserContext } from "./services";
import StudentDashboard from "./components/student-dashboard";
import CCList from "./components/student-dashboard/cclist";
import HospitalList from "./components/student-dashboard/HospitalList";
import DetailsPage from "./components/student-dashboard/DetailsPage";
import LocationForm from "./components/student-dashboard/location_form";
import HospitalRegistrationForm from "./components/student-dashboard/hospital_registration";
import AdminDashboard from "./components/admin-dashboard";
import CCRegistrationForm from "./components/student-dashboard/cc_registration";
import CommunityList from "./components/admin-dashboard/community_list";
import RegisteredAgencies from "./components/student-dashboard/RegisteredAgencies";

function RequireAuth() {
    const { userData } = useContext(UserContext);
    const location = useLocation();

    if (userData.user) {
        return <Outlet />;
    }

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    console.log("Not Authorised");
    return <Navigate to="/login" state={{ from: location }} />;
}

export default function AppRoutes() {
    const { userData } = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        const { user } = userData;

        if (user) {
            setIsLoggedIn(true);
            setUserType(user.type);
        }
    }, []);

    let redirectTarget;
    if (isLoggedIn) {
        redirectTarget = userType === "student" ? "/student" : "/admin";
    } else {
        redirectTarget = "/login";
    }

    return (
        <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to={redirectTarget} replace /> : <Login />} />
            <Route element={<RequireAuth />}>
                <Route path="/student" element={<Outlet />}>
                    <Route path="" element={<Navigate to="/student/hospital-list" />} />
                    <Route path="hospital-list" element={<HospitalList />} />
                    <Route path="cc-list" element={<CCList />} />
                    <Route path="location-form" element={<LocationForm />} />
                    <Route path="hospital-register" element={<HospitalRegistrationForm />} />
                    <Route path="cc-register" element={<CCRegistrationForm />} />
                    <Route path="registered-agencies" element={<RegisteredAgencies />} />
                    <Route path="details/:id" element={<DetailsPage />} />
                    {/* <Route path="*" element={<Navigate to="/students" replace />} /> */}
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

    // <Routes>
    //     {/* <Router>
    //         <Switch>
    //             <Route path="/login" exact>
    //                 {isLoggedIn ? <Redirect to={redirectTarget} /> : <Login />}
    //             </Route>
    //             <PrivateRoute
    //                 path="/student/dashboard"
    //                 component={StudentDashboard}
    //                 userType="student"
    //             />
    //             <PrivateRoute
    //                 path="/admin/dashboard"
    //                 component={AdminDashboard}
    //                 userType="admin"
    //             />
    //             <Redirect from="/" to="/login" />
    //         </Switch>
    //     </Router> */}

    //     {/* <Route path="/login" element={userData.user ? <Navigate to="/students" replace /> : <Login />} /> */}
    //     <Route path="/login" element={isLoggedIn ? <Navigate to={redirectTarget} replace /> : <Login />} />

    //     {/* <Route path="/login" exact>
    //         {isLoggedIn ? <Navigate to={redirectTarget} /> : <Login />}
    //     </Route> */}

    //     <Route path="/studentdashboard" element={<StudentDashboard />} />
    //     <Route path="/hospital_list">
    //         <Route path="" element={<HospitalList />} />
    //     </Route>
    //     <Route path="/cclist">
    //         <Route path="" element={<CCList />} />
    //     </Route>
    //     <Route path="/hospital_details/:id">
    //         <Route path="" element={<DetailsPage />} />
    //     </Route>
    //     <Route path="/location_form" element={<Outlet />}>
    //         <Route path="" element={<LocationForm />} />
    //     </Route>
    //     <Route path="/hospital_registration" element={<Outlet />}>
    //         <Route path="" element={<HospitalRegistrationForm />} />
    //     </Route>
    //     <Route path="/cc_registration" element={<Outlet />}>
    //         <Route path="" element={<CCRegistrationForm />} />
    //     </Route>
    //     <Route path="/admin_login" element={userData.user ? <Navigate to="/students" replace /> : <Login />} />
    //     <Route path="/admindashboard" element={<AdminDashboard />} />

    //     <Route element={<RequireAuth />}>
    //         <Route path="/students" element={<Outlet />}>
    //             <Route path="" element={<StudentDashboard />} />
    //             <Route path="add" element={<AddEditStudent />} />
    //             <Route path=":id" element={<AddEditStudent />} />
    //             <Route path="*" element={<Navigate to="/students" replace />} />
    //         </Route>
    //         <Route path="/hospitals" element={<Outlet />}>
    //             <Route path="" element={<Hospitals />} />
    //             <Route path="add" element={<AddEditHospital />} />
    //             <Route path="edit" element={<AddEditHospital />} />
    //             <Route path="*" element={<Navigate to="/hospitals" replace />} />
    //         </Route>
    //         <Route path="/schools" element={<Outlet />}>
    //             <Route path="" element={<Schools />} />
    //             <Route path="add" element={<AddEditSchool />} />
    //             <Route path="edit" element={<AddEditSchool />} />
    //             <Route path="*" element={<Navigate to="/schools" replace />} />
    //         </Route>
    //         <Route path="/instructors" element={<Outlet />}>
    //             <Route path="" element={<Instructors />} />
    //             <Route path="add" element={<AddEditInstructor />} />
    //             <Route path="edit" element={<AddEditInstructor />} />
    //             <Route path="*" element={<Navigate to="/instructors" replace />} />
    //         </Route>
    //         <Route path="/placement-locations" element={<Outlet />}>
    //             <Route path="" element={<PlacementLocations />} />
    //             <Route path="add" element={<AddEditPlacementLocation />} />
    //             <Route path="edit" element={<AddEditPlacementLocation />} />
    //             <Route path="*" element={<Navigate to="/placement-locations" replace />} />
    //         </Route>
    //         <Route path="/placements" element={<Outlet />}>
    //             <Route path="" element={<Placements />} />
    //             <Route path="add" element={<NewPlacement />} />
    //             <Route path=":id" element={<ViewPlacement />} />
    //             <Route path="*" element={<Navigate to="/placements" replace />} />
    //         </Route>
    //     </Route>
    //     <Route path="*" element={<Navigate to="/login" replace />} />
    // </Routes>
    );
}
