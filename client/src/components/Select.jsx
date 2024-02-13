import { useState, useRef, useEffect } from "react";
import propTypes from "prop-types";
/**
 * Select component for choosing an option from a dropdown list.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data object containing the options.
 * @param {string} props.defaultValue - The default selected option.
 * @param {Function} props.onChange - The callback function triggered when an option is selected.
 * @returns {JSX.Element} The Select component.
 */

const Select = ({ data, defaultValue, selectedOption, setSelectedOption }) => {
  /// The isOpen state is used to determine if the dropdown list is open.
  const [isOpen, setIsOpen] = useState(false);
  /// The focusIndex state is used to determine the index of the focused option in the dropdown list.
  const [focusIndex, setFocusIndex] = useState(-1);
  /// The listRef and toggleButtonRef are used to reference the dropdown list and the toggle button.
  const listRef = useRef(null);
  const toggleButtonRef = useRef(null);

  /// The options and initiator are extracted from the data object.
  const options = Object?.values(data)[0];
  const initiator = Object?.keys(data)[0];

  /// The handleSelect function is called when an option is selected from the dropdown list.
  const handleSelect = (option, initiator) => {
    if (option === defaultValue) {
      setSelectedOption((prev) => {
        return { ...prev, [initiator]: options[0] };
      });
    } else {
      setSelectedOption((prev) => {
        return { ...prev, [initiator]: option };
      });
    }

    setIsOpen(false);
  };

  /// The handleKeyDown function is called when a key is pressed.
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusIndex((prevIndex) => (prevIndex + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusIndex(
          (prevIndex) => (prevIndex - 1 + options.length) % options.length
        );
        break;
      case "Enter":
        event.preventDefault();
        handleSelect(options[focusIndex], initiator);
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        if (toggleButtonRef.current) {
          toggleButtonRef.current.focus();
        }
        break;
      default:
        break;
    }
  };

  /// The useEffect hook is used to add the default value to the options array.
  useEffect(() => {
    if (options[0] !== defaultValue) {
      options.unshift(defaultValue);
    }
  }, [options, defaultValue]);

  /// The useEffect hook is used to set the focus index when the dropdown list is open.
  useEffect(() => {
    if (isOpen && focusIndex === -1 && listRef.current) {
      setFocusIndex(0);
    }
    if (isOpen && focusIndex !== -1 && listRef.current) {
      listRef.current.children[focusIndex].focus();
    }
  }, [isOpen, focusIndex]);

  return (
    <div className="relative">
      <button
        ref={toggleButtonRef}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-[200px] px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {selectedOption || "Select an option"}
        <span className="relative  ">
          <span
            className={`w-4 h-1 bg-black absolute top-0 right-[9px] transition-all ease-in-out duration-150 rounded-md  ${
              isOpen ? "-rotate-45" : "rotate-45"
            }`}
          ></span>
          <span
            className={`w-4 h-1 bg-black absolute top-0 right-0 transition-all ease-in-out duration-150  rounded-md ${
              isOpen ? "rotate-45" : "-rotate-45"
            }`}
          ></span>
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          ref={listRef}
          onKeyDown={handleKeyDown}
          className="absolute min-w-max mt-1 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg z-10"
        >
          {options.map((option, index) => (
            <li
              key={option + index}
              role="option"
              aria-selected={option === selectedOption}
              onClick={() => handleSelect(option, initiator)}
              tabIndex="-1"
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                index === focusIndex ? "bg-gray-100" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  data: propTypes.object.isRequired,
  defaultValue: propTypes.string.isRequired,
  selectedOption: propTypes.string,
  setSelectedOption: propTypes.func,
};

export default Select;
