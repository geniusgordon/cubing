import React from 'react';

interface Props {
  size?: number;
  alg: string;
}

function CubeImage({ size = 200, alg }: Props) {
  return (
    <img
      src={`
  http://cube.crider.co.uk/visualcube.php?fmt=svg&size=${size}&case=${alg}`}
      alt=""
    />
  );
}

export default CubeImage;
