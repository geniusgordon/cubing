import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { red, green } from '@material-ui/core/colors';
import { pll, pllGroups } from '../../data/algs';
import { TestCase } from '../../data/types';
import RecognitionTrainer from './RecognitionTrainer';

const styles = createStyles({
  buttonRow: {
    marginTop: 10,
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

function PllRecognitionTrainer({ classes }: Props) {
  function checkKeyInCases(key: string): boolean {
    if (/[a-zA-Z]/.test(key)) {
      return pllGroups.some(group => group.cases.includes(key));
    }
    return false;
  }

  function checkIsCorrect(
    case_: TestCase | null,
    guess: string | null,
  ): boolean {
    const caseName = case_ ? case_.alg.name[0] : '';
    return caseName === guess;
  }

  return (
    <RecognitionTrainer
      title="Pll Recognition Trainer"
      cases={pll}
      checkKeyInCases={checkKeyInCases}
      checkIsCorrect={checkIsCorrect}
      renderAnswerOptions={({ currentCase, currentGuess, takeGuess }) =>
        pllGroups.map(group => (
          <Grid
            key={group.name}
            container
            justify="center"
            className={classes.buttonRow}
          >
            {group.cases.map(c => {
              const isCurrent = currentGuess === c;
              const isCorrect = checkIsCorrect(currentCase, currentGuess);

              return (
                <Button
                  key={c}
                  variant="contained"
                  className={classNames({
                    [classes.correct]: isCurrent && isCorrect,
                    [classes.wrong]: isCurrent && !isCorrect,
                  })}
                  onClick={() => takeGuess(c)}
                >
                  {c}
                </Button>
              );
            })}
          </Grid>
        ))
      }
    />
  );
}

export default withStyles(styles)(PllRecognitionTrainer);
