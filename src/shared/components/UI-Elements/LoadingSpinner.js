import Style from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && Style["loading-spinner__overlay"]}`}>
      <div className={Style["lds-dual-ring"]}></div>
    </div>
  );
};

export default LoadingSpinner;
