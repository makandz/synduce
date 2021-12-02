import styles from "./DisplayBox.module.css";

export default function DisplayBox(props) {
  return (
    <div
      className={styles.displayBox}
      style={
          { background: props.bgColor, 
            color: props.color,
            border: `1px solid ${props.borderColor}`,
            width: props.w,
            height: props.h,
            ...props.style
          }
        }
    >
      <p style={{margin: 0}}>{props.text}</p>
    </div>
  );
};
