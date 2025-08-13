import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/Index";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/movie/:title/:id" element={<MovieDetails />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
