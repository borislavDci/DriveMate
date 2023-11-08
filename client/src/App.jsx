import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import AuthRedirectLayout from "./layout/AuthRedirectLayout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route element={<AuthRedirectLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
