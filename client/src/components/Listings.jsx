import { Link } from "react-router-dom"; // Import Link from react-router-dom
import api from "../utils/api";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Listings = ({ className, listings }) => {
  // const [test, setTest] = useState([]);
  // const [page, setPage] = useState(3);

  // useEffect(() => {
  //   const arrayFilledWithOnlyOneListing = new Array(page).fill(listings[0]);
  //   setTest(arrayFilledWithOnlyOneListing);
  // }, [listings, page]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  //     console.log(scrollTop, clientHeight, scrollHeight);
  //     if (scrollTop + clientHeight >= scrollHeight) {
  //       scrollTop -= 0;
  //       setPage((prev) => prev + 1);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [page]);

  if (listings.length === 0) return <h1>No listings found</h1>;
  console.log(listings);
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {listings?.map((listing, index) => {
          if (listing === null) return;
          return (
            <div
              key={index}
              className="mb-6 rounded-md flex flex-col gap-3 w-full text-white"
            >
              <img
                src={`${api.defaults.baseURL}/pimages/${listing?.images[0]}`}
                alt={`Listing ${listing?._id}`}
                className="w-full aspect-video object-cover rounded-md"
              />
              <p className="self-end text-2xl py-1">
                price per day{" "}
                <span className="text-3xl font-bold text-[#1C110A]">
                  {listing.pricePerDay} €
                </span>
              </p>
              <hr className="border-t-2 border-[#1C110A]  " />
              <h3 className="text-3xl font-bold">
                {listing?.make} {listing?.model}
              </h3>
              <div className="flex justify-between">
                <div>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Voluptates reprehenderit consequatur voluptatibus alias quis
                    magni quisquam necessitatibus, natus facere? Magni!
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <Link
                  to={`/listing/${listing?._id}`}
                  className="text-white bg-[#1C110A] px-4 py-2 rounded-md hover:bg-[#1B9AAA] hover:text-black transition-all duration-300 ease-in-out
                "
                >
                  See Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
