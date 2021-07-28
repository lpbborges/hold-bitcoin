import { useMemo } from 'react';
import { usePriceConsult } from '../../hooks/usePriceConsult';

import { formatCurrency } from '../../utils/formats';

import { Container } from './styles';

export function QuotationPanel() {
  const { bitcoinPriceInUsd } = usePriceConsult();

  const bitcoinPriceInUsdFormatted = useMemo(() => {
    return formatCurrency(bitcoinPriceInUsd);
  }, [bitcoinPriceInUsd])

  return (
    <Container>
      <h1>
        {`Bitcoin hoje: ${bitcoinPriceInUsdFormatted}`}
      </h1>
    </Container>
  )
}