const LoginField = (props) => {
  return (
    <div className="login-field-container">
      <div className="login-label">
        <label htmlFor={props.id}>{props.label} {props.required ? "(required)" : ""}</label>
      </div>
      <input
        id={props.id}
        className="login-form-field"
        placeholder={props.label}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      ></input>
    </div>
  );
};

export default LoginField;
