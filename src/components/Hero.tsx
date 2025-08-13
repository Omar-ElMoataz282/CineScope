import heroImage from "../assets/headers/hero-cinematic.jpg";
import { Button } from "./ui/Button";

const Hero = () => {
  return (
    <section aria-label="Hero" className="relative overflow-hidden">
      <div
        className="h-[48vh] md:h-[60vh] w-full bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div
        className="absolute inset-0 bg-gradient-primary opacity-60"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center">
        <div className="container p-[2rem]">
          <div className="max-w-2xl flex flex-col items-center sm:items-start animate-enter">
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              Discover Movies You'll Love
            </h1>

            <p className="mt-3 text-gray-300 text-base md:text-lg">
              Browse trending titles, filter by genre, and find your next watch
              on CineScope.
            </p>

            <div className="mt-6">
              <Button variant="hero" size="lg" asChild>
                <a href="#browse">Browse Collection</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
