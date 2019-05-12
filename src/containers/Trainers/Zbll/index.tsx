import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '../../../components/AppBar';
import { useTimer } from '../../../hooks';
import CaseSelector from './CaseSelector';

interface Props extends RouteComponentProps {}

function ZbllTrainer({ history }: Props) {
  function goBack() {
    history.goBack();
  }

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
      <CaseSelector />
    </>
  );
}

export default withRouter(ZbllTrainer);
