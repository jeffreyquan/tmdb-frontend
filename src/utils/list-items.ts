import { useMutation, useQuery, useQueryClient } from "react-query";
import { useClient } from "context/auth-context";
import { ListItem } from "types";

function useListItem(movieId: number, options?: any) {
  const listItems = useListItems(options);

  return (
    listItems?.find((listItem: ListItem) => listItem.movie.id === movieId) ??
    null
  );
}

function useListItems(options = {}) {
  const client = useClient();

  const { data: listItems } = useQuery({
    queryKey: "list-items",
    queryFn: () => client("/list-items").then((data) => data),
    ...options,
  });

  return listItems ?? [];
}

function useCreateListItem(options?: any) {
  const queryClient = useQueryClient();
  const client = useClient();

  return useMutation(
    ({ movieId }: any) =>
      client("/list-items", {
        data: { movieId },
      }),
    {
      onSettled: () => queryClient.invalidateQueries("list-items"),
      ...options,
    }
  );
}

export { useCreateListItem, useListItem };
