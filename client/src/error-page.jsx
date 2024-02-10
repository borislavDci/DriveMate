import { Navigate, useRouteError } from "react-router-dom";
import BackButton from "./components/BackButton";
import useAuth from "./hooks/useAuth";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function ErrorPage() {
  const error = useRouteError();
  const { logout } = useAuth();
  if (error.response?.status === 401) {
    logout();
    return <Navigate to="/login" />;
  } else
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-100">
          <h1 className="text-3xl font-bold mb-4 text-red-500">Oops!</h1>
          <p className="text-lg mb-2">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="italic text-gray-700">
            {error.statusText || error.message}
          </p>
          <BackButton />
        </div>
        <Footer />
      </>
    );
}
