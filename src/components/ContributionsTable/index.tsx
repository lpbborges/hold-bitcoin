import { useMemo } from 'react';

import { useContributions } from '../../hooks/useContribution';
import { formatCurrency, formatDate } from '../../utils/formats';

import { Container } from './styles';

export function ContributionsTable() {
  const { contributions } = useContributions();

  const formattedContributions = useMemo(() => {
    return contributions.map(contribution => {
      return {
        ...contribution,
        coinPurchased: contribution.coinPurchased.toFixed(8),
        buyDate: formatDate(new Date(contribution.buyDate).getTime() + 86400000),
        amount: formatCurrency(contribution.amount),
        price: formatCurrency(contribution.price),
        totalValue: formatCurrency(contribution.totalValue),
        isPositive: contribution.totalValue > contribution.amount,
      }
    })
  }, [contributions]);


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