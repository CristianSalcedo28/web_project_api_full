import logo from "../images/Vector.svg";
import { Link, useMatch } from "react-router-dom";

const Header = ({ email, handleLogOut }) => {
  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo Around the U.S." className="header__logo" />
        {useMatch("/signin") && (
          <div className={`header__data`}>
            <Link
              to={"/signup"}
              className={`header__link`}
            >
              Sign Up!
            </Link>{" "}
          </div>
        )}
        {useMatch("/signup") && (
          <div className={`header__data`}>
            <Link to={"/signin"} className={`header__link`}>
              Sign In!
            </Link>
          </div>
        )}
        {useMatch("/") && (
          <div className={`header__data`}>
            <p className="header__user">{email}</p>
            <Link
              to={"/signin"}
              className={`header__link header__link__logout`}
              onClick={handleLogOut}
            >
              Log out
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
