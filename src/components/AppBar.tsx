import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = createStyles({
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
});

interface Props extends WithStyles<typeof styles> {
  title?: string;
  left?: React.ReactNode;
}

function Bar({ classes, title = 'Cubing Tools', left }: Props) {
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <AppBar position="static">
      <Toolbar>
        {left}
        <Typography variant="h6" color="inherit" className={classes.title}>
          <Link to="/" className={classes.link}>
            {title}
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Bar);
