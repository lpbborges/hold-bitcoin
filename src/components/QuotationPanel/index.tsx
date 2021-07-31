import { useMemo } from 'react';
import { usePriceConsult } from '../../hooks/usePriceConsult';
import { useSettings } from '../../hooks/useSettings';

import { formatCurrency } from '../../utils/formats';

import { Container } from './styles';

export function QuotationPanel() {
  const { bitcoinPrice } = usePriceConsult();
  const { settings } = useSettings();
  const { currency } = settings;

  const bitcoinPriceFormatted = useMemo(() => {
    return formatCurrency(bitcoinPrice, currency);
  }, [bitcoinPrice, currency])

  return (
    <Container>
      <h1>
        {`Bitcoin hoje: ${bitcoinPriceFormatted}`}
      </h1>
    </Container>
  )
}