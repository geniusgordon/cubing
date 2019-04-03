import React from 'react';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { red, green } from '@material-ui/core/colors';
import CubeImage from '../../components/CubeImage';
import { generateCase } from '../../utils';
import { pll, pllGroups } from '../../data/algs';
import { Alg, ColorNeutrality, TrainerHistory } from '../../data/types';

const styles = createStyles({
  container: {
    marginTop: 30,
  },
  cubeImage: {
    cursor: 'pointer',
  },
  radioGroup: {
    flexDirection: 'row',
  },
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

function PllRecognitionTrainer({ classes }: Props) {
  const [currentCase, setCurrentCase] = React.useState<Alg | null>(null);
  const [currentGuess, setCurrentGuess] = React.useState<string | null>(null);
  const [colorNeutrality, setColorNeutrality] = React.useState<ColorNeutrality>(
    ColorNeutrality.NON_CN,
  );
  const [history, setHistory] = React.useState<TrainerHistory[]>([]);

  function nextCase() {
    const n = Math.floor(Math.random() * pll.length);
    const case_ = generateCase(pll[n], colorNeutrality);
    setCurrentCase(case_);
    setCurrentGuess(null);
  }

  function takeGuess(guess: string) {
    if (currentCase) {
      setCurrentGuess(guess);
      setHistory([
        {
          case_: currentCase,
          guess,
        },
        ...history,
      ]);
    }
  }

  function handleKeyup(e: KeyboardEvent) {
    if (e.key === ' ') {
      nextCase();
    }

    if (e.key.match(/[a-zA-Z]/)) {
      const guess = e.key.toUpperCase();
      if (pllGroups.some(group => group.cases.includes(guess))) {
        takeGuess(guess);
      }
    }
  }

  function handleCnChange(e: any) {
    setColorNeutrality(e.target.value);
  }

  React.useEffect(() => {
    nextCase();
  }, []);

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyup);
    return () => {
      document.removeEventListener('keyup', handleKeyup);
    };
  });

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        {currentCase && (
          <div className={classes.cubeImage} onClick={nextCase}>
            <CubeImage alg={currentCase.alg} />
          </div>
        )}
      </Grid>
      <Grid container justify="center">
        <FormControl className={''}>
          <FormLabel>Color Neutrality</FormLabel>
          <RadioGroup
            aria-label="Color Neutrality"
            name="cn"
            value={colorNeutrality}
            className={classes.radioGroup}
            onChange={handleCnChange}
          >
            <FormControlLabel
              value={ColorNeutrality.NON_CN}
              control={<Radio />}
              label="Non CN"
            />
            <FormControlLabel
              value={ColorNeutrality.D_CN}
              control={<Radio />}
              label="Dual CN"
            />
            <FormControlLabel
              value={ColorNeutrality.CN}
              control={<Radio />}
              label="CN"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      {pllGroups.map(group => (
        <Grid
          key={group.name}
          container
          justify="center"
          className={classes.buttonRow}
        >
          {group.cases.map(c => {
            const currentCaseName = currentCase ? currentCase.name[0] : '';
            const isCorrect =
              currentGuess === c && currentCaseName === currentGuess;
            const isWrong =
              currentGuess === c && currentCaseName !== currentGuess;

            return (
              <Button
                key={c}
                variant="contained"
                className={classNames({
                  [classes.correct]: isCorrect,
                  [classes.wrong]: isWrong,
                })}
                onClick={() => takeGuess(c)}
              >
                {c}
              </Button>
            );
          })}
        </Grid>
      ))}
    </div>
  );
}

export default withStyles(styles)(PllRecognitionTrainer);
