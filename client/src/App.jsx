import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import AuthRedirectLayout from "./layout/AuthRedirectLayout";
import { getProfileData } from "./loaders/getProfileData";
import ErrorPage from "./error-page";
import ProtectedLayout from "./layout/ProtectedLayout";
import AddListing from "./components/Dashboard/Owner/AddListing";
import BrowseListings from "./components/BrowseListings";
import { getDashboardData } from "./loaders/getDashboardData";
import UpdateListing from "./components/Dashboard/Owner/UpdateListing";
import { getListing } from "./loaders/getListing";
import DashboardLayout from "./layout/DashboardLayout";
import ListingId from "./components/ListingId";
import { getAllListings } from "./loaders/getAllListings";
import ProfileLayout from "./layout/ProfileLayout";
import ChangePassword from "./components/Changepassword";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Homepage />} />
        <Route element={<AuthRedirectLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="/browse"
          element={<BrowseListings />}
          loader={getAllListings}
        />
        <Route
          path="/listing/:id"
          element={<ListingId />}
          loader={getListing}
        />
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
              loader={getDashboardData}
            />
            <Route
              path="/dashboard/profile"
              element={<ProfileLayout />}
              loader={getProfileData}
            >
              <Route
                path="/dashboard/profile/editprofile"
                element={<Profile />}
              />
              <Route
                path="/dashboard/profile/changepassword"
                element={<ChangePassword />}
              />
            </Route>
            <Route path="/dashboard/addlisting" element={<AddListing />} />
            <Route
              path="/dashboard/updatelisting/:id"
              element={<UpdateListing />}
              loader={getListing}
            />
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
