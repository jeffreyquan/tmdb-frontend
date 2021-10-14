import { BrowserRouter as Router } from "react-router-dom";
import { WithChildren } from "types";
import { QueryClientProvider } from "./query-client";
import { AuthProvider } from "./auth-context";

function AppProviders({ children }: WithChildren) {
  return (
    <QueryClientProvider>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export { AppProviders };
