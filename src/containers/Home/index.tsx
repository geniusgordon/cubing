import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LinkItem from './LinkItem';
import AppBar from '../../components/AppBar';

const styles = createStyles({
  container: {
    padding: 30,
  },
});

interface Props extends WithStyles<typeof styles> {}

function Home({ classes }: Props) {
  return (
    <>
      <AppBar />
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={12} md={6}>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={6}>
              <LinkItem
                title="Pll Recognition Trainer"
                image="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=200&stage=ll"
                to="/trainers/recognition/pll"
              />
            </Grid>
            <Grid item xs={6}>
              <LinkItem
                title="Coll Recognition Trainer"
                image="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=200&stage=coll"
                to="/trainers/recognition/coll"
              />
            </Grid>
            <Grid item xs={6}>
              <LinkItem
                title="Cross Trainer"
                image="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=200&stage=cross-x2"
                to="/trainers/cross"
              />
            </Grid>
            <Grid item xs={6}>
              <LinkItem
                title="Zbll Trainer"
                image="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=200&stage=ll&case=(RUR'U')(RU'RU2R2)(U'RUR'U')(R2U'R2U')"
                to="/trainers/zbll"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(Home);
