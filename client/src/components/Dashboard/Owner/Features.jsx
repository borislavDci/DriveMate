import propTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

const Features = ({ features }) => {
  const [featuresEnum, setFeaturesEnum] = useState([]);

  useEffect(() => {
    const getFeatures = async () => {
      try {
        const data = (await api.get("/enums/features")).data;
        setFeaturesEnum(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFeatures();
  }, []);

  return (
    <>
      <p>Features</p>
      <ul className="flex flex-wrap gap-5">
        {featuresEnum.map((feature) => (
          <li key={feature} className="group">
            <input
              type="checkbox"
              name={feature}
              id={feature}
              className="hidden"
            />
            <label
              htmlFor={feature}
              className="bg-red-800 text-white px-4 py-2 rounded-lg group-has-[:checked]:bg-green-900 hover:bg-gray-800 transition-colors duration-300 ease-in-out cursor-pointer select-none"
            >
              {feature}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

Features.propTypes = {
  features: propTypes.array.isRequired,
};

export default Features;
