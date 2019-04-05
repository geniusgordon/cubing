import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './Routes';
import theme from './theme';
import { SettingProvider } from './components/Settings';

function App() {
  return (
    <SettingProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </MuiThemeProvider>
    </SettingProvider>
  );
}

export default App;
