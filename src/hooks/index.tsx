import { ReactNode } from 'react';
import { ContributionsProvider } from './useContribution';
import { PriceConsultProvider } from './usePriceConsult';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <PriceConsultProvider>
      <ContributionsProvider>
        {children}
      </ContributionsProvider>
    </PriceConsultProvider>
  )
}