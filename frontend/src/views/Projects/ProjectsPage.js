import baseStyles from '../../components/Styling.module.css';
import styles from "./ProjectsPage.module.css";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../libs/hooks/Auth";

export default function ProjectsPage() {
  const auth = useAuth();
  
  const history = useHistory();
  const [projects, setProjects] = useState([
    // { id: "239x8n23189x", date: "September 2, 2021 [10:32 AM UTC]"}
  ]);

  useEffect(() => {
    axios({
      method : "POST",
      url: "https://rhnq76qo4e.execute-api.us-east-1.amazonaws.com/active/queryuserpastjobs",
      data: {
        userID: auth?.user?.uid
      },
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }, []);

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