import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import useAuth from "../hooks/useAuth";

function Header() {
  const { user } = useAuth();
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">My App</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {user && (
        <div className="flex gap-5">
          <span>Hello {user}</span>
          <LogoutButton />
        </div>
      )}
    </header>
  );
}

export default Header;
