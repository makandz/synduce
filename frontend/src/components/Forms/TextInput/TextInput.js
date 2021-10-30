import styles from "./TextInput.module.css";

export default function TextInput(props) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>
        <label htmlFor={props.id}>{props.label} {props.required ? "*" : ""}</label>
      </div>
      <input
        id={props.id}
        className={styles.input}
        placeholder={props.label}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        type={props.type}
      />
    </div>
  );
};
