/* eslint-disable react/prop-types */
import api from "../../../utils/api";
import uploadPlaceHolder from "../../../assets/upload-image-placeholder.jpg";
import SelectMakeAndModel from "./SelectMakeAndModel";
import Features from "./Features";

const ListingForm = ({
  listing,
  handleFormSubmit,
  images,
  setImages,
  setListing,
  type = "new",
  message,
  features,
}) => {
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = { file, url: URL.createObjectURL(file) }; // Store the actual file object instead of the URL
      setImages(newImages);
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };
  console.log(listing);
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setListing((prevListing) => ({
      ...prevListing,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  return (
    <div className=" mx-auto mt-8 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-4">
        {type === "new" ? "Add new listing" : "Update listing"}
      </h2>
      <form
        className="flex gap-10 flex-wrap"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
        method="post"
      >
        <div className="flex flex-col gap-5 w-1/3 flex-wrap">
          <SelectMakeAndModel
            setListing={setListing}
            handleInputChange={handleInputChange}
            listing={listing}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Color:
            </label>
            <input
              type="text"
              name="color"
              value={listing.color}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Fuel type:
            </label>
            <input
              type="text"
              name="fuelType"
              value={listing.fuelType}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Year:
            </label>
            <input
              type="number"
              name="year"
              value={listing.year}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <Features features={listing.features} />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Description:
            </label>
            <input
              name="description"
              value={listing.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Price per day:
            </label>
            <input
              type="number"
              name="pricePerDay"
              value={listing.pricePerDay}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              City
            </label>
            <input
              type="text"
              name="location"
              value={listing.location?.name || listing.location}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
        </div>
        <div className="mx-auto my-8 p-4 bg-white shadow-lg rounded-md w-1/3">
          <div className="flex gap-5 flex-wrap items-center justify-center">
            {images?.map((image, index) => (
              <div key={index + image} className="flex-grow-0">
                <div className="relative">
                  {image?.file && (
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-0 right-0 px-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red z-10"
                    >
                      X
                    </button>
                  )}
                  <img
                    src={
                      image?.url ||
                      `${
                        listing?.images?.[index]
                          ? `${api.defaults.baseURL}/pimages/${listing.images[index]}`
                          : uploadPlaceHolder
                      }`
                    }
                    alt={`Image ${index + 1}`}
                    className={`w-[15vh] h-[15vh] rounded-md border border-gray-300`}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id={`image${index}`}
                  />
                </div>
                <label htmlFor={`image${index}`}>
                  {image ? "Change Image" : "Upload Image"}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            {type === "new" ? "Add new listing" : "Update listing"}
          </button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ListingForm;
