import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import { coll } from '../../data/algs';
import { AlgWithAuf, FlashCard, TestCase } from '../../data/types';
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

const defaultFlashCards: FlashCard<AlgWithAuf>[] = coll
  .map(c =>
    [...new Array(4)].map((_, i) => ({
      data: { ...c, preAuf: 0 },
      deficiency: 1,
    })),
  )
  .flat();

function checkKeyInCases(key: string): boolean {
  return /[1-6]/.test(key);
}

function checkIsCorrect(case_: TestCase, guess: string | null): boolean {
  const caseName = case_.alg.name[case_.alg.name.length - 1];
  return guess === caseName;
}

function CollRecognitionTrainer({ classes }: Props) {
  return (
    <RecognitionTrainer
      title="Coll Recognition Trainer"
      flashCardName="coll-recognition"
      defaultFlashCards={defaultFlashCards}
      checkKeyInCases={checkKeyInCases}
      checkIsCorrect={checkIsCorrect}
      renderAnswerOptions={({ currentCase, currentGuess, takeGuess }) =>
        currentCase ? (
          <Grid container justify="center">
            {coll
              .filter(c => c.name[0] === currentCase.alg.name[0])
              .map((c, i) => {
                const isCurrent = currentGuess === (i + 1).toString();
                const isCorrect = checkIsCorrect(currentCase, currentGuess);

                const className = classNames({
                  [classes.correct]: isCurrent && isCorrect,
                  [classes.wrong]: isCurrent && !isCorrect,
                });

                return (
                  <Card
                    key={c.name}
                    onClick={() => takeGuess(c.name[c.name.length - 1])}
                  >
                    <CardActionArea>
                      <CubeImage alg={c.alg} size={100} view="plan" />
                      <CardContent className={className}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={className}
                        >
                          {c.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
          </Grid>
        ) : null
      }
    />
  );
}

export default withStyles(styles)(CollRecognitionTrainer);
