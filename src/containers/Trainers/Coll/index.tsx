import React from 'react';
import { collGroups, collAlgs } from '../../../data/coll';
import { AlgWithAuf, FlashCard, TestCase } from '../../../data/types';
import RecognitionTrainer from '../RecognitionTrainer';
import CollAnswerOptions from './CollAnswerOptions';

interface Props {}

const defaultFlashCardMap: { [name: string]: FlashCard<AlgWithAuf> } = {};
collAlgs.slice(0, 1).forEach(alg =>
  [...new Array(4)].forEach((_, i) => {
    const name = `${alg.name}-${i}`;
    defaultFlashCardMap[name] = {
      data: { name, alg: alg.alg, preAuf: i },
      deficiency: 1,
    };
  }),
);

function checkKeyInCases(case_: TestCase, key: string): boolean {
  const group = case_.alg.name.split('/')[0];
  if (collGroups[group].length === 4) {
    return /[1-4]/.test(key);
  }
  return /[1-6]/.test(key);
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

function CollRecognitionTrainer() {
  return (
    <RecognitionTrainer
      title="Coll Recognition Trainer"
      flashCardName="coll-recognition"
      defaultFlashCardMap={defaultFlashCardMap}
      checkKeyInCases={checkKeyInCases}
      checkIsCorrect={checkIsCorrect}
      renderAnswerOptions={({ currentCase, currentGuess, takeGuess }) => (
        <CollAnswerOptions
          currentCase={currentCase}
          currentGuess={currentGuess}
          checkIsCorrect={checkIsCorrect}
          takeGuess={takeGuess}
        />
      )}
    />
  );
}

export default CollRecognitionTrainer;
