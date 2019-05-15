import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '../../../components/AppBar';
import { useLocalStorage } from '../../../hooks';
import { randomChoice, inverseAlg } from '../../../utils';
import { ollGroups, collGroups } from '../../../data/coll';
import zbllMap from '../../../data/zbll';
import { Alg, FlashCard, History } from '../../../data/types';
import CaseSelector from './CaseSelector';
import Timer from './Timer';
import SessionHistory from './SessionHistory';

const styles = createStyles({
  container: {
    marginTop: 30,
  },
  selectedCount: {
    marginTop: 10,
  },
  scramble: {
    marginTop: 30,
  },
  time: {
    marginTop: 100,
    marginBottom: 100,
  },
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps {}

const defaultFlashCardMap: {
  [name: string]: FlashCard<{ alg: Alg; count: number }>;
} = {};
ollGroups.forEach(oll => {
  collGroups[oll].forEach(coll => {
    Object.keys(zbllMap[oll][coll]).forEach(zbll => {
      const name = `${oll}/${coll}/${zbll}`;
      defaultFlashCardMap[name] = {
        data: {
          alg: { name, alg: '' },
          count: 0,
        },
        deficiency: 0,
      };
    });
  });
});

function ZbllTrainer({ classes, history }: Props) {
  const [caseSelectorOpen, setCaseSelectorOpen] = React.useState<boolean>(
    false,
  );

  const [selectedCases, setCases] = useLocalStorage<{
    [name: string]: boolean;
  }>('zbll-trainer/selected-cases', {});

  const [flashCardMap, setFlashCardMap] = useLocalStorage<{
    [name: string]: FlashCard<{ alg: Alg; count: number }>;
  }>('zbll-trainer/flashcard-map', defaultFlashCardMap);

  const [sessionHistory, setSessionHistory] = useLocalStorage<History[]>(
    'zbll-trainer/session-history',
    [],
  );

  const [currentCase, setCurrentCase] = React.useState<Alg | null>(null);

  const cases = React.useMemo(() => {
    return Object.keys(selectedCases).filter(name => selectedCases[name]);
  }, [selectedCases]);

  function goBack() {
    history.goBack();
  }

  const pickCaseFromFlashCards = React.useCallback(() => {
    const probs = cases.map(c =>
      flashCardMap[c].data.count === 0 ? 1000 : flashCardMap[c].deficiency,
    );
    const c = randomChoice(cases, probs);
    const flashCard = flashCardMap[c];
    if (!flashCard) {
      return null;
    }
    const zbllCase = flashCard.data.alg;
    const [oll, coll, zbll] = zbllCase.name.split('/');
    const algs = zbllMap[oll][coll][zbll];
    const alg = randomChoice(algs, algs.map(() => 1));
    return {
      name: zbllCase.name,
      alg,
    };
  }, [cases, flashCardMap]);

  const generateNextCase = React.useCallback(() => {
    const case_ = pickCaseFromFlashCards();
    setCurrentCase(case_);
  }, [pickCaseFromFlashCards]);

  function openCaseSelector() {
    setCaseSelectorOpen(true);
  }

  function handleCaseSelectorClose() {
    setCaseSelectorOpen(false);
  }

  function handleCaseSubmit(cases: { [name: string]: boolean }) {
    setCases(cases);
    setCaseSelectorOpen(false);
  }

  function handleHistoryDelete(index: number) {
    if (index < 0 || index >= sessionHistory.length) {
      return;
    }

    setSessionHistory([
      ...sessionHistory.slice(0, index),
      ...sessionHistory.slice(index + 1),
    ]);
  }

  const handleTimerEnd = React.useCallback(
    (time: number) => {
      if (!currentCase) {
        return;
      }

      const flashCard = flashCardMap[currentCase.name];
      if (!flashCard) {
        return null;
      }

      setSessionHistory([
        ...sessionHistory,
        {
          alg: currentCase,
          time,
        },
      ]);

      const newDeficiency =
        (flashCard.deficiency * flashCard.data.count + time) /
        (flashCard.data.count + 1);

      setFlashCardMap({
        ...flashCardMap,
        [currentCase.name]: {
          data: {
            alg: flashCard.data.alg,
            count: flashCard.data.count + 1,
          },
          deficiency: newDeficiency,
        },
      });
    },
    [
      currentCase,
      sessionHistory,
      setSessionHistory,
      flashCardMap,
      setFlashCardMap,
    ],
  );

  React.useEffect(() => {
    generateNextCase();
  }, [generateNextCase]);

  return (
    <>
      <AppBar
        title="ZBLL Trainer"
        left={
          <IconButton color="inherit" aria-label="Back" onClick={goBack}>
            <BackIcon />
          </IconButton>
        }
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.container}
      >
        <Button variant="outlined" color="primary" onClick={openCaseSelector}>
          Select Cases
        </Button>
        <Typography className={classes.selectedCount}>
          {cases.length} selected
        </Typography>
        <Typography component="div" variant="h4" className={classes.scramble}>
          {currentCase ? inverseAlg(currentCase.alg) : ''}
        </Typography>
        <Grid item className={classes.time} style={{ flex: 1 }}>
          <Timer onEnd={handleTimerEnd} />
        </Grid>
        <SessionHistory
          sessionHistory={sessionHistory}
          setSessionHistory={setSessionHistory}
          onDelete={handleHistoryDelete}
        />
      </Grid>
      <CaseSelector
        open={caseSelectorOpen}
        selectedCases={selectedCases}
        onClose={handleCaseSelectorClose}
        onSubmit={handleCaseSubmit}
      />
    </>
  );
}

export default withRouter(withStyles(styles)(ZbllTrainer));
