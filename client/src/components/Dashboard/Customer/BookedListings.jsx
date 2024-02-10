import formatDate from "../../../helpers/formatDate";
import api from "../../../utils/api";
import PropTypes from "prop-types";

const BookedListings = ({ bookings }) => {
  if (bookings.length === 0 || !bookings) {
    return (
      <>
        <h2 className="text-2xl font-bold mb-4">
          You doesnt have any bookings
        </h2>
      </>
    );
  }
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>

      <div className="grid grid-cols-1 mbookings d:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings?.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-4 shadow-md rounded-md w-full flex flex-col"
          >
            <img
              src={`${api.defaults.baseURL}/pimages/${booking.carId.images[0]}`}
              alt={`Listing ${booking.carId.id}`}
              className="w-full h-48 object-cover mb-2 rounded-md"
            />

            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">
                {`${booking.carId.make} ${booking.carId.model}`}
              </h3>
              <p className="text-gray-600">{booking.carId.description}</p>
              <p className="text-gray-600">PPD: ${booking.carId.pricePerDay}</p>
              <p className="text-gray-600">Location:</p>
            </div>
            <div>
              <p>Day to pick up: {formatDate(booking.startDate)}</p>
              <p>Day to return: {formatDate(booking.endDate)}</p>
              <p>Total cost: {booking.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

BookedListings.propTypes = { bookings: PropTypes.array.isRequired };

export default BookedListings;
