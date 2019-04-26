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
    return /[1-6]/.test(key);
  }

  return (
    <RecognitionTrainer
      title="Coll Recognition Trainer"
      cases={coll}
      checkKeyInCases={checkKeyInCases}
      renderAnswerOptions={({ currentCase, currentGuess, takeGuess }) =>
        currentCase ? (
          <Grid container justify="center">
            {coll
              .filter(c => c.name[0] === currentCase.name[0])
              .map((c, i) => {
                const currentCaseName =
                  currentCase.name[currentCase.name.length - 1];
                const isCorrect =
                  currentGuess === (i + 1).toString() &&
                  currentGuess === currentCaseName;
                const isWrong =
                  currentGuess === (i + 1).toString() &&
                  currentGuess !== currentCaseName;
                const className = classNames({
                  [classes.correct]: isCorrect,
                  [classes.wrong]: isWrong,
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
