import { Actor } from "types";
import dummyPhoto from "assets/dummy_user_photo.svg";

interface ActorCardProps {
  actor: Actor;
}

function ActorCard({ actor }: ActorCardProps) {
  const { name, photo } = actor;

  const image = photo ? photo : dummyPhoto;

  return (
    <div className="inline-block rounded-2xl shadow-sm">
      <div className="flex flex-col w-32 h-full">
        <div className="flex rounded-t-2xl h-[192px] items-center bg-gray-200">
          <img
            src={image}
            alt={`${name}`}
            className="m-0 overflow-hidden rounded-t-2xl h-full"
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <p className="break-word whitespace-normal text-sm text-center my-2 px-2">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}

export { ActorCard };
