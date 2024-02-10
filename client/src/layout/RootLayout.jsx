import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

export default function RootLayout() {
  const { state } = useNavigation();
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />

      <main className="flex-grow flex flex-col">
        {state === "loading" ? <Loading /> : <Outlet />}
      </main>

      <Footer />
    </div>
  );
}
