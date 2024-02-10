/* eslint-disable react/no-children-prop */
// BrowseListings.js
import Listings from "./Listings";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { BrowseNoListings } from "./BrowseNoListings";
import CurrentQuery from "./CurrentQuery";
import Filter from "./Filter";

const BrowseListings = () => {
  const listingsRaw = useLoaderData();
  const listings = listingsRaw.map((listing) => {
    if (listing?.productionYear) listing.year = listing.productionYear;
    return listing;
  });

  const [filteredListings, setFilteredListings] = useState(listings);

  if (listings.length === 0 || !listings || listings[0] === null) {
    return <BrowseNoListings />;
  }

  return (
    <div className="w-full flex flex-col gap-10 bg-blue-700 p-5 flex-grow">
      <div className="grid grid-rows-[1fr_auto] grid-cols-3 gap-10">
        <Filter
          className="row-span-1 col-span-3"
          listings={listings}
          setFilteredListings={setFilteredListings}
          filteredListings={filteredListings}
        />

        <Listings className="col-span-3" listings={filteredListings} />
      </div>
    </div>
  );
};

export default BrowseListings;
