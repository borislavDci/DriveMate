/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

function OwnerListings({ listings, validator }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  if (listings?.length === 0 || !listings) {
    return (
      <>
        <h2 className="text-2xl font-bold mb-4">
          You doesnt have any listings
        </h2>
      </>
    );
  }
  const handleUpdateListing = (listingId) => {
    navigate(`/dashboard/updatelisting/${listingId}`);
  };

  const handleDeleteListing = async (listingId) => {
    console.log(listingId);
    try {
      const res = await api.delete("/listing", { data: { listingId } });
      if (res.status === 200) {
        setMessage("Listing deleted successfully");
        validator.revalidate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
      {message && <h2>{message}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings?.map((listing) => (
          <div
            key={listing._id}
            className="bg-white p-4 shadow-md rounded-md w-full flex flex-col"
          >
            <img
              src={`${api.defaults.baseURL}/pimages/${listing.images[0]}`}
              alt={`Listing ${listing.id}`}
              className="w-full h-48 object-cover mb-2 rounded-md"
            />

            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">
                {`${listing.make} ${listing.model}`}
              </h3>
              <p className="text-gray-600">{listing.description}</p>
              <p className="text-gray-600">PPD: ${listing.pricePerDay}</p>
              <p className="text-gray-600">Location:</p>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleUpdateListing(listing._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteListing(listing._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OwnerListings;
