import { AiOutlineArrowRight } from "react-icons/ai";
import { useAuth } from "../../libs/hooks/Auth";
import { useHistory } from "react-router";
import styles from "./Navbar.module.css";
import {Link} from "react-router-dom";
import baseStyles from '../Styling.module.css';

export default function Navbar() {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    auth.signout(() => history.push("/"));
  };

  return (
    <div className={styles.main}>
      <div>
        <div className={styles.branding}>
          <Link to="/">
            <h1 className={styles.brandingText}>Synduce</h1>
          </Link>
        </div>

        {!auth.user ? (
          <div className={styles.opts}>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              <button className={baseStyles.btn}>
                Register for free <AiOutlineArrowRight />
              </button>
            </Link>
          </div>
        ) : (
          <div className={styles.opts}>
            <Link to="/projects">
              {auth.user.email}
            </Link>

            <button className={baseStyles.btn} onClick={handleLogout}>
              Logout <AiOutlineArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};