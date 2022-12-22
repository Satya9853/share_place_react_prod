import { useRef, useEffect } from "react";

import Style from "./Map.module.css";

const Map = (props) => {
  const { center, zoom } = props;
  const mapRef = useRef();

  useEffect(() => {
    const mapConfig = {
      center: center,
      zoom: zoom,
    };
    const map = new window.google.maps.Map(mapRef.current, mapConfig);
    const markerConfig = {
      position: center,
      map: map,
    };
    new window.google.maps.Marker(markerConfig);
  }, [center, zoom]);

  return <div className={`${Style.map} ${props.className}`} style={props.style} ref={mapRef}></div>;
};

export default Map;
