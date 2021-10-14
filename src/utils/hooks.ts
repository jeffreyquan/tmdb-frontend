import * as React from "react";

type AsyncState<DataType> =
  | {
      status: "idle";
      data?: null;
      error?: null;
      promise?: null;
    }
  | {
      status: "pending";
      data?: null;
      error?: null;
      promise?: Promise<DataType>;
    }
  | {
      status: "resolved";
      data: DataType;
      error: null;
      promise: null;
    }
  | {
      status: "rejected";
      data: null;
      error: Error;
      promise: null;
    };

type AsyncAction<DataType> =
  | { type: "reset" }
  | { type: "pending"; promise: Promise<DataType> }
  | {
      type: "resolved";
      data: DataType;
      promise?: Promise<DataType>;
    }
  | {
      type: "rejected";
      error: Error;
      promise?: Promise<DataType>;
    };

function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>
): AsyncState<DataType> {
  switch (action.type) {
    case "pending": {
      return {
        status: "pending",
        data: null,
        error: null,
        promise: action.promise,
      };
    }
    case "resolved": {
      if (action.promise && action.promise !== state.promise) return state;
      return {
        status: "resolved",
        data: action.data,
        error: null,
        promise: null,
      };
    }
    case "rejected": {
      if (action.promise && action.promise !== state.promise) return state;
      return {
        status: "rejected",
        data: null,
        error: action.error,
        promise: null,
      };
    }
    case "reset":
    default: {
      return { status: "idle", data: null, error: null };
    }
  }
}

// https://github.com/kentcdodds/bookshelf/issues/127

function useSafeDispatch<DataType>(
  dispatch: React.Dispatch<AsyncAction<DataType>>
) {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (action) => (mounted.current ? dispatch(action) : void 0),
    [dispatch]
  );
}

const defaultInitialState = { status: "idle", data: null, error: null };

function useAsync<DataType>(initialState: AsyncState<DataType>) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });

  const [{ status, data, error }, setState] = React.useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, initialStateRef.current);

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data: DataType) => safeSetState({ type: "resolved", data }),
    [safeSetState]
  );

  const setError = React.useCallback(
    (error: Error) => safeSetState({ type: "rejected", error }),
    [safeSetState]
  );

  const reset = React.useCallback(
    () => safeSetState({ type: "reset" }),
    [safeSetState]
  );

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }

      safeSetState({ type: "pending", promise });

      return promise.then(
        (data: DataType) => {
          setData(data);
          return data;
        },
        (error: Error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
