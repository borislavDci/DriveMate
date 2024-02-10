import { PickADate } from "./PickADate";
import { useNavigate, useSearchParams } from "react-router-dom";

export const BrowseNoListings = ({}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const location = searchParams.get("location");
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-10">
      <h2 className="text-center">
        There is not avaiable listings for this dates please go back and pick a
        new dates or browse all the cars
      </h2>
      <div className="flex gap-5">
        <button
          onClick={() => navigate("/browse")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Browse
        </button>
      </div>
      <div className="relative mt-28">
        <PickADate
          defaultStartDate={new Date(startDate)}
          defaultEndDate={new Date(endDate)}
          defaultLocation={location}
        />
      </div>
    </div>
  );
};
