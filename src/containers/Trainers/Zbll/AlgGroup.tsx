import React from 'react';
import classNames from 'classnames';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import {
  createStyles,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  Theme,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green, grey } from '@material-ui/core/colors';
import CubeImage from '../../../components/CubeImage';
import { collGroups } from '../../../data/coll';
import { Alg } from '../../../data/types';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing.unit,
    },
    imageContainer: {
      cursor: 'pointer',
      position: 'relative',
      margin: 5,
    },
    buttonContainer: {
      height: 36,
      marginTop: theme.spacing.unit,
    },
    active: {
      backgroundColor: green[300],
    },
    count: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      color: grey[50],
      backgroundColor: grey[600],
      paddingLeft: 5,
      paddingRight: 5,
    },
  });

interface Props extends WithStyles<typeof styles>, WithTheme {
  active?: boolean;
  alg: Alg;
  stage: 'oll' | 'coll';
  selectedCount: { [name: string]: number };
  onSelect(alg: Alg): void;
  onAllClick(alg: Alg): void;
  onNoneClick(alg: Alg): void;
}

function AlgGroup({
  classes,
  theme,
  active,
  alg,
  stage,
  selectedCount,
  onSelect,
  onAllClick,
  onNoneClick,
}: Props) {
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const imageSize = matches ? 120 : 80;

  const oll = alg.name.split('/')[0];
  const count = selectedCount[alg.name] || 0;
  const total = stage === 'oll' ? collGroups[oll].length * 12 : 12;

  const handleClick = React.useCallback(() => {
    onSelect(alg);
  }, [alg, onSelect]);

  const handleAllClick = React.useCallback(() => {
    onAllClick(alg);
  }, [alg, onAllClick]);

  const handleNoneClick = React.useCallback(() => {
    onNoneClick(alg);
  }, [alg, onNoneClick]);

  return (
    <Grid item className={classes.container}>
      <Grid
        onClick={handleClick}
        className={classNames(classes.imageContainer, {
          [classes.active]: active,
        })}
      >
        <CubeImage alg={alg.alg} size={imageSize} stage={stage} view="plan" />
        <Typography className={classes.count}>
          {count} / {total}
        </Typography>
      </Grid>
      <Grid container className={classes.buttonContainer}>
        {active && (
          <>
            <Grid item>
              <Button onClick={handleAllClick}>All</Button>
            </Grid>
            <Grid item>
              <Button onClick={handleNoneClick}>None</Button>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default withTheme()(withStyles(styles)(AlgGroup));
