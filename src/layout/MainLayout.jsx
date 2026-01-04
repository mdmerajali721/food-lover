import { Outlet } from "react-router";
import Navbar from "../components/Share/Navbar";
import Footer from "../components/Share/Footer";

const MainLayout = () => {
  return (
    <div className="bg-base-200">
      <Navbar />
      <main className="pt-16 content-center min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
