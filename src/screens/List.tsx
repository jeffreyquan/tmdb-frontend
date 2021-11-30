import { ListItemList } from "components/ListItemList";
import { Link } from "react-router-dom";

function ListScreen() {
  return (
    <div className="max-w-screen-lg mx-auto px-2 py-4">
      <ListItemList
        filter={(li) => !li.hasWatched}
        noListItems={
          <p>
            Hi there! Welcome to your movie list. Get started by heading over to{" "}
            <Link to="/">the search page</Link>
          </p>
        }
        noFilteredListItems={
          <p>
            Looks like you've finished all your movies! Check them out in your{" "}
            <Link to="/finished">finished movies</Link> or{" "}
            <Link to="/">discover more</Link>
          </p>
        }
      />
    </div>
  );
}

export { ListScreen };
