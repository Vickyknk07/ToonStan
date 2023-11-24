import React from "react";
import { GooeyCircleLoader } from "react-loaders-kit";

function Loader() {

  const loaderProps = {
    loading: true,
    size: 150,
    duration: 2,
    colors: ["#EF4444", "#F59E0B", "#6366F1"],
    
  };

  return (
    <div className="loader">
        <GooeyCircleLoader {...loaderProps} />
    </div>
  );
}

export default Loader;