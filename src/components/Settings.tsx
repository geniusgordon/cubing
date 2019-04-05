import React from 'react';
import { ColorNeutrality } from '../data/types';

interface Settings {
  colorNeutrality: ColorNeutrality;
  crossLevel: number;
}

interface Context {
  settings: Settings;
  updateSettings(settings: Partial<Settings>): void;
}

const defaultSettings: Settings = {
  colorNeutrality: ColorNeutrality.NON_CN,
  crossLevel: 1,
};

const SettingContext = React.createContext<Context>({
  settings: defaultSettings,
  updateSettings() {},
});

interface Props {
  children: React.ReactNode;
}

function SettingProvider({ children }: Props) {
  const [settings, setSettings] = React.useState<Settings>(defaultSettings);

  function updateSettings(newSettings: Partial<Settings>) {
    setSettings({
      ...settings,
      ...newSettings,
    });
  }

  return (
    <SettingContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export { SettingProvider, SettingContext };
