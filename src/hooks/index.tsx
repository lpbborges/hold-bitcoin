import { ReactNode } from 'react';
import { ContributionsProvider } from './useContribution';
import { PriceConsultProvider } from './usePriceConsult';
import { TickProvider } from './useTick';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <TickProvider>
      <PriceConsultProvider>
        <ContributionsProvider>
          {children}
        </ContributionsProvider>
      </PriceConsultProvider>
    </TickProvider>
  )
}