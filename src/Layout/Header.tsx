import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <Link to="/posts">
          <div className="site-logos">
            <img
              src={"public/logo192.png"}
              alt="react-icon"
              className="site-logo"
            />
            <span>React RoutingApp</span>
          </div>
        </Link>
        <nav>
          <Link to="/posts">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/todos">Todos</Link>
        </nav>
      </header>
    </>
  );
}
