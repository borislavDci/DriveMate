import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col xl:flex-row">
        {/* Sidebar */}
        <div className="w-full xl:w-1/4 bg-gray-800 text-white p-4 xl:h-screen">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <ul>
            <li>
              <NavLink to="/dashboard/profile">Profile</NavLink>
            </li>
            <li>
              <ul className="pl-5">
                <li>
                  <NavLink to="/dashboard/profile/editprofile">
                    Edit profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile/changepassword">
                    Change password
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile/changeaddress">
                    Change Address
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
