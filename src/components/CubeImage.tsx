import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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
}

function CubeImage({ size = 200, alg, classes }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    setLoading(true);
  }, [alg]);

  return (
    <div className={classes.container}>
      <img
        src={`
  http://cube.crider.co.uk/visualcube.php?fmt=svg&size=${size}&case=${alg}`}
        alt=""
        onLoad={() => {
          setLoading(false);
        }}
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
