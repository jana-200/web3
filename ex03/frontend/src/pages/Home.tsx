import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
