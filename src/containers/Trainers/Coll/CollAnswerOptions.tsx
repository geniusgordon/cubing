import React from 'react';
import Grid from '@material-ui/core/Grid';
import collMap, { collGroups } from '../../../data/coll';
import { TestCase } from '../../../data/types';
import CollCard from './CollCard';

interface Props {
  currentCase: TestCase;
  currentGuess: string | null;
  checkIsCorrect(case_: TestCase, guess: string | null): boolean;
  takeGuess(guess: string): void;
}

function CollAnswerOptions({
  currentCase,
  currentGuess,
  checkIsCorrect,
  takeGuess,
}: Props) {
  const group = currentCase.alg.name.split('/')[0];
  const options = collGroups[group].map(name => ({
    name: `${group}/${name}`,
    alg: collMap[group][name],
  }));

  return (
    <Grid container justify="center">
      {options.map((alg, i) => (
        <CollCard
          key={alg.name}
          alg={alg}
          currentCase={currentCase}
          currentGuess={currentGuess}
          checkIsCorrect={checkIsCorrect}
          onClick={() => takeGuess((i + 1).toString())}
        />
      ))}
    </Grid>
  );
}

export default CollAnswerOptions;
