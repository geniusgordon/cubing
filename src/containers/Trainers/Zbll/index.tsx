import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import classNames from 'classnames';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import { green } from '@material-ui/core/colors';
import AppBar from '../../../components/AppBar';
import { useLocalStorage, useTimer, TimerStatus } from '../../../hooks';
import { randomChoice } from '../../../utils';
import { ollGroups, collGroups } from '../../../data/coll';
import zbllMap from '../../../data/zbll';
import { Alg, FlashCard } from '../../../data/types';
import CaseSelector from './CaseSelector';

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
    marginTop: 50,
  },
  ready: {
    color: green[500],
  },
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps {}

const defaultFlashCardMap: {
  [name: string]: FlashCard<{ alg: Alg; total: number }>;
} = {};
ollGroups.forEach(oll => {
  collGroups[oll].forEach(coll => {
    Object.keys(zbllMap[oll][coll]).forEach(zbll => {
      const name = `${oll}/${coll}/${zbll}`;
      defaultFlashCardMap[name] = {
        data: {
          alg: { name, alg: '' },
          total: 0,
        },
        deficiency: 1,
      };
    });
  });
});

function padZero(n: number): string {
  if (n < 10) {
    return `0${n}`;
  }
  return n.toString();
}

function ZbllTrainer({ classes, history }: Props) {
  const [caseSelectorOpen, setCaseSelectorOpen] = React.useState<boolean>(
    false,
  );
  const [selectedCases, setCases] = useLocalStorage<{
    [name: string]: boolean;
  }>('zbll-trainer/selected-cases', {});
  const [flashCardMap, setFlashCardMap] = useLocalStorage<{
    [name: string]: FlashCard<{ alg: Alg; total: number }>;
  }>('zbll-trainer/flashcard-map', defaultFlashCardMap);
  const [currentCase, setCurrentCase] = React.useState<Alg | null>(null);

  const cases = React.useMemo(() => {
    return Object.keys(selectedCases).filter(name => selectedCases[name]);
  }, [selectedCases]);

  function goBack() {
    history.goBack();
  }

  const pickCaseFromFlashCards = React.useCallback(() => {
    const c = randomChoice(cases, cases.map(c => flashCardMap[c].deficiency));
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

  function handleTimerEnd() {
    generateNextCase();
  }

  React.useEffect(() => {
    generateNextCase();
  }, [generateNextCase]);

  const { time, status: timerStatus } = useTimer({ onEnd: handleTimerEnd });

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
      <Grid container justify="center" className={classes.container}>
        <Button variant="outlined" color="primary" onClick={openCaseSelector}>
          Select Cases
        </Button>
      </Grid>
      <Grid container justify="center">
        <Typography className={classes.selectedCount}>
          {cases.length} selected
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Typography component="div" variant="h4" className={classes.scramble}>
          {currentCase ? currentCase.alg : ''}
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Typography
          component="div"
          variant="h1"
          className={classNames(classes.time, {
            [classes.ready]: timerStatus === TimerStatus.READY,
          })}
        >
          {Math.floor(time / 100)}.{padZero(time % 100)}
        </Typography>
      </Grid>
      <CaseSelector
        open={caseSelectorOpen}
        onClose={handleCaseSelectorClose}
        onSubmit={handleCaseSubmit}
      />
    </>
  );
}

export default withRouter(withStyles(styles)(ZbllTrainer));
