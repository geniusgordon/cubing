import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { green } from '@material-ui/core/colors';
import CubeImage from '../../../components/CubeImage';
import { History } from '../../../data/types';
import { inverseAlg, formatTime } from '../../../utils';

const styles = createStyles({
  container: {
    paddingBottom: 30,
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
}

function SessionHistory({
  classes,
  sessionHistory,
  setSessionHistory,
  onDelete,
}: Props) {
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [selectedIndex, setIndex] = React.useState<number>(0);
  const history = sessionHistory[selectedIndex];

  function handleHistorySelect(index: number) {
    setIndex(index);
  }

  function handleAlertOpen() {
    setAlertOpen(true);
  }

  function handleAlertClose() {
    setAlertOpen(false);
  }

  function handleDelete() {
    setAlertOpen(false);
    onDelete(selectedIndex);
  }

  React.useEffect(() => {
    setIndex(sessionHistory.length - 1);
  }, [sessionHistory.length]);

  return (
    <>
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={10} sm={4}>
          {history && (
            <Grid direction="column" container alignItems="center">
              <Typography gutterBottom variant="h5" component="p">
                {inverseAlg(history.alg.alg)}
              </Typography>
              <Typography gutterBottom variant="h6" component="p">
                {formatTime(history.time)}
              </Typography>
              <Button size="small" color="primary" onClick={handleAlertOpen}>
                Delete
              </Button>
              <CubeImage alg={history.alg.alg} />
            </Grid>
          )}
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
      <Dialog
        open={alertOpen}
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
          <Button onClick={handleDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(SessionHistory);
