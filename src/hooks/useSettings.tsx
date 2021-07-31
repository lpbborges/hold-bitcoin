import { useEffect, createContext, useState, ReactNode, useContext } from 'react';
import { SETTINGS_STORAGE_KEY } from '../constants';
import { CurrencyLocaleEnum } from '../enum/CurrencyLocaleEnum';

interface ISettings {
  currency: CurrencyLocaleEnum;
}

interface SettingsContextData {
  settings: ISettings;
  setCurrencyLocale: (currency: CurrencyLocaleEnum) => void;
}

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsContext = createContext<SettingsContextData>(
  {} as SettingsContextData
);

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState({ currency: CurrencyLocaleEnum.brl } as ISettings);

  useEffect(() => {
    function getSettings() {
      const storagedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

      if (storagedSettings) {
        setSettings(JSON.parse(storagedSettings));
      }
    }

    getSettings();
  }, []);

  function setCurrencyLocale(currency: CurrencyLocaleEnum) {
    const updatedSettings = { ...settings, currency };
    setSettings(updatedSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
  }

  return (
    <SettingsContext.Provider value={{ settings, setCurrencyLocale }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext);
}