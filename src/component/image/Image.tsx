import React, { useState } from "react";

import "./Image.scss";

type PropsType = {
  src?: string;
};

const Image: React.FC<PropsType> = ({ src }) => {
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };

  return (
    <div>
      {!!src && !error ? (
        <div className="image-wrap">
          <img src={src} onError={onError} alt="" className="image" />
        </div>
      ) : (
        <div className="image-placeholder">
          <div /> <div />
        </div>
      )}
    </div>
  );
};

export default Image;
