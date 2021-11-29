import Tooltip from "@reach/tooltip";
import React from "react";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { Movie } from "types";
import { useAsync } from "utils/hooks";
import { useCreateListItem, useListItem } from "utils/list-items";
import { Spinner } from "./Spinner";

interface TooltipButtonProps {
  label: string;
  onClick: () => void;
  icon: any;
}

function TooltipButton({ label, onClick, icon }: TooltipButtonProps) {
  const { isLoading, isError, error, run, reset } = useAsync();

  function handleClick() {
    if (isError) {
      reset();
    } else {
      run(onClick());
    }
  }

  return (
    <Tooltip label={isError ? error?.message : label}>
      <button
        className="rounded-full h-24 w-24 flex items-center justify-center"
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

  return (
    <React.Fragment>
      {listItem ? (
        <div>Remove</div>
      ) : (
        <TooltipButton
          label="Add to list"
          onClick={() =>
            handleAddClick({
              movieId: movie.id,
            })
          }
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  );
}

export { StatusButtons, TooltipButton };
