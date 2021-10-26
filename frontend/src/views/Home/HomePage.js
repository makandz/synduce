import TopLeftBlob from "./svgs/topleftblob.svg";
import BottomRightBlob from "./svgs/bottomrightblob.svg";
import styles from './HomePage.module.css';
import baseStyles from '../Styling.module.css';

export default function HomePage() {
  return (
    <div className={styles.body}>
      {/* Blobs */}
      <div>
        <img src={TopLeftBlob} alt="left blob" className={styles.leftBlob} />
      </div>
      <div>
        <img src={BottomRightBlob} alt="right blob" className={styles.rightBlob} />
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
        <button className={`${baseStyles.btn} ${styles.tryoutBtn}`}>
          <p>Try it Online</p>
        </button>
        <p>or view the source <a href="https://github.com/victornicolet/Synduce">on Github</a></p>
      </div>
    </div>
  );
};
