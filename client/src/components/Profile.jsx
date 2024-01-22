import { Form, useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";

const Profile = () => {
  const user = useLoaderData();
  const userDataArray = Object.keys(user);
  console.log(user);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  const revalidate = useRevalidator();

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
    <div className="flex flex-col items-center">
      <div>
        {isEditing ? (
          <label htmlFor="image">
            <img
              src={`${api.defaults.baseURL}/avatars/${user.avatarURL}`}
              alt="NoImage"
            />
          </label>
        ) : (
          <img
            src={`${api.defaults.baseURL}/avatars/${user.avatarURL}`}
            alt="NoImage"
          />
        )}

        <Form encType="multipart/form-data" onSubmit={onSubmitForm}>
          <input
            className="hidden"
            type="file"
            name="image"
            id="image"
            accept="image/*"
            multiple={false}
          />
          {isEditing ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Save Avatar
            </button>
          ) : null}
        </Form>
      </div>
      <ul className="w-64 list-none p-4 text-gray-700">
        <li></li>
        {userDataArray.map((field) => (
          <li key={field} className="mb-2">
            {isEditing ? (
              <>
                <label htmlFor={field}>{field}</label>
                <input
                  onChange={(e) => handleChange(e, field)}
                  type="text"
                  name={field}
                  defaultValue={user[field]}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </>
            ) : (
              <>
                <span className="text-gray-500">{field.toUpperCase()}:</span>
                <span>
                  {user.isVerified}
                  {typeof user[field] === "object" ? "" : user[field]}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>

      {isEditing ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSaveProfile}
        >
          Save profile
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleEditProfile}
        >
          Edit profile
        </button>
      )}
    </div>
  );
};

export default Profile;
