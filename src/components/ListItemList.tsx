import { ListItem } from "types";
import { useListItems } from "utils/list-items";
import { MovieCard } from "./MovieCard";

interface ListItemListProps {
  filter: (li: ListItem) => boolean;
  noListItems: React.ReactNode;
  noFilteredListItems: React.ReactNode;
}

function ListItemList({
  filter,
  noListItems,
  noFilteredListItems,
}: ListItemListProps) {
  const listItems = useListItems();

  const filteredListItems = listItems.filter(filter);

  if (!listItems.length) {
    return <div>{noListItems}</div>;
  }

  if (!filteredListItems.length) {
    return <div>{noFilteredListItems}</div>;
  }

  return (
    <ul className="grid gap-y-4">
      {filteredListItems.map((listItem: ListItem) => (
        <li key={listItem.id}>
          <MovieCard movie={listItem.movie} />
        </li>
      ))}
    </ul>
  );
}

export { ListItemList };
