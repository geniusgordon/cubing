import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import {
  createStyles,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  Theme,
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
import { useEventListener, useLocalStorage, useSettings } from '../../hooks';
import { generateCase, caseToString, randomChoice } from '../../utils';
import {
  AlgWithAuf,
  ColorNeutrality,
  FlashCard,
  TestCase,
} from '../../data/types';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing.unit * 5,
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
  defaultFlashCardMap: { [name: string]: FlashCard<AlgWithAuf> };
  checkKeyInCases(case_: TestCase, key: string): boolean;
  checkIsCorrect(case_: TestCase, guess: string | null): boolean;
  renderAnswerOptions(props: {
    currentCase: TestCase;
    currentGuess: string | null;
    takeGuess(guess: string): void;
  }): React.ReactNode;
}

function RecognitionTrainer({
  classes,
  theme,
  history,
  title,
  gamma = 0.5,
  flashCardName,
  defaultFlashCardMap,
  checkKeyInCases,
  checkIsCorrect,
  renderAnswerOptions,
}: Props) {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const imageSize = matches ? 200 : 120;

  const [settings, updateSettings] = useSettings();

  const [flashCardMap, setFlashCardMap] = useLocalStorage<{
    [name: string]: FlashCard<AlgWithAuf>;
  }>(flashCardName, defaultFlashCardMap);

  const cases = React.useMemo(() => {
    return Object.keys(defaultFlashCardMap);
  }, [defaultFlashCardMap]);

  const pickCaseFromFlashCards = React.useCallback(
    (cn: ColorNeutrality) => {
      const c = randomChoice(cases, cases.map(c => flashCardMap[c].deficiency));
      const { data } = flashCardMap[c];
      return generateCase(data, {
        cn,
        preAuf: data.preAuf,
      });
    },
    [cases, flashCardMap],
  );

  const [currentCase, setCurrentCase] = React.useState<TestCase>(() =>
    pickCaseFromFlashCards(settings.colorNeutrality),
  );
  const [currentGuess, setCurrentGuess] = React.useState<string | null>(null);

  const generateNextCase = React.useCallback(
    (cn: ColorNeutrality) => {
      const case_ = pickCaseFromFlashCards(cn);
      setCurrentCase(case_);
      setCurrentGuess(null);
    },
    [pickCaseFromFlashCards],
  );

  const takeGuess = React.useCallback(
    (guess: string) => {
      if (!currentCase) {
      }
      const flashCard = flashCardMap[currentCase.alg.name];
      if (!flashCard) {
        return;
      }
      setCurrentGuess(guess);
      const isCorrect = checkIsCorrect(currentCase, guess);

      const newDeficiency = isCorrect
        ? flashCard.deficiency * (1 - gamma)
        : flashCard.deficiency * (1 + gamma);

      setFlashCardMap({
        ...flashCardMap,
        [currentCase.alg.name]: {
          ...flashCard,
          deficiency: newDeficiency,
        },
      });
    },
    [currentCase, flashCardMap, gamma, checkIsCorrect, setFlashCardMap],
  );

  const handleKeyup = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === ' ') {
        generateNextCase(settings.colorNeutrality);
        return true;
      }

      if (checkKeyInCases(currentCase, e.key.toUpperCase())) {
        takeGuess(e.key.toUpperCase());
      }
    },
    [
      settings.colorNeutrality,
      currentCase,
      generateNextCase,
      takeGuess,
      checkKeyInCases,
    ],
  );

  function handleCnChange(e: any) {
    updateSettings({ colorNeutrality: e.target.value });
    generateNextCase(settings.colorNeutrality);
  }

  function handleImageClick() {
    generateNextCase(settings.colorNeutrality);
  }

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
