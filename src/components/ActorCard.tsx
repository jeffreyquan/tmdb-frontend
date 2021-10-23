import { Actor } from "types";

interface ActorCardProps {
  actor: Actor;
}

function ActorCard({ actor }: ActorCardProps) {
  const { name, photo } = actor;
  return (
    <div className="inline-block rounded-2xl shadow-sm">
      <div className="flex flex-col  w-32">
        <div className="rounded-t-2xl">
          {photo ? (
            <img
              src={photo}
              alt={`${name}`}
              className="m-0 overflow-hidden rounded-t-2xl"
            />
          ) : null}
        </div>
        <p className="text-center my-2">{name}</p>
      </div>
    </div>
  );
}

export { ActorCard };
