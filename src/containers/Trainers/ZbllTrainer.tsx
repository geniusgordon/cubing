import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '../../components/AppBar';
import { useTimer } from '../../hooks';
import zbllMap from '../../data/zbll';

interface Props extends RouteComponentProps {}

function ZbllTrainer({ history }: Props) {
  function goBack() {
    history.goBack();
  }

  const [time, setTime] = React.useState<number>(0);

  const handleHold = React.useCallback(() => {
    setTime(0);
  }, []);

  const handleEnd = React.useCallback((t: number) => {
    setTime(t);
  }, []);

  const { status } = useTimer({ onHold: handleHold, onEnd: handleEnd });

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
      <div>{status}</div>
      <div>{time}</div>
    </>
  );
}

export default withRouter(ZbllTrainer);
