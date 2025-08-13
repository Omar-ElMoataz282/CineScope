import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { Button } from "./ui/Button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <nav className="container flex h-16 items-center justify-between m-auto px-[2rem]">
        <Link
          to="/"
          className="flex items-center gap-2 hover-scale py-4"
          aria-label="CineScope Home"
        >
          <Film />
          <span className="font-display text-lg font-semibold">CineScope</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-sm font-bold text-gray-500 hover:text-black transition-colors px-3 py-4 rounded-md"
          >
            Home
          </Link>
          <Button asChild variant="hero" size="sm">
            <a href="#browse" aria-label="Browse movies">
              Explore
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
