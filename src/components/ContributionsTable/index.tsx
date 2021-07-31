import { useMemo } from 'react';

import { useContributions } from '../../hooks/useContribution';
import { usePriceConsult } from '../../hooks/usePriceConsult';
import { useSettings } from '../../hooks/useSettings';
import { formatCurrency, formatDate } from '../../utils/formats';

import { Container } from './styles';

export function ContributionsTable() {
  const { contributions } = useContributions();
  const { bitcoinPrice } = usePriceConsult();
  const { settings } = useSettings();
  const { currency } = settings;

  const formattedContributions = useMemo(() => {
    return contributions.map(contribution => {
      const totalValue = contribution.coinPurchased * bitcoinPrice;
      const isPositive = totalValue > contribution.amount;

      return {
        ...contribution,
        coinPurchased: isNaN(contribution.coinPurchased)
          ? contribution.coinPurchased.toFixed(8) : '0.00000000',
        buyDate: formatDate(new Date(contribution.buyDate).getTime()),
        amount: formatCurrency(contribution.amount, currency),
        price: formatCurrency(contribution.price, currency),
        totalValue: formatCurrency(totalValue, currency),
        isPositive,
      }
    });
  }, [bitcoinPrice, contributions, currency]);


  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Data compra</th>
            <th>Aporte</th>
            <th>Cotação na data</th>
            <th>Bitcoin comprado</th>
            <th>Valor total</th>
          </tr>
        </thead>
        <tbody>
          {formattedContributions.map((contribution) => (
            <tr key={contribution.id}>
              <td>{contribution.buyDate}</td>
              <td>{contribution.amount}</td>
              <td>{contribution.price}</td>
              <td>{contribution.coinPurchased}</td>
              <td className={contribution.isPositive ? "positive" : "negative"}>
                {contribution.totalValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}