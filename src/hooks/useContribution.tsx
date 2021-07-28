import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { CONTRIBUTIONS_STORAGE_KEY } from '../constants';
import { usePriceConsult } from './usePriceConsult';

interface Contribution {
  id: string;
  buyDate: string;
  amount: number;
  price: number;
  coinPurchased: number;
  totalValue: number;
}

type ContributionInput = Omit<Contribution, 'id' | 'coinPurchased' | 'totalValue'>;

interface ContributionsContextData {
  contributions: Contribution[];
  createContribution: (contributionInput: ContributionInput) => Promise<void>;
}

interface ContributionProviderProps {
  children: ReactNode;
}

const ContributionsContext = createContext<ContributionsContextData>(
  {} as ContributionsContextData
);

export function ContributionsProvider({ children }: ContributionProviderProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  const { bitcoinPriceInUsd } = usePriceConsult();

  useEffect(() => {
    function loadContributions() {
      const contributions = localStorage.getItem(CONTRIBUTIONS_STORAGE_KEY);

      if (contributions) {
        setContributions(JSON.parse(contributions));
      }
    }

    loadContributions();
  }, []);

  async function createContribution(contributionInput: ContributionInput) {
    const coinPurchased = contributionInput.amount / contributionInput.price;
    const totalValue = coinPurchased * bitcoinPriceInUsd;

    const contribution = {
      ...contributionInput,
      id: uuidV4(),
      coinPurchased,
      totalValue
    };

    const contributionsToStore = [...contributions, contribution];

    localStorage.setItem(CONTRIBUTIONS_STORAGE_KEY, JSON.stringify(contributionsToStore));

    setContributions(contributionsToStore);
  }

  return (
    <ContributionsContext.Provider value={{ contributions, createContribution }}>
      {children}
    </ContributionsContext.Provider>
  )
}

export function useContributions() {
  return useContext(ContributionsContext);
}