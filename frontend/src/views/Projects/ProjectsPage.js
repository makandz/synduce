import baseStyles from '../../components/Styling.module.css';
import styles from "./ProjectsPage.module.css";
import {useHistory} from "react-router";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../libs/hooks/Auth";
import {Link} from "react-router-dom";
import DataContext from "../../libs/contexts/dataContext";

export default function ProjectsPage() {
  const auth = useAuth();
  const history = useHistory();
  const [projects, setProjects] = useState(null);
  const [data, setData] = useContext(DataContext);

  const loadCode = (code) => {
    setData({ ...data, pastJobCode: code })
    history.push("code/pastjob");
  }
  
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
      setProjects(response.data);
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
        <div className={styles.miniTitle}>Code History</div>
        <ul className={styles.projectList}>
          {(projects !== null && projects.length !== 0) ? (
            projects.map(e => (
              <li><a onClick={() => loadCode(e.code)}>Run on {e.timeSent}</a></li>
            ))
          ) : (
            <li>You have no projects, run one via the code editor!</li>
          )}
        </ul>
        <p className={styles.startNewProject}>
          or <Link to="code">start a new project instead</Link>
        </p>
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