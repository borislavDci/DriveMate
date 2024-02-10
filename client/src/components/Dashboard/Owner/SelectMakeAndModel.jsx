import propTypes from "prop-types";
import capitalizeFirstLetter from "../../../helpers/capitalizeFirstLetter";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

const selectData = [{ name: "make" }, { name: "model" }];

function SelectMakeAndModel({ listing, setListing, handleInputChange }) {
  const [enums, setEnums] = useState({ make: [], model: [] });

  useEffect(() => {
    const fetchMakeEnums = async () => {
      try {
        const res = await api.get("/enums/make");
        const data = await res.data;
        setEnums((prev) => {
          return { ...prev, make: data.sort((a, b) => a.localeCompare(b)) };
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMakeEnums();
  }, []);

  useEffect(() => {
    const fetchModelEnums = async () => {
      if (listing.make === "") return;
      try {
        const res = await api.get("/enums/model?make=" + listing.make);
        const data = await res.data;
        setEnums((prev) => {
          return { ...prev, model: data };
        });
        setListing((prevListing) => ({ ...prevListing, model: data[0] }));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (listing.make) fetchModelEnums();
  }, [listing.make, setListing]);

  // Set the value of the select element to initial value in order to get enums for make.
  useEffect(() => {
    setListing((prevListing) => ({ ...prevListing, make: enums.make[0] }));
  }, [enums.make, setListing]);

  return (
    <>
      {selectData.map((select) => (
        <div className="mb-4" key={select.name}>
          <label
            htmlFor={select.name}
            className="block text-sm font-medium text-gray-600"
          >
            {capitalizeFirstLetter(select.name)}
          </label>
          <select
            id={select.name}
            name={select.name}
            value={listing[select.name]}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            {enums[select.name].map((make, index) => {
              return (
                <option key={index} value={make}>
                  {make}
                </option>
              );
            })}
          </select>
        </div>
      ))}
    </>
  );
}

SelectMakeAndModel.propTypes = {
  listing: propTypes.object.isRequired,
  setListing: propTypes.func.isRequired,
  handleInputChange: propTypes.func.isRequired,
};

export default SelectMakeAndModel;
