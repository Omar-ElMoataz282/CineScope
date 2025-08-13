import { useDataSWR } from "../lib/SWR";

function MovieTrailer({ movieId }: { movieId: number }) {
  const apiKEY = import.meta.env.VITE_API_KEY;
  //For Get Movie Trailer
  const { data } = useDataSWR({
    api: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKEY}&language=en-US`,
  });

  if (!data)
    return (
      <p className="w-full h-100 mt-5 bg-gray-300 text-2xl flex justify-center items-center rounded-md">
        Loading...
      </p>
    );

  const trailer = data.results?.find(
    (vid: { type: string; site: string }) =>
      vid.type === "Trailer" && vid.site === "YouTube"
  );

  if (!trailer)
    return (
      <p className="w-full h-75 mt-5 bg-gray-300 text-2xl flex justify-center items-center rounded-md">
        No Trailer Found!
      </p>
    );

  return (
    <div className="aspect-video w-full mt-5">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title={trailer.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default MovieTrailer;
