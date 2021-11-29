import Tooltip from "@reach/tooltip";
import React from "react";
import { FaMinusCircle, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { Movie } from "types";
import { useAsync } from "utils/hooks";
import {
  useCreateListItem,
  useListItem,
  useRemoveListItem,
} from "utils/list-items";
import { Spinner } from "./Spinner";

interface TooltipButtonProps {
  label: string;
  onClick: () => void;
  icon: any;
  highlight: string;
}

function TooltipButton({
  label,
  onClick,
  icon,
  highlight,
}: TooltipButtonProps) {
  const { isLoading, isError, error, run, reset } = useAsync();

  function handleClick() {
    if (isError) {
      reset();
    } else {
      run(onClick());
    }
  }

  // change Tailwind styles based on React variables
  // https://github.com/tailwindlabs/tailwindcss/discussions/1507
  return (
    <Tooltip label={isError ? error?.message : label}>
      <button
        className={`rounded-full h-[48px] w-[48px] flex items-center justify-center border border-gray-900  ${
          isLoading ? "hover:bg-gray-100" : isError ? "bg-red-100" : highlight
        }`}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error?.message : label}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </button>
    </Tooltip>
  );
}

function StatusButtons({ movie }: { movie: Movie }) {
  const listItem = useListItem(movie.id);

  const { mutateAsync: handleAddClick } = useCreateListItem();
  const { mutateAsync: handleRemoveClick } = useRemoveListItem();

  return (
    <React.Fragment>
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          onClick={() =>
            handleRemoveClick({
              id: listItem.id,
            })
          }
          icon={<FaMinusCircle />}
          highlight="hover:bg-red-100"
        />
      ) : (
        <TooltipButton
          label="Add to list"
          onClick={() =>
            handleAddClick({
              movieId: movie.id,
            })
          }
          icon={<FaPlusCircle />}
          highlight="hover:bg-green-100"
        />
      )}
    </React.Fragment>
  );
}

export { StatusButtons, TooltipButton };
