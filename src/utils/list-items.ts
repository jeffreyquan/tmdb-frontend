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
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(
    ({ movieId }: { movieId: number }) =>
      client("/list-items", {
        data: { movieId },
      }),
    {
      onSettled: () => queryClient.invalidateQueries("list-items"),
      ...options,
    }
  );
}

// function useUpdateListItem(options?: any) {
//   const client = useClient();
//   const queryClient = useQueryClient();

//   return useMutation((updates) => client(`/list-items/${updates.id}`));
// }

function useRemoveListItem(options?: any) {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: string }) =>
      client(`/list-items/${id}`, { method: "DELETE" }),
    {
      onMutate: (removedItem) => {
        const previousItems = queryClient.getQueryData("list-item");

        queryClient.setQueryData("list-items", (oldItems: any) => {
          return oldItems.filter(
            (item: ListItem) => item.id !== removedItem.id
          );
        });

        // contains data to use when rolling back
        return () => queryClient.setQueryData("list-items", previousItems);
      },
      // will trigger refetch of query
      onSettled: () => queryClient.invalidateQueries("list-items"),
      ...options,
    }
  );
}

export { useCreateListItem, useListItem, useListItems, useRemoveListItem };
