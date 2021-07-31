import { createContext, useEffect, useState, ReactNode, useContext } from 'react';

import { api } from '../services/api';

import { useTick } from './useTick';

interface PriceConsultContextData {
  bitcoinPriceInUsd: number;
}

interface ContributionProviderProps {
  children: ReactNode;
}

const PriceConsultContext = createContext<PriceConsultContextData>(
  {} as PriceConsultContextData
);

export function PriceConsultProvider({ children }: ContributionProviderProps) {
  const TIME_TO_UPDATE_PRICE_IN_SECONDS = 10;
  const [bitcoinPriceInUsd, setBitcoinPriceInUsd] = useState(0);
  const { tick } = useTick();

  useEffect(() => {
    async function consultBitcoinPrice() {
      const { data } = await api.get("simple/price?ids=bitcoin&vs_currencies=usd");

      const { usd } = data.bitcoin;

      setBitcoinPriceInUsd(usd);
    }

    if (tick % TIME_TO_UPDATE_PRICE_IN_SECONDS === 0) {
      consultBitcoinPrice();
    }
  }, [tick]);

  return (
    <PriceConsultContext.Provider value={{ bitcoinPriceInUsd }}>
      {children}
    </PriceConsultContext.Provider>
  )
}

export function usePriceConsult() {
  return useContext(PriceConsultContext);
}