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

  function updateSettings(s: Partial<Settings>) {
    const newSettings = { ...settings, ...s };
    setSettings(newSettings);
    window.localStorage.setItem(
      '@cubing-tools/settings',
      JSON.stringify(newSettings),
    );
  }

  React.useEffect(() => {
    const settingStr = window.localStorage.getItem('@cubing-tools/settings');
    if (!settingStr) {
      return;
    }
    try {
      const s = JSON.parse(settingStr);
      const newSettings = { ...settings, ...s };
      setSettings(newSettings);
    } catch (error) {}
  }, []);

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
