import { useState, useRef, useEffect } from "react";
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

const Select = ({ data, defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [focusIndex, setFocusIndex] = useState(-1);

  const listRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const options = Object?.values(data)[0];
  const initiator = Object?.keys(data)[0];

  const handleSelect = (option, initiator) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (option === defaultValue) {
      onChange(option.split(" ")[0], initiator);
    } else {
      onChange(option, initiator);
    }
  };

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

  useEffect(() => {
    if (options[0] !== defaultValue) {
      options.unshift(defaultValue);
    }
    if (defaultValue === "All models") {
      setSelectedOption(defaultValue);
    }
  }, [options, defaultValue]);

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
          className="absolute min-w-max mt-1 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg"
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

export default Select;
