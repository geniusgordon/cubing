import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import CubeImage from '../../../components/CubeImage';
import { History } from '../../../data/types';
import { inverseAlg, formatTime } from '../../../utils';

const styles = createStyles({
  selected: {
    color: 'white',
    backgroundColor: green[300],
  },
});

interface Props extends WithStyles<typeof styles> {
  sessionHistory: Array<History>;
  setSessionHistory(v: React.SetStateAction<History[]>): void;
}

function SessionHistory({ classes, sessionHistory, setSessionHistory }: Props) {
  const [selectedIndex, setIndex] = React.useState<number>(0);

  const history = sessionHistory[selectedIndex];

  function handleHistorySelect(index: number) {
    setIndex(index);
  }

  React.useEffect(() => {
    setIndex(sessionHistory.length - 1);
  }, [sessionHistory.length]);

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={4}>
        <Grid direction="column" container alignItems="center">
          <Typography gutterBottom variant="h5" component="p">
            {inverseAlg(history.alg.alg)}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            {formatTime(history.time)}
          </Typography>
          <Button size="small" color="primary">
            Delete
          </Button>
          <CubeImage alg={history.alg.alg} />
        </Grid>
      </Grid>
      <Grid item xs={10} sm={4}>
        <Grid container spacing={8}>
          {sessionHistory.map((h, i) => (
            <Grid item key={`${h.alg.name}-${i}`}>
              <Button
                size="small"
                onClick={() => handleHistorySelect(i)}
                className={classNames({
                  [classes.selected]: i === selectedIndex,
                })}
              >
                {formatTime(h.time)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SessionHistory);
