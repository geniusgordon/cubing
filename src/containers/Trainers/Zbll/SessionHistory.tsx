import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { green } from '@material-ui/core/colors';
import CubeImage from '../../../components/CubeImage';
import { History } from '../../../data/types';
import { inverseAlg, formatTime, averageOfN } from '../../../utils';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      padding: theme.spacing.unit,
    },
    statContainer: {
      paddingBottom: theme.spacing.unit,
    },
    selected: {
      color: 'white',
      backgroundColor: green[300],
    },
  });

interface Props extends WithStyles<typeof styles> {
  sessionHistory: Array<History>;
  setSessionHistory(v: React.SetStateAction<History[]>): void;
  onDelete(index: number): void;
  onClear(): void;
}

interface StatProps {
  title: string;
  time: number | null;
}

enum AlertType {
  Delete,
  Clear,
}

function StatItem({ title, time }: StatProps) {
  if (time === null) {
    return null;
  }
  return (
    <Grid item>
      <Typography>{title}</Typography>
      <Typography variant="h5">{formatTime(time)}</Typography>
    </Grid>
  );
}

function SessionHistory({
  classes,
  sessionHistory,
  setSessionHistory,
  onDelete,
  onClear,
}: Props) {
  const [alertType, setAlertType] = React.useState<AlertType | null>(null);
  const [selectedIndex, setIndex] = React.useState<number>(0);
  const history = sessionHistory[selectedIndex];

  const stats: { [name: string]: number | null } = React.useMemo(() => {
    const len = sessionHistory.length;
    const bestTime =
      len > 0
        ? sessionHistory.reduce((val, acc) => Math.min(val, acc.time), 1e9)
        : null;
    const worstTime =
      len > 0
        ? sessionHistory.reduce((val, acc) => Math.max(val, acc.time), 0)
        : null;
    const ao5 = averageOfN(sessionHistory.map(h => h.time), 5);
    const ao12 = averageOfN(sessionHistory.map(h => h.time), 12);

    return {
      bestTime,
      worstTime,
      ao5,
      ao12,
    };
  }, [sessionHistory]);

  function handleHistorySelect(index: number) {
    setIndex(index);
  }

  function showDeleteAlert() {
    setAlertType(AlertType.Delete);
  }

  function showClearAlert() {
    setAlertType(AlertType.Clear);
  }

  function handleAlertClose() {
    setAlertType(null);
  }

  function handleConfirm() {
    setAlertType(null);
    if (alertType === AlertType.Delete) {
      onDelete(selectedIndex);
    } else if (alertType === AlertType.Clear) {
      onClear();
    }
  }

  React.useEffect(() => {
    setIndex(sessionHistory.length - 1);
  }, [sessionHistory.length]);

  return (
    <>
      <div className={classes.container}>
        <Grid container justify="center" spacing={16}>
          {history && (
            <Grid item xs={10} sm={4}>
              <Grid direction="column" container>
                <Grid container spacing={16} alignItems="center">
                  <Grid item>
                    <Typography variant="h4">Solve #{selectedIndex}</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      color="primary"
                      onClick={showDeleteAlert}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
                <Typography>Scramble</Typography>
                <Typography variant="h5">
                  {inverseAlg(history.alg.alg)}
                </Typography>
                <Typography>Time</Typography>
                <Typography variant="h5">{formatTime(history.time)}</Typography>
                <CubeImage alg={history.alg.alg} />
              </Grid>
            </Grid>
          )}
          {sessionHistory.length > 0 && (
            <Grid item xs={10} sm={4}>
              <Grid container spacing={16} alignItems="center">
                <Grid item>
                  <Typography variant="h4">Times</Typography>
                </Grid>
                <Grid item>
                  <Button size="small" color="primary" onClick={showClearAlert}>
                    Clear
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={16} className={classes.statContainer}>
                <StatItem title="Best" time={stats.bestTime} />
                <StatItem title="Worst" time={stats.worstTime} />
                <StatItem title="Ao5" time={stats.ao5} />
                <StatItem title="Ao12" time={stats.ao12} />
              </Grid>
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
          )}
        </Grid>
      </div>
      <Dialog
        open={alertType !== null}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Are you sure</DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(SessionHistory);
