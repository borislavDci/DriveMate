import { useState } from "react";
import api from "../../../utils/api";
import ListingForm from "./ListingForm";

const listingDefault = {
  make: "",
  model: "",
  proudctionYear: "",
  description: "",
  pricePerDay: "",
  location: "",
  features: [],
};

const AddListing = () => {
  const [images, setImages] = useState(new Array(6).fill(null));
  const [message, setMessage] = useState("");
  const [newListing, setNewListing] = useState(listingDefault);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    images.forEach((image, index) => {
      if (image && image.file) {
        formData.set(`image${index}`, image.file);
      }
    });

    try {
      const res = await api.post("/listing", formData);
      if (res.status === 201) {
        setImages(new Array(6).fill(null));
        setNewListing(listingDefault);
        setMessage("Listing added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListingForm
      handleFormSubmit={handleFormSubmit}
      images={images}
      listing={newListing}
      setImages={setImages}
      setListing={setNewListing}
      message={message}
    />
  );
};

export default AddListing;
