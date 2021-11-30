import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactComponent as Logo } from "assets/tmdb_blue_short.svg";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-tmdb-light-blue"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
}

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button
      className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-tmdb-light-blue"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
}

// https://create-react-app.dev/docs/adding-images-fonts-and-files/
function Header() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <header className="px-4 py-6 bg-tmdb-dark-blue">
      <nav className="flex justify-between">
        <div className="w-32 sm:w-48">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className="flex space-x-4 items-center text-white">
          {user && isAuthenticated && (
            <>
              <Link to="/list">List</Link>
              <Link to="/finished">Finished</Link>
            </>
          )}
          {isAuthenticated && user ? <LogoutButton /> : <LoginButton />}
        </ul>
      </nav>
    </header>
  );
}

export { Header };
