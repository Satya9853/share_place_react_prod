import Style from "./Card.module.css";

const Card = (props) => {
  const classes = props.className;
  return (
    <div className={`${Style["card"]} ${classes}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
