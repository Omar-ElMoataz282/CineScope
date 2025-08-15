import { useDataSWR } from "../lib/SWR";
import type { Actors } from "../types/types";

function MovieCast({ movieId }: { movieId: number }) {
  const apiKEY = import.meta.env.VITE_API_KEY;
  //For Get Movie Cast
  const { data } = useDataSWR({
    api: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKEY}&language=en-US`,
  });

  if (!data) return <p>Loading...</p>;

  return (
    <div className="col-span-3 overflow-x-auto scrollbar-special">
      <div className="flex gap-4 pt-2 pb-4">
        {data.cast?.slice(0, 10).map((actor: Actors) => (
          <div
            key={actor.cast_id}
            className="flex-shrink-0 w-40 text-center hover:scale-105 transition-transform"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "/poster-page.png"
              }
              alt={actor.name}
              className="w-full rounded-lg"
              loading="lazy"
            />
            <p className="mt-2 font-bold">{actor.name || "Unknown"}</p>
            <p className="text-sm text-gray-500">
              as {actor.character || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieCast;
