import { WithChildren } from "types";

function Carousel({ children }: WithChildren) {
  return (
    <div className="flex overflow-x-scroll overflow-y-hidden whitespace-nowrap space-x-4 my-4 py-4">
      {children}
    </div>
  );
}

export { Carousel };
