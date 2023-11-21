import { Outlet, Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      {props.isLoggedIn && (
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
      )}

      <Outlet />
    </>
  );
};

export default Layout;
