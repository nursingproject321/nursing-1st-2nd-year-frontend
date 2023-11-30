import { useContext, useEffect, useState } from "react";
import {
    Navigate, Outlet, Route, Routes, useLocation, Redirect
} from "react-router-dom";
import Login from "./components/auth/login";
import { UserContext } from "./services";
import CCList from "./components/student-dashboard/cclist";
import HospitalList from "./components/student-dashboard/HospitalList";
import DetailsPage from "./components/student-dashboard/DetailsPage";
import HospitalRegistrationForm from "./components/student-dashboard/hospital_registration";
import CCRegistrationForm from "./components/student-dashboard/cc_registration";
import RegisteredAgencies from "./components/student-dashboard/RegisteredAgencies";
import AdminHospitalList from "./components/admin-dashboard/AdminHospitalList";
import ClinicalPlan from "./components/student-dashboard/ClinicalPlan";
import RegistrationToggle from "./components/admin-dashboard/RegistrationToggle";
import StudentPlacements from "./components/admin-dashboard/StudentPlacements";
import RegisteredClinicalPlan from "./components/student-dashboard/RegisteredClinicalPlan";
import AgencyPlacements from "./components/admin-dashboard/AgencyPlacements";
import ClinicalPlansList from "./components/admin-dashboard/ClinicalPlansList";
import SetSemOptions from "./components/admin-dashboard/SetSemOptions";

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
    return <Navigate to="/login" state={{ from: location }} />;
}

export default function AppRoutes() {
    const { userData } = useContext(UserContext);

    // useEffect(() => {
    //     const { user } = userData;
    //     if (user) {
    //         setUserType(user.type);
    //     }
    // }, []);

    let redirectTarget;
    console.log("UserData in App.js: ", userData);
    if (userData.user) {
        redirectTarget = userData.user.type === "student" ? "/student" : "/admin";
    } else {
        redirectTarget = "/login";
    }

    return (
        <Routes>
            <Route path="/login" element={userData.user ? <Navigate to={redirectTarget} replace /> : <Login />} />
            <Route element={<RequireAuth />}>
                <Route path="/student" element={<Outlet />}>
                    <Route path="" element={<Navigate to="/student/hospital-list" />} />
                    <Route path="hospital-list" element={<HospitalList />} />
                    <Route path="cc-list" element={<CCList />} />
                    {/* <Route path="location-form" element={<LocationForm />} /> */}
                    <Route path="location-form" element={<ClinicalPlan />} />
                    <Route path="hospital-register" element={<HospitalRegistrationForm />} />
                    <Route path="cc-register" element={<CCRegistrationForm />} />
                    <Route path="registered-agencies" element={<RegisteredAgencies />} />
                    <Route path="registered-clinical-plan" element={<RegisteredClinicalPlan />} />
                    <Route path="details/:id" element={<DetailsPage />} />
                    {/* <Route path="*" element={<Navigate to="/students" replace />} /> */}
                </Route>
                <Route element={<RequireAuth />}>
                    <Route path="/admin" element={<Outlet />}>
                        <Route path="" element={<Navigate to="/admin/hospital-list" />} />
                        <Route path="hospital-list" element={<AdminHospitalList />} />

                        <Route path="create-clinical-plan" element={<SetSemOptions />} />
                        <Route path="clinical-plan-list" element={<ClinicalPlansList />} />
                        <Route path="hospital-placements" element={<AgencyPlacements agencyType="hospital" />} />
                        <Route path="community-placements" element={<AgencyPlacements agencyType="community" />} />
                        <Route path="student-placements" element={<StudentPlacements />} />
                        <Route path="registration-toggle" element={<RegistrationToggle />} />
                    </Route>
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
