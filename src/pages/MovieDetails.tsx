import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Star } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useDataSWR } from "../lib/SWR";
import type { Genre } from "../types/types";
import MovieTrailer from "../components/MovieTrailer";
import MovieCast from "../components/MovieCast";

const MovieDetails = () => {
  const apiKEY = import.meta.env.VITE_API_KEY;
  const id = useParams().id;

  //For Get Movie Details
  const movie = useDataSWR({
    api: `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKEY}&language=en-US`,
  }).data;

  //For Generate Movie Year
  const year = movie?.release_date?.split("-")[0];

  //For Generate Movie Genres
  const genres = movie?.genres;

  if (!movie) {
    return (
      <main className="min-h-148 px-[2rem] flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl">Loading...</h1>
      </main>
    );
  }

  if (movie?.success === false) {
    return (
      <main className="min-h-148 px-[2rem] flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl">Movie not found.</h1>
        <div className="mt-6 text-center">
          <Button variant="hero" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-[2rem]">
      <Helmet>
        <title>{`${movie.original_title} (${year}) — CineScope`}</title>
        <meta name="description" content={movie.overview} />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : ""}
        />
      </Helmet>

      <section className="pt-5 pb-3">
        <Button asChild variant="outline" size="sm">
          <Link to="/">
            <ArrowLeft className="mr-2" /> Back
          </Link>
        </Button>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-3 md:col-span-1">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={`${movie.original_title} poster`}
              className="w-100 aspect-[1/1] m-auto rounded-lg md:w-full md:aspect-[3/4]"
            />
          </div>

          <article className="col-span-3 md:col-span-2">
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              {movie.title}{" "}
              <span className="text-gray-500 font-normal">({year})</span>
              <span className="text-red-500 font-normal">
                {movie.adult && "+18"}
              </span>
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <Star className="text-rating" />
              <span className="font-medium">
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-muted-foreground">/ 10</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {genres?.map((genre: Genre) => (
                <span
                  key={genre.id}
                  className="text-xs text-gray-500 border border-gray-300 rounded px-2 py-0.5"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-6 text-lg text-gray-500 font-semibold">
              {movie.overview}
            </p>

            <p className="text-2xl font-bold mt-2">
              Language:{" "}
              <span className="font-normal">{movie.original_language}</span>
            </p>

            <MovieTrailer movieId={Number(id)} />
          </article>
          <MovieCast movieId={Number(id)} />
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;
