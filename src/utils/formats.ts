import { CurrencyLocaleEnum } from "../enum/CurrencyLocaleEnum";

export const formatCurrency = (value: number, currency: CurrencyLocaleEnum): string => {
  if (isNaN(value)) {
    value = 0;
  }

  let locale = 'pt-BR';

  switch (currency) {
    case CurrencyLocaleEnum.usd:
      locale = 'en-US';
      break;
    default:
      locale = 'pt-BR'
  }

  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

export const formatDate = (value: number): string =>
  Intl.DateTimeFormat('pt-BR').format(value);
