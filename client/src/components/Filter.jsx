import { useEffect, useState } from "react";
import Select from "./Select";
import api from "../utils/api";
import CurrentQuery from "./CurrentQuery";
import PropTypes from "prop-types";

const filterDefaultState = {
  make: "All cars",
  model: "All models",
  year: "All years",
};

/**
 * Renders a filter component with selectable options for make, model, and year.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.listings - The list of car listings.
 * @param {Array} props.filteredListings - The filtered list of car listings.
 * @param {Function} props.setFilteredListings - The function to set the filtered list of car listings.
 * @param {string} props.className - The CSS class name for styling the component.
 * @returns {JSX.Element} The rendered filter component.
 */
function Filter({
  listings,
  filteredListings,
  setFilteredListings,
  className,
}) {
  const [options, setOptions] = useState({
    make: [],
    model: [],
    year: [],
  });
  const [selectedOption, setSelectedOption] = useState(filterDefaultState);

  // The useEffect hook is used to update the filtered list of car listings when the selected options change.
  useEffect(() => {
    if (selectedOption.make.split(" ")[0] === "All") {
      setFilteredListings(listings);
      setSelectedOption(filterDefaultState);
      return;
    }

    const filtered = listings.filter((listing) => {
      if (!listing) return false;
      console.log(selectedOption);
      for (let filterName in selectedOption) {
        console.log(filterName);
        if (
          selectedOption[filterName].split(" ")[0] !== "All" &&
          listing[filterName] !== selectedOption[filterName]
        ) {
          return false;
        }
      }
      return true;
    });

    setFilteredListings(filtered);
  }, [selectedOption]);

  /// The useEffect hook is used to fetch the list of car makes from the API when the component mounts.
  useEffect(() => {
    const fetchBrands = async () => {
      const data = (await api.get("enums/make")).data;
      setOptions((prev) => ({ ...prev, make: data, model: [] }));
    };
    fetchBrands();
  }, []);

  // The useEffect hook is used to fetch the list of car models from the API when the selected make changes.
  useEffect(() => {
    if (selectedOption.make.split(" ")[0] == "All") {
      return setOptions((prev) => ({ ...prev, model: [] }));
    }
    if (selectedOption.model.split(" ")[0] !== "All") {
      return setSelectedOption((prev) => ({
        ...prev,
        model: filterDefaultState.model,
      }));
    }
    const fetchModels = async () => {
      const data = (await api.get(`enums/model?make=${selectedOption.make}`))
        .data;
      const modelOptions = data.filter((option) =>
        listings.some(
          (listing) =>
            listing?.model === option && listing?.make === selectedOption.make
        )
      );

      setOptions((prev) => ({ ...prev, model: modelOptions }));
    };

    fetchModels();
  }, [selectedOption.make]);

  // The useEffect hook is used to filter the list of car years when the selected make and model changes.
  useEffect(() => {
    if (selectedOption.make.split(" ")[0] === "All")
      return setOptions((prev) => ({ ...prev, year: [] }));

    const years = listings
      .filter(
        (listing) =>
          (listing?.make === selectedOption.make ||
            selectedOption.make.split(" ")[0] === "All") &&
          (listing?.model === selectedOption.model ||
            selectedOption.model.split(" ")[0] === "All")
      )
      .map((listing) => listing?.year.toString());

    setOptions((prev) => ({
      ...prev,
      year: Array.from(new Set(years)).sort(
        (a, b) => parseInt(a) - parseInt(b)
      ),
    }));
  }, [filteredListings, selectedOption.make, selectedOption.model, listings]);

  return (
    <>
      <div
        className={`${className} w-full flex flex-col-reverse 2xl:flex-row gap-10 bg-blue-50 rounded-xl  items-center justify-between px-6 py-6`}
      >
        <div className="flex flex-col md:flex-row gap-5">
          <Select
            selectedOption={selectedOption.make}
            setSelectedOption={setSelectedOption}
            data={{ make: options?.make }}
            defaultValue={filterDefaultState.make}
          />
          <Select
            selectedOption={selectedOption.model}
            setSelectedOption={setSelectedOption}
            data={{ model: options?.model }}
            defaultValue={filterDefaultState.model}
          />
          <Select
            selectedOption={selectedOption.year}
            setSelectedOption={setSelectedOption}
            data={{ year: options?.year }}
            defaultValue={filterDefaultState.year}
          />
        </div>

        <CurrentQuery />
      </div>
    </>
  );
}

Filter.propTypes = {
  listings: PropTypes.array.isRequired,
  filteredListings: PropTypes.array.isRequired,
  setFilteredListings: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Filter;
