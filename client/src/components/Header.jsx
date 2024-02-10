import useAuth from "../hooks/useAuth";
import Navbar from "./Navbar/Navbar";

function Header() {
  const { user } = useAuth();
  return (
    <header
      className="bg-blue-700 text-white py-5 px-4 lg:px-8 flex justify-between items-center"
      id="header"
    >
      <h1 className="text-2xl font-bold">Drive Mate</h1>
      <Navbar user={user} />
    </header>
  );
}

export default Header;
