const DisplayBox = (props) => {
  return (
    <div
      style={
          { background: props.bgColor, 
            border: `3px solid ${props.borderColor}`,
            width: props.w,
            height: props.h,
            padding: "8px 4px 8px 4px",
            ...props.style
          }
        }
    >
      <p style={{margin: 0}}>{props.text}</p>
    </div>
  );
};

export default DisplayBox;
