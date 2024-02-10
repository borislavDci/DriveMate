import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

const defaultInputData = {
  name: "",
  username: "",
  email: "",
  password: "",
};

export default function Register() {
  const [message, setMessage] = useState("");
  const [inputData, setInputData] = useState(defaultInputData);
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const formData = new FormData();
    Object.keys(inputData).forEach((key) => {
      if (key === "name") {
        const names = inputData[key].split(" ");
        formData.append("firstName", names[0]);
        formData.append("lastName", names[1]);
      }
      formData.append(key, inputData[key]);
    });
    const formDataObject = Object.fromEntries(formData);
    try {
      const res = await api.post("/user", formDataObject);
      if (res.status === 201) {
        setMessage(
          "Your account has been created successfully. Please wait to log in."
        );
        setInputData(defaultInputData);
        setTimeout(() => {
          login(formDataObject);
        }, 1000);
      }
    } catch (error) {
      setMessage(error.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={inputData.username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
