import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

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
  const [bitcoinPriceInUsd, setBitcoinPriceInUsd] = useState(0);

  useEffect(() => {
    async function consultBitcoinPrice() {
      const { data } = await api.get("simple/price?ids=bitcoin&vs_currencies=usd");

      const { usd } = data.bitcoin;

      setBitcoinPriceInUsd(usd);
    }

    consultBitcoinPrice();
  }, []);

  return (
    <PriceConsultContext.Provider value={{ bitcoinPriceInUsd }}>
      {children}
    </PriceConsultContext.Provider>
  )
}

export function usePriceConsult() {
  return useContext(PriceConsultContext);
}