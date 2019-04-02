import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CubeImage from '../../components/CubeImage';
import { Alg, pll } from '../../data/algs';

const styles = createStyles({
  container: {
    paddingTop: 20,
  },
});

interface Props extends WithStyles<typeof styles> {}

interface State {
  currentCase: Alg | null;
}

class PllRecognitionTrainer extends React.Component<Props, State> {
  state: State = {
    currentCase: null,
  };

  componentDidMount() {
    this.generateCase();
  }

  generateAuf = () => {
    const n = Math.floor(Math.random() * 4);
    switch (n) {
      case 0:
        return '';
      case 1:
        return 'U';
      case 2:
        return 'U2';
      case 3:
        return "U'";
      default:
        return '';
    }
  };

  generateCase = () => {
    const n = 0;
    // const n = Math.floor(Math.random() * pll.length);
    const preAuf = this.generateAuf();
    const postAuf = this.generateAuf();
    const p = pll[n];
    this.setState({
      currentCase: {
        ...p,
        alg: preAuf + p.alg + postAuf,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const { currentCase } = this.state;

    return (
      <Grid container justify="center" className={classes.container}>
        {currentCase && <CubeImage alg={currentCase.alg} />}
      </Grid>
    );
  }
}

export default withStyles(styles)(PllRecognitionTrainer);
