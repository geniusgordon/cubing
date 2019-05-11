import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import collMap, { collGroups, collAlgs } from '../../data/coll';
import { Alg, AlgWithAuf, FlashCard, TestCase } from '../../data/types';
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

interface CardProps extends WithStyles<typeof styles> {
  alg: Alg;
  currentCase: TestCase;
  currentGuess: string | null;
  onClick(): void;
}

interface OptionsProps extends WithStyles<typeof styles> {
  currentCase: TestCase;
  currentGuess: string | null;
  takeGuess(guess: string): void;
}

const defaultFlashCards: FlashCard<AlgWithAuf>[] = collAlgs
  .map(alg =>
    [...new Array(4)].map((_, i) => ({
      data: { ...alg, preAuf: 0 },
      deficiency: 1,
    })),
  )
  .flat();

function checkKeyInCases(case_: TestCase, key: string): boolean {
  const group = case_.alg.name.split('/')[0];
  if (collGroups[group].length === 4) {
    return /[1-4]/.test(key);
  }
  return /[1-6]/.test(key);
}

function checkIsCurrent(
  case_: TestCase,
  guess: string | null,
  alg: Alg,
): boolean {
  if (!guess) {
    return false;
  }
  const group = case_.alg.name.split('/')[0];
  const options = collGroups[group].map(name => `${group}/${name}`);
  const c = options[parseInt(guess) - 1];
  return c === alg.name;
}

function checkIsCorrect(case_: TestCase, guess: string | null): boolean {
  if (!guess) {
    return false;
  }
  const group = case_.alg.name.split('/')[0];
  const options = collGroups[group].map(name => `${group}/${name}`);
  const c = options[parseInt(guess) - 1];
  return c === case_.alg.name;
}

function CollCard({
  classes,
  alg,
  currentCase,
  currentGuess,
  onClick,
}: CardProps) {
  const isCurrent = checkIsCurrent(currentCase, currentGuess, alg);
  const isCorrect = checkIsCorrect(currentCase, currentGuess);

  const className = classNames({
    [classes.correct]: isCurrent && isCorrect,
    [classes.wrong]: isCurrent && !isCorrect,
  });

  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CubeImage alg={alg.alg} size={100} view="plan" stage="coll" />
        <CardContent className={className}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={className}
          >
            {alg.name.split('/')[1]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function CollAnswerOptions({
  classes,
  currentCase,
  currentGuess,
  takeGuess,
}: OptionsProps) {
  const group = currentCase.alg.name.split('/')[0];
  const options = collGroups[group].map(name => ({
    name: `${group}/${name}`,
    alg: collMap[group][name],
  }));

  return (
    <Grid container justify="center">
      {options.map((alg, i) => (
        <CollCard
          classes={classes}
          key={alg.name}
          alg={alg}
          currentCase={currentCase}
          currentGuess={currentGuess}
          onClick={() => takeGuess((i + 1).toString())}
        />
      ))}
    </Grid>
  );
}

function CollRecognitionTrainer({ classes }: Props) {
  return (
    <RecognitionTrainer
      title="Coll Recognition Trainer"
      flashCardName="coll-recognition"
      defaultFlashCards={defaultFlashCards}
      checkKeyInCases={checkKeyInCases}
      checkIsCorrect={checkIsCorrect}
      renderAnswerOptions={({ currentCase, currentGuess, takeGuess }) => (
        <CollAnswerOptions
          classes={classes}
          currentCase={currentCase}
          currentGuess={currentGuess}
          takeGuess={takeGuess}
        />
      )}
    />
  );
}

export default withStyles(styles)(CollRecognitionTrainer);
