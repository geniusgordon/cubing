import React from 'react';
import classNames from 'classnames';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import {
  createStyles,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import CubeImage from '../../../components/CubeImage';
import collMap, { collGroups, ollAlgs } from '../../../data/coll';
import zbllMap from '../../../data/zbll';

const styles = createStyles({
  container: {
    marginTop: 30,
  },
  imageItem: {
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: green[500],
  },
});

interface Props extends WithStyles<typeof styles>, WithTheme {}

function CaseSelector({ classes, theme }: Props) {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const imageSize = matches ? 100 : 80;

  const [selectedCases, setCases] = React.useState<{ [name: string]: boolean }>(
    {},
  );

  const [oll, setOll] = React.useState<string | null>(null);
  const [coll, setColl] = React.useState<string | null>(null);

  const selectedOllCollAlgs = React.useMemo(() => {
    if (!oll) {
      return null;
    }
    return collGroups[oll].map(coll => ({
      name: coll,
      alg: collMap[oll][coll],
    }));
  }, [oll]);

  const selectedCollZbllAlgs = React.useMemo(() => {
    if (!oll || !coll) {
      return null;
    }
    return Object.keys(zbllMap[oll][coll]).map(zbll => ({
      name: zbll,
      alg: zbllMap[oll][coll][zbll][0],
    }));
  }, [oll, coll]);

  return (
    <Grid container justify="center" spacing={8} className={classes.container}>
      {ollAlgs.map(({ name, alg }) => (
        <Grid
          key={name}
          item
          onClick={() => {
            setColl(null);
            setOll(name);
          }}
          className={classes.imageItem}
        >
          <CubeImage alg={alg} size={imageSize} stage="oll" view="plan" />
        </Grid>
      ))}
      <Grid container justify="center" spacing={8}>
        {selectedOllCollAlgs &&
          selectedOllCollAlgs.map(({ name, alg }) => (
            <Grid
              key={name}
              item
              onClick={() => setColl(name)}
              className={classes.imageItem}
            >
              <CubeImage alg={alg} size={imageSize} stage="coll" view="plan" />
            </Grid>
          ))}
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <Grid container justify="center" spacing={8}>
            {selectedCollZbllAlgs &&
              selectedCollZbllAlgs.map(({ name, alg }) => {
                const caseName = `${oll}/${coll}/${name}`;
                return (
                  <Grid
                    key={name}
                    item
                    className={classes.imageItem}
                    onClick={() =>
                      setCases({
                        ...selectedCases,
                        [caseName]: !selectedCases[caseName],
                      })
                    }
                  >
                    <div
                      className={classNames({
                        [classes.selected]: selectedCases[caseName],
                      })}
                    >
                      <CubeImage
                        alg={alg}
                        size={imageSize * 0.75}
                        view="plan"
                      />
                    </div>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withTheme()(withStyles(styles)(CaseSelector));
