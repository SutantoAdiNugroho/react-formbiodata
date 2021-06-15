import React from "react";
import { useSelector } from "react-redux";
import LoaderGif from "../../assets/img/loading.gif";

function Loader() {
  const user = useSelector((state) => state);

  if (!user.data.loading) return null;

  return (
    <div class="loader-container">
      <div className="loader">
        <img src={LoaderGif} />
      </div>
    </div>
  );
}

export default Loader;
