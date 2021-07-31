import { ReactNode } from 'react';
import { ContributionsProvider } from './useContribution';
import { PriceConsultProvider } from './usePriceConsult';
import { SettingsProvider } from './useSettings';
import { TickProvider } from './useTick';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SettingsProvider>
      <TickProvider>
        <PriceConsultProvider>
          <ContributionsProvider>
            {children}
          </ContributionsProvider>
        </PriceConsultProvider>
      </TickProvider>
    </SettingsProvider>
  )
}