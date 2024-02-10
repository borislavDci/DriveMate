import {
  faFlagCheckered,
  faLocationCrosshairs,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import formatDate from "../helpers/formatDate";

function CurrentQuery() {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const location = searchParams.get("location");
  return (
    <>
      {location && startDate && endDate && (
        <div className="flex justify-center items-center">
          <div className="text-white bg-blue-900 flex flex-col sm:flex-row justify-between items-center py-4 px-8 gap-5 rounded-xl border-[3px] border-gray-700 w-full">
            <div className="flex gap-5 flex-col lg:flex-row text-sm sm:text-base">
              <span className="flex gap-1 items-center justify-start">
                <FontAwesomeIcon
                  icon={faLocationCrosshairs}
                  className="size-4"
                />
                {location}
              </span>
              <span className="flex gap-1 items-center justify-start">
                <FontAwesomeIcon icon={faPlay} className="size-4" />
                {formatDate(startDate, "long")}{" "}
              </span>
              <span className="flex gap-1 items-center justify-start">
                <FontAwesomeIcon icon={faFlagCheckered} className="size-4" />
                {formatDate(endDate, "long")}
              </span>
            </div>
            <div>
              <button
                onClick={() => {}}
                className="uppercase text-white font-bold px-6 py-3 bg-blue-950 rounded-xl hover:bg-blue-200 hover:text-black"
              >
                Change it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CurrentQuery;
