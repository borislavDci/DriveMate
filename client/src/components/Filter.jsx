import React, { useEffect, useMemo, useState } from "react";
import Select from "./Select";
import api from "../utils/api";
import CurrentQuery from "./CurrentQuery";

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
  const [filterSpecsTrack, setFilterSpecsTrack] = useState({
    make: "All",
    model: "All",
  });

  const handleSelectChange = (selectedOption, initiator) => {
    const filterSpecs = { ...filterSpecsTrack, [initiator]: selectedOption };
    setFilterSpecsTrack({ ...filterSpecsTrack, [initiator]: selectedOption });

    const filtered = listings.filter((listing) => {
      for (let filterName in filterSpecs) {
        if (
          filterSpecs[filterName] !== "All" &&
          listing[filterName] !== filterSpecs[filterName]
        ) {
          return false;
        }
      }
      return true;
    });
    setFilteredListings(filtered);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const data = (await api.get("enums/make")).data;
      setOptions((prev) => ({ ...prev, make: data, model: [] }));
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (filterSpecsTrack.make == "All")
      return setOptions((prev) => ({ ...prev, model: [] }));
    const fetchModels = async () => {
      const data = (await api.get(`enums/model?make=${filterSpecsTrack.make}`))
        .data;
      const modelOptions = data.filter((option) => {
        return filteredListings.some(
          (listing) =>
            listing.model === option && listing.make === filterSpecsTrack.make
        );
      });
      setOptions((prev) => ({ ...prev, model: modelOptions }));
    };

    fetchModels();
  }, [filterSpecsTrack.make, filteredListings]);

  useEffect(() => {
    console.log(filteredListings, "filteredListings");
    const years = listings
      .filter(
        (listing) =>
          (listing.make === filterSpecsTrack.make ||
            filterSpecsTrack.make === "All") &&
          (listing.model === filterSpecsTrack.model ||
            filterSpecsTrack.model === "All")
      )
      .map((listing) => listing.year);

    setOptions((prev) => ({
      ...prev,
      year: Array.from(new Set(years)).sort(
        (a, b) => parseInt(a) - parseInt(b)
      ),
    }));
  }, [
    filteredListings,
    filterSpecsTrack.make,
    filterSpecsTrack.model,
    listings,
  ]);

  return (
    <>
      <div
        className={`${className} w-full flex flex-col-reverse 2xl:flex-row gap-10 bg-blue-50 rounded-xl  items-center justify-between px-6 py-6`}
      >
        <div className="flex flex-col md:flex-row gap-5">
          <Select
            onChange={handleSelectChange}
            defaultValue="All cars"
            data={{ make: options?.make }}
          />
          <Select
            onChange={handleSelectChange}
            defaultValue="All models"
            data={{ model: options.model }}
          />
          <Select
            onChange={handleSelectChange}
            defaultValue="All years"
            data={{ year: options.year }}
          />
        </div>

        <CurrentQuery />
      </div>
    </>
  );
}

export default Filter;
