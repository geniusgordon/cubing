import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toQueryString } from '../utils';

const styles = createStyles({
  container: {
    position: 'relative',
  },
  imageLoading: {
    opacity: 0,
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

interface Props extends WithStyles<typeof styles> {
  size?: number;
  alg: string;
  view?: 'plan' | 'trans';
  stage?: string;
}

function CubeImage({ size = 200, alg, view, stage, classes }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    setLoading(true);
  }, [alg]);

  const queryString = toQueryString({
    fmt: 'svg',
    case: alg,
    view,
    stage,
    size,
  });

  return (
    <div className={classes.container}>
      <img
        src={`http://cube.crider.co.uk/visualcube.php?${queryString}`}
        alt=""
        onLoad={() => {
          setLoading(false);
        }}
        style={{ height: size, width: size }}
        className={classNames({ [classes.imageLoading]: loading })}
      />
      {loading && (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default withStyles(styles)(CubeImage);
