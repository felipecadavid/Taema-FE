import React from "react";

import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="lds-heart">
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
