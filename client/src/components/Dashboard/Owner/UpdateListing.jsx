import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import api from "../../../utils/api";
import ListingForm from "./ListingForm";

const UpdateListing = () => {
  const data = useLoaderData();
  const { id } = useParams();

  const [listing, setListing] = useState(data);
  const [images, setImages] = useState(new Array(6).fill(null));
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const formData = new FormData(e.target);
    if (images !== listing.images) {
      const imagesToChange = images
        .map((image, index) => {
          if (image && image.file) {
            formData.set(`image${index}`, image.file);
            return index;
          }
        })
        .filter((value) => value >= 0);
      formData.set("imagesToChange", imagesToChange);
    }
    formData.set("listingId", id);

    try {
      const res = await api.patch("/listing", formData);
      const data = await res.data;

      if (res.status === 200) {
        setListing(data);
        setImages(new Array(6).fill(null));
        setMessage("Listing updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListingForm
      listing={listing}
      handleFormSubmit={handleFormSubmit}
      images={images}
      setImages={setImages}
      setListing={setListing}
      type="update"
      message={message}
    />
  );
};

export default UpdateListing;
