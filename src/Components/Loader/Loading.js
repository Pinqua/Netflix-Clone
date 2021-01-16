import React from "react";
import Loader from "react-loader-spinner";
import "./Loading.css";

function Loading({ LoaderStyle, bgColor }) {
  return (
    <div
      className="loading"
      style={bgColor ? { backgroundColor: bgColor } : {}}
    >
      <Loader
        type={!LoaderStyle ? "BallTriangle" : LoaderStyle}
        color="#e50914"
      />
    </div>
  );
}

export default Loading;
