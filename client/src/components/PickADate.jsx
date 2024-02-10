import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlagCheckered,
  faLocationCrosshairs,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

export const PickADate = ({
  defaultStartDate,
  defaultEndDate,
  defaultLocation,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputLocation, setInputLocation] = useState(defaultLocation || "");
  const [startDate, setStartDate] = useState(defaultStartDate || null);
  const [endDate, setEndDate] = useState(defaultEndDate || null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchParamsRedirect = new URLSearchParams();
    searchParamsRedirect.append("startDate", startDate.toJSON());
    searchParamsRedirect.append("endDate", endDate.toJSON());
    searchParamsRedirect.append("location", inputLocation);
    if (location.pathname === "/browse") {
      navigate(`?${searchParamsRedirect.toString()}`);
    }
    navigate(`/browse?${searchParamsRedirect.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col justify-center bg-blue-900 text-white p-5 items-center relative gap-10">
        <div className="flex flex-col gap-2 rounded-md bg-blue-600 bg-opacity-50 p-5 items-center lg:absolute lg:top-[0%] lg:left-[50%] lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-auto">
          <p className="self-start">make your dream trip</p>
          <form className="flex flex-col justify-around uppercase font-bold  lg:flex-row gap-5 lg:w-auto w-full items-center">
            <div className="flex flex-col bg-blue-950 gap-2 p-8 rounded-t-md border-b-[5px] border-b-gray-700 w-full md:w-auto">
              <label className="flex gap-2 items-center" htmlFor="location">
                <span>
                  <FontAwesomeIcon
                    className={`${inputLocation ? "text-blue-400" : ""}`}
                    icon={faLocationCrosshairs}
                  />
                </span>{" "}
                <span>Location</span>
              </label>
              <input
                className="bg-gray-700 focus:outline-none p-2 rounded-md"
                type="text"
                placeholder="Search your location"
                id="location"
                name="location"
                value={inputLocation}
                onChange={(e) => {
                  setInputLocation(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col bg-blue-950 p-8 rounded-t-md border-b-[5px] border-b-gray-700 w-full md:w-auto">
              <label className="flex gap-2 items-center" htmlFor="startDate">
                <FontAwesomeIcon
                  className={`${startDate ? "text-blue-800" : ""}`}
                  icon={faPlay}
                />
                <span>Pickup date</span>
              </label>
              <DatePicker
                className="bg-gray-700 focus:outline-none p-2 rounded-md mt-2"
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeSelect
                id="startDate"
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
              />
            </div>
            <div className="flex flex-col bg-blue-950 p-8 rounded-t-md border-b-[5px] border-b-gray-700 w-full md:w-auto">
              <label className="flex gap-2 items-center" htmlFor="endDate">
                {" "}
                <FontAwesomeIcon
                  className={`${endDate ? "text-blue-800" : ""}`}
                  icon={faFlagCheckered}
                />
                <span>Pickup date</span>
              </label>
              <DatePicker
                onChange={(date) => setEndDate(date)}
                className="bg-gray-700 focus:outline-none p-2 rounded-md mt-2"
                name="endDate"
                id="endDate"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeSelect
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ? startDate : new Date()}
              />
            </div>
            <button
              className="bg-blue-950 h-24 w-24 rounded-full self-center hover:bg-blue-100 hover:text-black transition-all duration-300 ease-in-out"
              type="submit"
              onClick={handleSubmit}
            >
              Search
            </button>
          </form>
          <p className="self-start">make your dream trip</p>
        </div>
        <div className="lg:mt-32">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            quisquam tempore inventore error earum eaque non, autem dicta
            accusamus incidunt quasi rerum soluta nam, reprehenderit voluptatem
            molestiae magni facilis enim quod ipsa maxime delectus! Officia odio
            sit pariatur ipsum expedita unde consequuntur facilis mollitia
            similique magnam, corporis aliquam, eligendi minus?
          </p>
        </div>
      </div>
    </>

    // <form onSubmit={handleSubmit} className="mb-4">
    //   <label className="block text-gray-300 text-sm font-bold mb-2">
    //     Select a Date:
    //   </label>
    //   <DatePicker
    //     onChange={onChange}
    //     minDate={new Date()}
    //     startDate={startDate}
    //     endDate={endDate}
    //     selectsRange
    //     inline
    //   />

    //   <button
    //     type="submit"
    //     className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    //   >
    //     Browse Our Fleet of Adventure-Ready Cars!
    //   </button>
    // </form>
  );
};
