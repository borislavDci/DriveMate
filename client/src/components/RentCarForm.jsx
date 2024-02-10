import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../utils/api";
import { differenceInDays, parseISO, set } from "date-fns";
import { Link, useNavigate, useParams, useRevalidator } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RentCarForm = ({ pricePerDay, dates = [] }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(pricePerDay);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const carId = useParams().id;
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [excludeDateIntervals, setExcludeDateIntervals] = useState([]);

  useEffect(() => {
    const excludedDays = dates.map((date) => ({
      start: parseISO(date.start),
      end: parseISO(date.end),
    }));
    setExcludeDateIntervals(excludedDays);
  }, [dates]);

  const onChangeStartDate = (date) => {
    setStartDate(date);
    if (endDate) calculateDays(endDate, date);
  };

  const onChangeEndDate = (date) => {
    setEndDate(date);
    if (startDate) calculateDays(date, startDate);
  };

  const calculateDays = (end, start) => {
    const daysAsNumber = differenceInDays(end, start);
    console.log((daysAsNumber + 1) * pricePerDay);
    if (daysAsNumber > 0) {
      setTotalPrice((daysAsNumber + 1) * pricePerDay);
    } else {
      setTotalPrice(pricePerDay);
    }
  };
  const handleRentCar = async () => {
    try {
      setError(null);
      const res = await api.post("/booking", {
        startDateString: startDate.toJSON(),
        endDateString: endDate.toJSON(),
        carId,
        totalPrice,
      });
      if (res.status === 201) {
        setSuccessMsg("Booking created successfully!");
      }
    } catch (error) {
      console.error(error.response.status);
      if (error.response.status === 401) {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        return setError(
          "Redirecting to login page. You need to be logged in to rent a car."
        );
      }
      setError(error.response.data.message);
    } finally {
      setStartDate(null);
      setEndDate(null);
      revalidator.revalidate();
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Rent a Car</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMsg && (
        <>
          <p className="text-green-500">{successMsg}</p>{" "}
          <p>
            Check your booking <Link to="/dashboard">Here</Link>
          </p>
        </>
      )}
      <form>
        <div className="mb-4">
          <div>
            <h2>Select Start date</h2>
            <DatePicker
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeSelect
              selected={startDate}
              onChange={onChangeStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              withPortal
              excludeDateIntervals={excludeDateIntervals}
              portalId="start-date-portal"
            />
          </div>
          <div>
            <h2>Select end date</h2>
            <DatePicker
              excludeDateIntervals={excludeDateIntervals}
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeSelect
              selected={endDate}
              onChange={onChangeEndDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              withPortal
              portalId="end-date-portal"
            />
          </div>
          <h2>Select a start date</h2>
          Total price: {totalPrice}
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleRentCar}
        >
          Rent Now
        </button>
      </form>
    </div>
  );
};

export default RentCarForm;
