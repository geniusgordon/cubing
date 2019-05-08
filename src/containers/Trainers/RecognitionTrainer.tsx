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
import useEventListener from '../../hooks/useEventListener';
import useLocalStorage, { useSettings } from '../../hooks/useLocalStorage';
import { generateCase, caseToString, randomChoice } from '../../utils';
import {
  AlgWithAuf,
  ColorNeutrality,
  FlashCard,
  TestCase,
} from '../../data/types';

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
  gamma?: number;
  flashCardName: string;
  defaultFlashCards: FlashCard<AlgWithAuf>[];
  checkKeyInCases(key: string): boolean;
  checkIsCorrect(case_: TestCase, guess: string | null): boolean;
  renderAnswerOptions(props: {
    currentCase: TestCase;
    currentGuess: string | null;
    takeGuess(guess: string): void;
  }): React.ReactNode;
}

function generateNextCase(cards: FlashCard<AlgWithAuf>[], cn: ColorNeutrality) {
  const c = randomChoice(cards, cards.map(f => f.deficiency));
  return generateCase(c.data, { cn, preAuf: c.data.preAuf });
}

function RecognitionTrainer({
  classes,
  theme,
  history,
  title,
  gamma = 0.5,
  flashCardName,
  defaultFlashCards,
  checkKeyInCases,
  checkIsCorrect,
  renderAnswerOptions,
}: Props) {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const imageSize = matches ? 200 : 120;

  const [settings, updateSettings] = useSettings();

  const [flashCards, setFlashCards] = useLocalStorage<FlashCard<AlgWithAuf>[]>(
    flashCardName,
    defaultFlashCards,
  );
  const [currentCase, setCurrentCase] = React.useState<TestCase>(() =>
    generateNextCase(flashCards, settings.colorNeutrality),
  );
  const [currentGuess, setCurrentGuess] = React.useState<string | null>(null);

  const nextCase = React.useCallback(
    (cn: ColorNeutrality) => {
      const case_ = generateNextCase(flashCards, cn);
      setCurrentCase(case_);
      setCurrentGuess(null);
    },
    [flashCards],
  );

  const takeGuess = React.useCallback(
    (guess: string) => {
      if (currentCase) {
        setCurrentGuess(guess);

        const flashCardIndex = flashCards.findIndex(
          f => f.data === currentCase.alg,
        );
        if (flashCardIndex === -1) {
          return;
        }
        const flashCard = flashCards[flashCardIndex];
        const isCorrect = checkIsCorrect(currentCase, guess);

        const newDeficiency = isCorrect
          ? flashCard.deficiency * (1 - gamma)
          : flashCard.deficiency * (1 + gamma);

        setFlashCards([
          ...flashCards.slice(0, flashCardIndex),
          {
            ...flashCard,
            deficiency: newDeficiency,
          },
          ...flashCards.slice(flashCardIndex + 1),
        ]);
      }
    },
    [currentCase, flashCards, gamma, checkIsCorrect, setFlashCards],
  );

  const handleKeyup = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === ' ') {
        nextCase(settings.colorNeutrality);
        return true;
      }

      if (checkKeyInCases(e.key.toUpperCase())) {
        takeGuess(e.key.toUpperCase());
      }
    },
    [settings.colorNeutrality, nextCase, takeGuess, checkKeyInCases],
  );

  const handleCnChange = React.useCallback(
    (e: any) => {
      updateSettings({ colorNeutrality: e.target.value });
      nextCase(settings.colorNeutrality);
    },
    [settings.colorNeutrality, updateSettings, nextCase],
  );

  const handleImageClick = React.useCallback(() => {
    nextCase(settings.colorNeutrality);
  }, [settings.colorNeutrality, nextCase]);

  useEventListener('keyup', handleKeyup);

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
            <div className={classes.cubeImage} onClick={handleImageClick}>
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
