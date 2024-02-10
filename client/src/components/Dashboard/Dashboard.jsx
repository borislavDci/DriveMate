import { useLoaderData, useRevalidator } from "react-router-dom";
import BookedListings from "./Customer/BookedListings";
import OwnerListings from "./Owner/OwnerListings";

const Dashboard = () => {
  const user = useLoaderData();
  const validator = useRevalidator();
  return (
    <>
      <OwnerListings listings={user.listings} validator={validator} />
      <BookedListings bookings={user.bookings} />
    </>
  );
};

export default Dashboard;
