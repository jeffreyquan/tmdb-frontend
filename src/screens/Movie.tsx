import { ActorCard } from "components/ActorCard";
import { Carousel } from "components/Carousel";
import { useParams } from "react-router-dom";
import { Actor } from "types";
import { useMovie } from "utils/movies";
import { StatusButtons, TooltipButton } from "components/StatusButtons";

function MovieScreen() {
  const { movieId } = useParams();
  const movie = useMovie(movieId);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { actors, overview, poster, releaseDate, title } = movie;

  return (
    <div className="max-w-screen-lg	mx-auto px-2 my-8 prose">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <img src={poster} alt={`${title} poster`} className="my-0" />
        </div>
        <div className="col-span-2">
          <h1>{title}</h1>
          <span>{releaseDate}</span>
          <p>{overview}</p>
          <div>
            <StatusButtons movie={movie} />
          </div>
        </div>
      </div>
      <Carousel>
        {actors.map((actor: Actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </Carousel>
    </div>
  );
}

export { MovieScreen };
