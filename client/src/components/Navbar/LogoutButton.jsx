import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const LogoutButton = ({ className }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // remove token from local storage
  };

  return (
    <button onClick={handleLogout}>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className={`${className} text-3xl text-red-500 hover:text-blue-800`}
      />
    </button>
  );
};

LogoutButton.propTypes = {
  className: PropTypes.string,
};

export default LogoutButton;
