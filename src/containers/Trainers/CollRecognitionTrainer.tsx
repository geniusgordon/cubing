import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { red, green } from '@material-ui/core/colors';
import { coll } from '../../data/algs';
import RecognitionTrainer from './RecognitionTrainer';
import CubeImage from '../../components/CubeImage';

const styles = createStyles({
  buttonRow: {
    marginTop: 20,
  },
  correct: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[500],
    },
  },
  wrong: {
    color: 'white',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[500],
    },
  },
});

interface Props extends WithStyles<typeof styles> {}

function CollRecognitionTrainer({ classes }: Props) {
  function checkKeyInCases(key: string): boolean {
    return false;
  }

  return (
    <RecognitionTrainer
      cases={coll}
      checkKeyInCases={checkKeyInCases}
      renderAnswerOptions={({ currentCase, currentGuess, takeGuess }) => null}
    />
  );
}

export default withStyles(styles)(CollRecognitionTrainer);
