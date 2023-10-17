import { useContext } from "react";
import {
    Navigate, Outlet, Route, Routes, useLocation
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
    return (
        <Routes>
            <Route path="/login" element={userData.user ? <Navigate to="/students" replace /> : <Login />} />

            <Route path="/studentdashboard" element={<StudentDashboard />} />
            <Route path="/hospital_list">
                <Route path="" element={<HospitalList />} />
            </Route>
            <Route path="/cclist">
                <Route path="" element={<CCList />} />
            </Route>
            <Route path="/hospital_details/:id">
                <Route path="" element={<DetailsPage />} />
            </Route>
            <Route path="/location_form" element={<Outlet />}>
                <Route path="" element={<LocationForm />} />
            </Route>
            <Route path="/hospital_registration" element={<Outlet />}>
                <Route path="" element={<HospitalRegistrationForm />} />
            </Route>
            <Route path="/cc_registration" element={<Outlet />}>
                <Route path="" element={<CCRegistrationForm />} />
            </Route>
            <Route path="/admin_login" element={userData.user ? <Navigate to="/students" replace /> : <Login />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />

            <Route element={<RequireAuth />}>
                <Route path="/students" element={<Outlet />}>
                    <Route path="" element={<Students />} />
                    <Route path="add" element={<AddEditStudent />} />
                    <Route path=":id" element={<AddEditStudent />} />
                    <Route path="*" element={<Navigate to="/students" replace />} />
                </Route>
                <Route path="/hospitals" element={<Outlet />}>
                    <Route path="" element={<Hospitals />} />
                    <Route path="add" element={<AddEditHospital />} />
                    <Route path="edit" element={<AddEditHospital />} />
                    <Route path="*" element={<Navigate to="/hospitals" replace />} />
                </Route>
                <Route path="/schools" element={<Outlet />}>
                    <Route path="" element={<Schools />} />
                    <Route path="add" element={<AddEditSchool />} />
                    <Route path="edit" element={<AddEditSchool />} />
                    <Route path="*" element={<Navigate to="/schools" replace />} />
                </Route>
                <Route path="/instructors" element={<Outlet />}>
                    <Route path="" element={<Instructors />} />
                    <Route path="add" element={<AddEditInstructor />} />
                    <Route path="edit" element={<AddEditInstructor />} />
                    <Route path="*" element={<Navigate to="/instructors" replace />} />
                </Route>
                <Route path="/placement-locations" element={<Outlet />}>
                    <Route path="" element={<PlacementLocations />} />
                    <Route path="add" element={<AddEditPlacementLocation />} />
                    <Route path="edit" element={<AddEditPlacementLocation />} />
                    <Route path="*" element={<Navigate to="/placement-locations" replace />} />
                </Route>
                <Route path="/placements" element={<Outlet />}>
                    <Route path="" element={<Placements />} />
                    <Route path="add" element={<NewPlacement />} />
                    <Route path=":id" element={<ViewPlacement />} />
                    <Route path="*" element={<Navigate to="/placements" replace />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
