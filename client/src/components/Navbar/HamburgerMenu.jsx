import PropTypes from "prop-types";

function HamburgerMenu({ isOpen, toggleMenu }) {
  return (
    <div className="md:hidden">
      <button
        className={`${
          !isOpen ? "hover:gap-3" : ""
        } flex flex-col gap-2 transition-all duration-500 ease-in-out group items-center`}
        onClick={toggleMenu}
      >
        <span
          className={`${
            isOpen ? "rotate-[-45deg] translate-y-4 group-hover:bg-red-600" : ""
          } bg-white h-2 w-14 transotoion-all duration-500 ease-in-out rounded-md `}
        ></span>
        <span
          className={`${
            isOpen ? "opacity-0" : ""
          } bg-white h-2 w-14 transotoion-all duration-700 ease-in-out group-hover:w-10 rounded-md`}
        ></span>
        <span
          className={`${
            isOpen && "-translate-y-4 rotate-[45deg] group-hover:bg-red-600"
          } bg-white h-2 w-14 transotoion-all duration-500 ease-in-out  rounded-md`}
        ></span>
      </button>
    </div>
  );
}

HamburgerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default HamburgerMenu;
