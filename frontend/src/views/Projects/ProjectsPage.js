import baseStyles from '../../components/Styling.module.css';
import styles from "./ProjectsPage.module.css";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import {useState} from "react";

export default function ProjectsPage() {
  const history = useHistory();
  const [projects, setProjects] = useState([
    // { id: "239x8n23189x", date: "September 2, 2021 [10:32 AM UTC]"}
  ]);

  const loadProjects = () => {
    // @todo
  }

  return (
    <>
      <h1 className={baseStyles.header}>
        Your dashboard
      </h1>

      <div className={styles.container}>
        <div className={styles.miniTitle}>History</div>
        <ul className={styles.projectList}>
          {(projects !== null && projects.length !== 0) ? (
            projects.map((e, i) => (
              <li><Link to={`code/${e.id}`}>Run on {e.date}</Link></li>
            ))
          ) : (
            <li>You have no projects, run one via the code editor!</li>
          )}
        </ul>
        <div className={styles.miniTitle}>Your Account</div>
        <button
          className={`${baseStyles.btn} ${styles.editProfileBtn}`}
          onClick={() => history.push("profile")}
        >
          Edit your profile
        </button>
      </div>
    </>
  )
}