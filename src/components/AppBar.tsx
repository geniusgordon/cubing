import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = createStyles({
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
});

interface Props extends WithStyles<typeof styles> {}

const PllRecognitionTrainerLink = (props: any) => (
  <Link to="/pll-recognition-trainer" {...props} />
);

function Bar({ classes }: Props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.title}>
          <Link to="/" className={classes.link}>
            Cubing
          </Link>
        </Typography>
        <Button color="inherit" component={PllRecognitionTrainerLink}>
          PllRecognitionTrainer
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Bar);
