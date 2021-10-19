import { Link } from "react-router-dom";
import { Movie } from "types";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const { id, overview, poster, releaseDate, title } = movie;

  return (
    <div className="shadow-sm rounded-md max-w-none prose">
      <Link className="flex  no-underline" to={`/movie/${id}`}>
        <div className="w-36 h-48 rounded-l-md overflow-hidden mr-4">
          <img
            className="h-full w-full object-cover my-0"
            src={poster}
            alt={`${title} poster`}
          />
        </div>
        <div className="flex flex-1 flex-col w-full p-4 justify-between">
          <div className="flex flex-col justify-start items-baseline">
            <h1 className="text-lg mb-0">{title}</h1>
            <span className="text-sm">{releaseDate}</span>
          </div>
          <p className="line-clamp-3 my-1">{overview}</p>
        </div>
      </Link>
    </div>
  );
}

export { MovieCard };
