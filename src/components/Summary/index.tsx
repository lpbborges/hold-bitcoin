import { useMemo } from 'react';
import { useContributions } from '../../hooks/useContribution';
import { usePriceConsult } from '../../hooks/usePriceConsult';
import { formatCurrency } from '../../utils/formats';
import { Container } from './styles';

interface SummaryContributions {
  totalContributions: number;
  profit: number;
  balance: number;
  coinBalance: number;
}

export function Summary() {
  const { contributions } = useContributions();
  const { bitcoinPriceInUsd } = usePriceConsult();

  const summaryData = useMemo(() => {
    const summaryContributions = contributions.reduce((summaryContributions, contribution) => {
      return {
        totalContributions: summaryContributions.totalContributions + contribution.amount,
        coinBalance: summaryContributions.coinBalance + contribution.coinPurchased,
        profit: 0,
        balance: summaryContributions.balance + (contribution.coinPurchased * bitcoinPriceInUsd),
      }
    }, {
      totalContributions: 0,
      profit: 0,
      balance: 0,
      coinBalance: 0
    } as SummaryContributions);

    return {
      totalContributions: formatCurrency(summaryContributions.totalContributions),
      coinBalance: summaryContributions.coinBalance.toFixed(8),
      balance: formatCurrency(summaryContributions.balance),
      profit: (summaryContributions.totalContributions > 0
        ? ((summaryContributions.balance / summaryContributions.totalContributions) - 1) * 100
        : 0).toFixed(2),
    };
  }, [bitcoinPriceInUsd, contributions])

  return (
    <Container>
      <div>
        <header>
          <p>Lucro</p>
        </header>
        <strong>
          {summaryData.profit}%
        </strong>
      </div>
      <div>
        <header>
          <p>Aporte total</p>
        </header>
        <strong>
          {summaryData.totalContributions}
        </strong>
      </div>
      <div>
        <header>
          <p>Saldo</p>
        </header>
        <strong>
          {summaryData.balance}
        </strong>
      </div>
      <div>
        <header>
          <p>Saldo em Bitcoin</p>
        </header>
        <strong>
          {summaryData.coinBalance}
        </strong>
      </div>
    </Container>
  )
}