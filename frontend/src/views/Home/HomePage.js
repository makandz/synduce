import TopLeftBlob from "./svgs/topleftblob.svg";
import BottomRightBlob from "./svgs/bottomrightblob.svg";
import styles from './HomePage.module.css';
import baseStyles from '../../components/Styling.module.css';
import {Link} from "react-router-dom";

export default function HomePage() {
  return (
    <div className={styles.body}>
      {/* Blobs */}
      <div>
        <img src={TopLeftBlob} className={styles.leftBlob} alt="left blob" />
      </div>
      <div>
        <img src={BottomRightBlob} className={styles.rightBlob} alt="right blob" />
      </div>

      {/* Title */}
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Synduce</h1>
        <p className={styles.description}>
          An open source automatic recursive function transformer
        </p>
      </div>

      {/* Tryout */}
      <div className={styles.tryoutWrapper}>
        <Link to="/code">
          <button className={`${baseStyles.btn} ${styles.tryoutBtn}`}>
            Try it online!
          </button>
        </Link>
        <p>or view the source <a href="https://github.com/victornicolet/Synduce">on Github</a></p>
      </div>
    </div>
  );
};
