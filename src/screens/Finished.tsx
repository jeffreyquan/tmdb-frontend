import { ListItemList } from "components/ListItemList";
import { Link } from "react-router-dom";
import { ListItem } from "types";

function FinishedScreen() {
  return (
    <div className="max-w-screen-lg mx-auto px-2 py-4">
      <ListItemList
        filter={(li: ListItem) => Boolean(li.hasWatched)}
        noListItems={
          <p>
            Hi there! This is where movies will go when you've finished watching
            them. Get started by heading over to{" "}
            <Link to="/">the search page</Link> to add movies to your list.
          </p>
        }
        noFilteredListItems={
          <p>
            Looks like you've got some watching to do! Check them out in your{" "}
            <Link to="/list">watch list</Link> or{" "}
            <Link to="/">discover more</Link>
          </p>
        }
      />
    </div>
  );
}

export { FinishedScreen };
