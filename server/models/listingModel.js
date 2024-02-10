import mongoose, { model } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const currentYear = new Date().getFullYear();

export const listingSchema = new mongoose.Schema({
  ownerId: { type: ObjectId, ref: "user" },
  make: {
    type: String,
    required: true,
    enum: [
      "Toyota",
      "Ford",
      "Honda",
      "Volkswagen",
      "BMW",
      "Mercedes",
      "Audi",
      "Hyundai",
      "Tesla",
      "Nissan",
      "Chevrolet",
      "Mazda",
    ],
  },
  model: {
    type: String,
    required: true,
    validate: {
      validator: function (value, make) {
        const allowedModels = {
          Toyota: ["Camry", "Corolla", "Rav4", "Highlander"],
          Ford: ["F-150", "Escape", "Focus", "Explorer"],
          Honda: ["Civic", "Accord", "CR-V", "Pilot"],
          Volkswagen: ["Golf", "Jetta", "Passat", "Tiguan"],
          BMW: ["3 Series", "5 Series", "X3", "X5"],
          Mercedes: ["C-Class", "E-Class", "GLC", "GLE"],
          Audi: ["A3", "A4", "Q5", "Q7"],
          Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe"],
          Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
          Nissan: ["Altima", "Maxima", "Rogue", "Pathfinder"],
          Chevrolet: ["Silverado", "Equinox", "Malibu", "Traverse"],
          Mazda: ["Mazda3", "Mazda6", "CX-5", "MX-5 Miata"],
        };
        if (make) {
          return allowedModels[make];
        }
        return allowedModels[make || this.make].includes(value);
      },
      message: (props) =>
        `${props.value} is not valid model for the selected make`,
    },
  },
  color: {
    type: String,
    required: true,
    enum: [
      "Black",
      "White",
      "Silver",
      "Red",
      "Blue",
      "Gray",
      "Green",
      "Yellow",
      "Orange",
      "Brown",
      "Purple",
      "Gold",
      "Beige",
      "Pink",
    ],
  },
  features: {
    type: [String],
    enum: [
      "Air Conditioning",
      "Bluetooth",
      "Cruise Control",
      "Backup Camera",
      "Parking Sensors",
      "Leather Seats",
      "Heated Seats",
      "Sunroof",
      "Convertible",
      "Navigation",
      "Keyless Entry",
      "Remote Start",
      "Traction Control",
      "Stability Control",
      "ABS",
      "Third Row Seats",
    ],
  },
  fuelType: {
    type: String,
    required: true,
    enum: ["Gasoline", "Diesel", "Electric", "Hybrid"],
  },
  productionYear: {
    type: Number,
    required: true,
    min: [1920, "Year must be greater than or equal to 1920"],
    max: [currentYear, `Year must be less than or equal to ${currentYear}`],
  },
  description: String,
  images: [String],
  pricePerDay: Number,
  currency: { type: String, enum: ["Euro", "US Dollar"], default: "Euro" },
  location: {
    name: String,
    cordinates: {
      lat: Number,
      lng: Number,
    },
  },
  reviews: { type: ObjectId, ref: "review" },
  dates: [
    {
      start: { type: Date },
      end: { type: Date },
    },
  ],
});

const Listing = mongoose.model("listing", listingSchema, "listings");

export default Listing;
