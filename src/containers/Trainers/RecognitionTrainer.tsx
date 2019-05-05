import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import {
  createStyles,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AppBar from '../../components/AppBar';
import CubeImage from '../../components/CubeImage';
import { useSettings } from '../../hooks/useLocalStorage';
import { generateCase, caseToString, randomChoice } from '../../utils';
import { Alg, ColorNeutrality, TestCase } from '../../data/types';

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

interface Props
  extends WithStyles<typeof styles>,
    WithTheme,
    RouteComponentProps {
  title: string;
  cases: Alg[];
  checkKeyInCases(key: string): boolean;
  checkIsCorrect(case_: TestCase | null, guess: string | null): boolean;
  renderAnswerOptions(props: {
    currentCase: TestCase | null;
    currentGuess: string | null;
    takeGuess(guess: string): void;
  }): React.ReactNode;
}

function RecognitionTrainer({
  classes,
  theme,
  history,
  title,
  cases,
  checkKeyInCases,
  checkIsCorrect,
  renderAnswerOptions,
}: Props) {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const imageSize = matches ? 200 : 120;

  const [currentCase, setCurrentCase] = React.useState<TestCase | null>(null);
  const [currentGuess, setCurrentGuess] = React.useState<string | null>(null);
  const [settings, updateSettings] = useSettings();

  const nextCase = React.useCallback(() => {
    const c = randomChoice(cases, cases.map(() => 1));
    const case_ = generateCase(c, settings.colorNeutrality);
    setCurrentCase(case_);
    setCurrentGuess(null);
  }, [cases, settings]);

  function takeGuess(guess: string) {
    if (currentCase) {
      setCurrentGuess(guess);

      // const flashCardIndex = flashCards.findIndex(
      //   f => f.data === currentCase.alg,
      // );
      // if (flashCardIndex === -1) {
      //   return;
      // }
      // const flashCard = flashCards[flashCardIndex];
      // const isCorrect = checkIsCorrect(currentCase, guess);
      // if (isCorrect) {
      //   return;
      // }
      // setFlashCards([
      //   ...flashCards.slice(0, flashCardIndex),
      //   {
      //     ...flashCard,
      //     deficiency: flashCard.deficiency + 1,
      //   },
      //   ...flashCards.slice(flashCardIndex + 1),
      // ]);
    }
  }

  function handleKeyup(e: KeyboardEvent) {
    if (e.key === ' ') {
      nextCase();
      return true;
    }

    if (checkKeyInCases(e.key.toUpperCase())) {
      takeGuess(e.key.toUpperCase());
    }
  }

  function handleCnChange(e: any) {
    updateSettings({ colorNeutrality: e.target.value });
  }

  React.useEffect(() => {
    nextCase();
  }, [nextCase]);

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyup);
    return () => {
      document.removeEventListener('keyup', handleKeyup);
    };
  });

  function goBack() {
    history.goBack();
  }

  return (
    <>
      <AppBar
        title={title}
        left={
          <IconButton color="inherit" aria-label="Back" onClick={goBack}>
            <BackIcon />
          </IconButton>
        }
      />
      <div className={classes.container}>
        <Grid container justify="center">
          {currentCase && (
            <div className={classes.cubeImage} onClick={nextCase}>
              <CubeImage alg={caseToString(currentCase)} size={imageSize} />
            </div>
          )}
        </Grid>
        <Grid container justify="center">
          <FormControl>
            <FormLabel>Color Neutrality</FormLabel>
            <RadioGroup
              aria-label="Color Neutrality"
              name="cn"
              value={settings.colorNeutrality}
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
    </>
  );
}

export default withRouter(withTheme()(withStyles(styles)(RecognitionTrainer)));
