import { Form, useOutletContext } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";

const excludedKeys = [
  "avatarURL",
  "listings",
  "bookings",
  "__v",
  "_id",
  "favoriteListings",
  "isVerified",
  "role",
];

const Profile = () => {
  const { user, revalidate } = useOutletContext();
  const userDataArray = Object.keys(user);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  const handleChange = (e, field) => {
    setUpdatedUser((prevState) => {
      return { ...prevState, [field]: e.target.value };
    });
  };

  const handleEditProfile = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleSaveProfile = async () => {
    console.log(updatedUser);
    try {
      await api.patch("/user", updatedUser);
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
    setUpdatedUser({});
    revalidate.revalidate();
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);

    try {
      await api.post("/upload/avatar", formData);
    } catch (error) {
      console.log(error);
    }

    revalidate.revalidate();
  };

  return (
    <>
      <div className="flex gap-5">
        <div className="flex gap-5 my-5 flex-col xl:flex-row bg-blue-300 p-5 rounded-lg">
          {userDataArray.map((key) => {
            if (excludedKeys.includes(key)) return null;
            return (
              <div key={key} className="flex flex-col gap-1 mb-2">
                <p className="font-bold">{capitalizeFirstLetter(key)}</p>
                <input
                  disabled={!isEditing}
                  className="border border-blue-500 rounded-sm pl-5 py-2"
                  type="text"
                  name={key}
                  id={key}
                  defaultValue={user[key]}
                  onChange={(e) => handleChange(e, key)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => {
          if (isEditing) handleSaveProfile();
          handleEditProfile();
        }}
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </>
  );
};

export default Profile;
