import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { red, green } from '@material-ui/core/colors';
import useLocalStorage from '../../hooks/useLocalStorage';
import { pll, pllGroups } from '../../data/algs';
import { AlgWithAuf, FlashCard, TestCase } from '../../data/types';
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
  const [flashCards, setFlashCards] = useLocalStorage<FlashCard<AlgWithAuf>[]>(
    'pll-recognition',
    () =>
      pll
        .map(p =>
          [...new Array(4)].map((_, i) => ({
            data: { ...p, preAuf: 0 },
            deficiency: 1,
          })),
        )
        .flat(),
  );

  function checkKeyInCases(key: string): boolean {
    if (/[a-zA-Z]/.test(key)) {
      return pllGroups.some(group => group.cases.includes(key));
    }
    return false;
  }

  function checkIsCorrect(case_: TestCase, guess: string | null): boolean {
    const caseName = case_.alg.name[0];
    return caseName === guess;
  }

  return (
    <RecognitionTrainer
      title="Pll Recognition Trainer"
      flashCards={flashCards}
      setFlashCards={setFlashCards}
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
