import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { generateCrossScramble } from '../../utils';
import { Scramble } from '../../data/types';

const styles = createStyles({
  container: {
    marginTop: 30,
  },
  paper: {
    padding: 30,
    margin: 30,
  },
});

interface Props extends WithStyles<typeof styles> {}

function CrossTrainer({ classes }: Props) {
  const [currentLevel, setLevel] = React.useState<number>(1);
  const [currentScramble, setScramble] = React.useState<Scramble | null>(null);

  function nextScramble() {
    const scramble = generateCrossScramble(currentLevel);
    setScramble(scramble);
  }

  function handleLevelChange(e: any) {
    setLevel(e.target.value);
  }

  React.useEffect(() => {
    nextScramble();
  }, []);

  return (
    <div className={classes.container}>
      <Grid container justify="center" spacing={16}>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="level">Level</InputLabel>
            <Select
              value={currentLevel}
              onChange={handleLevelChange}
              inputProps={{
                name: 'level',
                id: 'level',
              }}
            >
              {[...Array(8)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={nextScramble}>
            Next Scramble
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Paper className={classes.paper}>
          <Typography variant="h5" component="p">
            {currentScramble ? currentScramble.join(' ') : ''}
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(CrossTrainer);
