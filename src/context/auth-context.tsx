import { WithChildren } from "types";
import { Auth0Provider } from "@auth0/auth0-react";

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

export { AuthProvider };
