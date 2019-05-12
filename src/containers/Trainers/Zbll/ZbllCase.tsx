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
import { green } from '@material-ui/core/colors';
import CubeImage from '../../../components/CubeImage';
import { Alg } from '../../../data/types';

const styles = createStyles({
  imageContainer: {
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: green[300],
  },
});

interface Props extends WithStyles<typeof styles>, WithTheme {
  alg: Alg;
  selected: boolean;
  onSelect(alg: Alg): void;
}

function ZbllCase({ classes, theme, alg, selected, onSelect }: Props) {
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const imageSize = matches ? 120 : 80;

  const handleSelect = React.useCallback(() => {
    onSelect(alg);
  }, [alg, onSelect]);

  return (
    <Grid item className={classes.imageContainer} onClick={handleSelect}>
      <div
        className={classNames({
          [classes.selected]: selected,
        })}
      >
        <CubeImage alg={alg.alg} size={imageSize * 0.75} view="plan" />
      </div>
    </Grid>
  );
}

export default withTheme()(withStyles(styles)(ZbllCase));
