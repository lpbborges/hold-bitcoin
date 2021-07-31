import { useCallback } from 'react';
import { createContext, useEffect, useState, ReactNode, useContext } from 'react';

import { api } from '../services/api';
import { useSettings } from './useSettings';

import { useTick } from './useTick';

interface PriceConsultContextData {
  bitcoinPrice: number;
  refreshBitcoinPrice: () => Promise<void>;
}

interface ContributionProviderProps {
  children: ReactNode;
}

const PriceConsultContext = createContext<PriceConsultContextData>(
  {} as PriceConsultContextData
);

export function PriceConsultProvider({ children }: ContributionProviderProps) {
  const TIME_TO_UPDATE_PRICE_IN_SECONDS = 10;
  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const { tick } = useTick();
  const { settings } = useSettings();
  const { currency } = settings;

  const refreshBitcoinPrice = useCallback(async (): Promise<void> => {
    const { data } = await api.get(`simple/price?ids=bitcoin&vs_currencies=${currency}`);

    setBitcoinPrice(data.bitcoin[currency]);
  }, [currency]);

  useEffect(() => {
    if (tick % TIME_TO_UPDATE_PRICE_IN_SECONDS === 0) {
      refreshBitcoinPrice();
    }
  }, [refreshBitcoinPrice, tick]);

  return (
    <PriceConsultContext.Provider value={{ bitcoinPrice, refreshBitcoinPrice }}>
      {children}
    </PriceConsultContext.Provider>
  )
}

export function usePriceConsult() {
  return useContext(PriceConsultContext);
}