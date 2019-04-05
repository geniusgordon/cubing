import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LinkItem from './LinkItem';

const styles = createStyles({
  container: {
    padding: 30,
    width: '100%',
  },
});

interface Props extends WithStyles<typeof styles> {}

function Home({ classes }: Props) {
  return (
    <Grid container justify="center" spacing={16} className={classes.container}>
      <Grid item xs={6} sm={3}>
        <LinkItem
          title="Pll Recognition Trainer"
          image="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=200&stage=ll"
          to="/trainers/recognition/pll"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <LinkItem
          title="Coll Recognition Trainer"
          image="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=200&stage=coll"
          to="/trainers/recognition/coll"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <LinkItem
          title="Cross Trainer"
          image="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=200&stage=cross-x2"
          to="/trainers/cross"
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Home);
