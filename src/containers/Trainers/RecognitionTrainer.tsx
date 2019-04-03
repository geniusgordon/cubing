import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CubeImage from '../../components/CubeImage';
import { generateCase } from '../../utils';
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
});

interface Props extends WithStyles<typeof styles> {
  cases: Alg[];
  checkKeyInCases(key: string): boolean;
  renderAnswerOptions(props: {
    currentCase: Alg | null;
    currentGuess: string | null;
    takeGuess(guess: string): void;
  }): React.ReactNode;
}

function RecognitionTrainer({
  classes,
  cases,
  checkKeyInCases,
  renderAnswerOptions,
}: Props) {
  const [currentCase, setCurrentCase] = React.useState<Alg | null>(null);
  const [currentGuess, setCurrentGuess] = React.useState<string | null>(null);
  const [colorNeutrality, setColorNeutrality] = React.useState<ColorNeutrality>(
    ColorNeutrality.NON_CN,
  );
  const [history, setHistory] = React.useState<TrainerHistory[]>([]);

  function nextCase() {
    const n = Math.floor(Math.random() * cases.length);
    const case_ = generateCase(cases[n], colorNeutrality);
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

    if (checkKeyInCases(e.key.toUpperCase())) {
      takeGuess(e.key.toUpperCase());
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
        <FormControl>
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
      {renderAnswerOptions({ currentCase, currentGuess, takeGuess })}
    </div>
  );
}

export default withStyles(styles)(RecognitionTrainer);
