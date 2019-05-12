import React from 'react';
import {
  createStyles,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import collMap, { collGroups, ollAlgs } from '../../../data/coll';
import zbllMap from '../../../data/zbll';
import { Alg } from '../../../data/types';
import AlgGroup from './AlgGroup';
import ZbllCase from './ZbllCase';

const styles = createStyles({
  container: {
    marginTop: 30,
  },
});

interface Props extends WithStyles<typeof styles>, WithTheme {}

function CaseSelector({ classes, theme }: Props) {
  const [selectedCases, setCases] = React.useState<{ [name: string]: boolean }>(
    {},
  );
  const [oll, setOll] = React.useState<string | null>(null);
  const [coll, setColl] = React.useState<string | null>(null);

  const selectedOllCollAlgs = React.useMemo(() => {
    if (!oll) {
      return null;
    }
    return collGroups[oll].map(c => ({
      name: `${oll}/${c}`,
      alg: collMap[oll][c],
    }));
  }, [oll]);

  const selectedCollZbllAlgs = React.useMemo(() => {
    if (!oll || !coll) {
      return null;
    }
    const c = coll.split('/')[1];
    return Object.keys(zbllMap[oll][c]).map(zbll => ({
      name: `${oll}/${c}/${zbll}`,
      alg: zbllMap[oll][c][zbll][0],
    }));
  }, [oll, coll]);

  const selectedCount = React.useMemo(() => {
    const count: { [name: string]: number } = {};
    Object.keys(selectedCases).forEach(key => {
      const parts = key.split('/');
      const oll = parts[0];
      const coll = parts[0] + '/' + parts[1];
      if (selectedCases[key]) {
        count[oll] = count[oll] ? count[oll] + 1 : 1;
        count[coll] = count[coll] ? count[coll] + 1 : 1;
      }
    });
    return count;
  }, [selectedCases]);

  const handleOllSelect = React.useCallback((alg: Alg) => {
    setColl(null);
    setOll(alg.name);
  }, []);

  const handleCollSelect = React.useCallback((alg: Alg) => {
    setColl(alg.name);
  }, []);

  const handleZbllSelect = React.useCallback(
    (alg: Alg) => {
      setCases({
        ...selectedCases,
        [alg.name]: !selectedCases[alg.name],
      });
    },
    [selectedCases],
  );

  const handleAllClick = React.useCallback((alg: Alg) => {}, []);

  const handleNoneClick = React.useCallback((alg: Alg) => {}, []);

  return (
    <Grid container justify="center" spacing={8} className={classes.container}>
      {ollAlgs.map(alg => (
        <AlgGroup
          key={alg.name}
          active={alg.name === oll}
          alg={alg}
          stage="oll"
          selectedCount={selectedCount}
          onSelect={handleOllSelect}
          onAllClick={handleAllClick}
          onNoneClick={handleNoneClick}
        />
      ))}
      <Grid container justify="center" spacing={8}>
        {selectedOllCollAlgs &&
          selectedOllCollAlgs.map(alg => (
            <AlgGroup
              key={alg.name}
              active={alg.name === coll}
              alg={alg}
              stage="coll"
              selectedCount={selectedCount}
              onSelect={handleCollSelect}
              onAllClick={handleAllClick}
              onNoneClick={handleNoneClick}
            />
          ))}
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} sm={6} lg={4}>
          <Grid container justify="center" spacing={8}>
            {selectedCollZbllAlgs &&
              selectedCollZbllAlgs.map(alg => (
                <ZbllCase
                  key={alg.name}
                  alg={alg}
                  selected={selectedCases[alg.name]}
                  onSelect={handleZbllSelect}
                />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withTheme()(withStyles(styles)(CaseSelector));
