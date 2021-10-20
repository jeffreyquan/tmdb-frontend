import { ReactComponent as Logo } from "assets/tmdb_blue_short.svg";
import { Link } from "react-router-dom";

// https://create-react-app.dev/docs/adding-images-fonts-and-files/
function Header() {
  return (
    <header className="px-4 py-6 bg-tmdb-dark-blue">
      <nav className="flex justify-between">
        <div className="w-32 sm:w-48">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div></div>
      </nav>
    </header>
  );
}

export { Header };
