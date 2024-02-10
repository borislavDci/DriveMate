import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function NavItem({ title, icon, pathname }) {
  return (
    <li className="px-2">
      <NavLink
        to={pathname}
        className="hover:underline flex gap-3 items-center justify-center flex-row-reverse md:flex-row "
      >
        {" "}
        <FontAwesomeIcon className="text-xl" icon={icon} /> <span>{title}</span>
      </NavLink>
    </li>
  );
}

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
};
export default NavItem;
