import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '../../components/AppBar';

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
    </>
  );
}

export default withRouter(ZbllTrainer);
