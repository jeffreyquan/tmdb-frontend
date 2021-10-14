import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { HomeScreen } from "screens/Home";
import { Header } from "components/Header";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const callApi = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/movies`);

      const responseData = await response.json();

      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${serverUrl}/api/movies/4`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      console.log({
        responseData,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return isAuthenticated && user ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button type="button" className="btn btn-primary" onClick={callSecureApi}>
        Get Protected Message
      </button>
    </div>
  ) : null;
};

function App() {
  return (
    <div className="App">
      <Header />
      <HomeScreen />
    </div>
  );
}

export default App;
