import { useMemo } from 'react';
import { useContributions } from '../../hooks/useContribution';
import { usePriceConsult } from '../../hooks/usePriceConsult';
import { useSettings } from '../../hooks/useSettings';
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
  const { bitcoinPrice } = usePriceConsult();
  const { settings } = useSettings();
  const { currency } = settings;

  const summaryData = useMemo(() => {
    const summaryContributions = contributions.reduce((summaryContributions, contribution) => {
      return {
        totalContributions: summaryContributions.totalContributions + contribution.amount,
        coinBalance: summaryContributions.coinBalance + contribution.coinPurchased,
        profit: 0,
        balance: summaryContributions.balance + (contribution.coinPurchased * bitcoinPrice),
      }
    }, {
      totalContributions: 0,
      profit: 0,
      balance: 0,
      coinBalance: 0
    } as SummaryContributions);

    const coinBalance = summaryContributions.coinBalance.toFixed(8);
    const profit = (((summaryContributions.balance / summaryContributions.totalContributions) - 1) * 100).toFixed(2);

    return {
      totalContributions: formatCurrency(summaryContributions.totalContributions, currency),
      coinBalance: isNaN(Number(coinBalance)) ? '0.00000000' : coinBalance,
      balance: formatCurrency(summaryContributions.balance, currency),
      profit: isNaN(Number(profit)) ? '0.00' : profit,
    };
  }, [bitcoinPrice, contributions, currency])

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