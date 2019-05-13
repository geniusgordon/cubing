import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import { useTimer, TimerStatus } from '../../../hooks';

const styles = createStyles({
  ready: {
    color: green[500],
  },
});

interface Props extends WithStyles<typeof styles> {
  onEnd(time: number): void;
}

function padZero(n: number): string {
  if (n < 10) {
    return `0${n}`;
  }
  return n.toString();
}

function Timer({ classes, onEnd }: Props) {
  const { time, status: timerStatus } = useTimer({ onEnd });

  return (
    <Typography
      component="div"
      variant="h1"
      className={classNames({
        [classes.ready]: timerStatus === TimerStatus.READY,
      })}
    >
      {Math.floor(time / 100)}.{padZero(time % 100)}
    </Typography>
  );
}

export default withStyles(styles)(Timer);
