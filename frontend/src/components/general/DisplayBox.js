const DisplayBox = (props) => {
  return (
    <div
      style={
          { background: props.bgColor, 
            color: props.color,
            border: `1px solid ${props.borderColor}`,
            borderRadius: "3px",
            width: props.w,
            height: props.h,
            padding: "16px 8px",
            ...props.style
          }
        }
    >
      <p style={{margin: 0}}>{props.text}</p>
    </div>
  );
};

export default DisplayBox;
