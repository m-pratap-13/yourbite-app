import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./componenets/Header/Navbar";
import Footer from "./componenets/Footer/Footer";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="mb-10">
          <Navbar />
         
        </header>

        {/* Main content area */}
        <main className="flex-grow mt-8">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;
