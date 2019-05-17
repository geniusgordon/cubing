import React from 'react';
import {
  createStyles,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  Theme,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import collMap, { collGroups, ollAlgs } from '../../../data/coll';
import zbllMap from '../../../data/zbll';
import { Alg } from '../../../data/types';
import AlgGroup from './AlgGroup';
import ZbllCase from './ZbllCase';

const styles = (theme: Theme) =>
  createStyles({
    dialog: {
      width: '100%',
      overflowX: 'hidden',
    },
    container: {
      marginTop: theme.spacing.unit,
    },
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
  });

interface Props extends WithStyles<typeof styles>, WithTheme {
  open: boolean;
  selectedCases: { [name: string]: boolean };
  onClose(): void;
  onSubmit(cases: { [name: string]: boolean }): void;
}

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

function CaseSelector({
  classes,
  theme,
  open,
  selectedCases,
  onClose,
  onSubmit,
}: Props) {
  const [cases, setCases] = React.useState<{ [name: string]: boolean }>({});
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
    Object.keys(cases).forEach(key => {
      const parts = key.split('/');
      const oll = parts[0];
      const coll = parts[0] + '/' + parts[1];
      if (cases[key]) {
        count[oll] = count[oll] ? count[oll] + 1 : 1;
        count[coll] = count[coll] ? count[coll] + 1 : 1;
      }
    });
    return count;
  }, [cases]);

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
        ...cases,
        [alg.name]: !cases[alg.name],
      });
    },
    [cases],
  );

  const handleAllClick = React.useCallback(
    (alg: Alg) => {
      const parts = alg.name.split('/');
      const oll = parts[0];
      let s = { ...cases };
      if (parts.length === 1) {
        collGroups[oll].forEach(coll => {
          Object.keys(zbllMap[oll][coll]).forEach(zbll => {
            s[`${oll}/${coll}/${zbll}`] = true;
          });
        });
      } else {
        const coll = parts[1];
        Object.keys(zbllMap[oll][coll]).forEach(zbll => {
          s[`${oll}/${coll}/${zbll}`] = true;
        });
      }
      setCases(s);
    },
    [cases],
  );

  const handleNoneClick = React.useCallback(
    (alg: Alg) => {
      const parts = alg.name.split('/');
      const oll = parts[0];
      let s = { ...cases };
      if (parts.length === 1) {
        collGroups[oll].forEach(coll => {
          Object.keys(zbllMap[oll][coll]).forEach(zbll => {
            s[`${oll}/${coll}/${zbll}`] = false;
          });
        });
      } else {
        const coll = parts[1];
        Object.keys(zbllMap[oll][coll]).forEach(zbll => {
          s[`${oll}/${coll}/${zbll}`] = false;
        });
      }
      setCases(s);
    },
    [cases],
  );

  const handleSubmit = React.useCallback(() => {
    onSubmit(cases);
  }, [cases, onSubmit]);

  React.useEffect(() => {
    setCases(selectedCases);
  }, [selectedCases]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Zbll Case Selector
          </Typography>
          <Button color="inherit" onClick={handleSubmit}>
            Done
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" className={classes.container}>
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
        <Grid container justify="center">
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
          <Grid item xs={11} sm={6} lg={4}>
            <Grid container justify="center" spacing={8}>
              {selectedCollZbllAlgs &&
                selectedCollZbllAlgs.map(alg => (
                  <ZbllCase
                    key={alg.name}
                    alg={alg}
                    selected={cases[alg.name]}
                    onSelect={handleZbllSelect}
                  />
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default withTheme()(withStyles(styles)(CaseSelector));
