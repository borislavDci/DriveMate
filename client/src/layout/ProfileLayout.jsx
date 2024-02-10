import { Outlet, useLoaderData, useRevalidator } from "react-router-dom";
import api from "../utils/api";

const ProfileLayout = () => {
  const user = useLoaderData();
  const revalidate = useRevalidator();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-5 flex-col sm:flex-row ">
        <div>
          <label htmlFor="image">
            <img
              className="w-52 h-52 rounded-full border-4 border-blue-500"
              src={`${api.defaults.baseURL}/avatars/${user.avatarURL}`}
              alt="NoImage"
            />
          </label>
          <div></div>
        </div>
        <div>
          <p className="font-bold text-3xl">{`${user.firstName} ${user.lastName}`}</p>
          <p className={user.isVerified ? "text-blue-500" : "text-red-500"}>
            {user.isVerified ? "Verified" : "Not Verified"}
          </p>
          <p>{user.role}</p>
        </div>
      </div>
      <Outlet context={{ user, revalidate }} />
    </div>
  );
};

export default ProfileLayout;
