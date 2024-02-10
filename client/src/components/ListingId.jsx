import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import api from "../utils/api";
import { useLoaderData } from "react-router-dom";
import RentCarForm from "./RentCarForm";

const ListingId = () => {
  const data = useLoaderData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    make,
    model,
    year,
    description,
    images,
    pricePerDay,
    currency,
    location,
    reviews,
    dates,
  } = data;
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <div className="border p-4 mb-4 rounded-lg shadow-md relative flex gap-5">
        <div className="w-1/2 aspect-video  bg-gray-200 rounded-md overflow-hidden relative">
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-[1]"
            >
              <FontAwesomeIcon className="text-5xl" icon={faChevronLeft} />
            </button>
          )}
          {images.map((image, index) => (
            <img
              key={index}
              src={`${api.defaults.baseURL}/pimages/${image}`}
              alt={`${make} ${model}`}
              className={`w-full h-full object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                index === currentImageIndex ? "opacity-100" : "-top-[51%]"
              } transition-all duration-1000 ease-in-out`}
            />
          ))}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon className="text-5xl" icon={faChevronRight} />
            </button>
          )}
        </div>
        <div className="w-1/2">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-semibold">
              {make} {model} - {year}
            </h2>
            <p className="text-gray-600">
              {currency} {pricePerDay}/day
            </p>
          </div>
          <p className="text-gray-700 mb-2">{description}</p>
          <p className="text-gray-600 mb-2">{location.name}</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Reviews</h3>
            {reviews?.length > 0 ? (
              <ul>
                {reviews.map((review) => (
                  <li key={review._id} className="mb-1">
                    <strong>{review.user}</strong>: {review.comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
      <RentCarForm pricePerDay={pricePerDay} dates={dates} />
    </>
  );
};

export default ListingId;
