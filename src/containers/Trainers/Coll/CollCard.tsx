import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { collGroups } from '../../../data/coll';
import CubeImage from '../../../components/CubeImage';
import { Alg, TestCase } from '../../../data/types';

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

interface Props extends WithStyles<typeof styles> {
  alg: Alg;
  currentCase: TestCase;
  currentGuess: string | null;
  checkIsCorrect(case_: TestCase, guess: string | null): boolean;
  onClick(): void;
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

function CollCard({
  classes,
  alg,
  currentCase,
  currentGuess,
  checkIsCorrect,
  onClick,
}: Props) {
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

export default withStyles(styles)(CollCard);
