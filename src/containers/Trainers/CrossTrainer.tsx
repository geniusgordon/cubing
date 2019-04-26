import React from 'react';
import { RouteComponentProps } from 'react-router';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import AppBar from '../../components/AppBar';
import { SettingContext } from '../../components/Settings';
import { generateCrossScramble } from '../../utils';
import { Scramble } from '../../data/types';

const styles = createStyles({
  container: {
    marginTop: 30,
  },
  button: {
    marginTop: 30,
  },
  paper: {
    padding: 30,
    margin: 30,
  },
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps {}

function CrossTrainer({ classes, history }: Props) {
  const [currentScramble, setScramble] = React.useState<Scramble | null>(null);
  const { settings, updateSettings } = React.useContext(SettingContext);

  const nextScramble = React.useCallback(() => {
    const scramble = generateCrossScramble(settings.crossLevel);
    setScramble(scramble);
  }, [settings]);

  function handleLevelChange(e: any) {
    updateSettings({ crossLevel: e.target.value });
  }

  function handleKeyup(e: KeyboardEvent) {
    if (e.key === ' ') {
      nextScramble();
      return true;
    }
  }

  function goBack() {
    history.goBack();
  }

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyup);
    return () => {
      document.removeEventListener('keyup', handleKeyup);
    };
  });

  React.useEffect(() => {
    nextScramble();
  }, [nextScramble]);

  return (
    <>
      <AppBar
        title="Cross Trainer"
        left={
          <IconButton color="inherit" aria-label="Back" onClick={goBack}>
            <BackIcon />
          </IconButton>
        }
      />
      <div className={classes.container}>
        <Grid container justify="center">
          <FormControl>
            <InputLabel htmlFor="level">Level</InputLabel>
            <Select
              value={settings.crossLevel}
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
        <Grid container justify="center">
          <Button
            variant="contained"
            className={classes.button}
            onClick={nextScramble}
          >
            Next Scramble
          </Button>
        </Grid>
        <Grid container justify="center">
          <Paper className={classes.paper}>
            <Typography variant="h5" component="p">
              {currentScramble ? currentScramble.join(' ') : ''}
            </Typography>
          </Paper>
        </Grid>
      </div>
    </>
  );
}

export default withStyles(styles)(CrossTrainer);
