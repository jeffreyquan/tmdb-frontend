import * as React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { client } from "utils/api-client";
import { WithChildren } from "types";

// https://auth0.com/docs/quickstart/spa/react/01-login
// https://auth0.com/blog/complete-guide-to-react-user-authentication/

function AuthProvider({ children }: WithChildren) {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    >
      {children}
    </Auth0Provider>
  );
}
function useClient() {
  const { getAccessTokenSilently } = useAuth0();

  return React.useCallback(
    (endpoint, config?) => {
      const clientWithAuth = async (endpoint: string, config?: any) => {
        const token = await getAccessTokenSilently();

        return client(endpoint, { ...config, token });
      };

      return clientWithAuth(endpoint, config);
    },
    [getAccessTokenSilently]
  );
}

export { AuthProvider, useClient };
