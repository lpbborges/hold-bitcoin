import { useEffect } from 'react';
import { CurrencyLocaleEnum } from '../../enum/CurrencyLocaleEnum';
import { usePriceConsult } from '../../hooks/usePriceConsult';
import { useSettings } from '../../hooks/useSettings';
import { QuotationPanel } from '../QuotationPanel';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewContributionModal: () => void;
}

export function Header({ onOpenNewContributionModal }: HeaderProps) {
  const { setCurrencyLocale } = useSettings();
  const { refreshBitcoinPrice } = usePriceConsult();
  const { settings } = useSettings();

  const handleSelectCurrencyChange = (currency: string) => {
    setCurrencyLocale(currency as CurrencyLocaleEnum);
  }

  useEffect(() => {
    refreshBitcoinPrice();
  }, [refreshBitcoinPrice, settings]);

  return (
    <Container>
      <label htmlFor="currencies">Selecione a moeda:
        <select
          value={settings.currency}
          name="currencies"
          onChange={(event) => handleSelectCurrencyChange(event.target.value)}
        >
          <option value="brl">Real</option>
          <option value="usd">Dólar</option>
        </select>
      </label>
      <Content>
        <QuotationPanel />
        <button type="button" onClick={onOpenNewContributionModal}>
          Novo aporte
        </button>
      </Content>
    </Container>
  )
}