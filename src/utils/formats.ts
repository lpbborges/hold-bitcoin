export const formatCurrency = (value: number): string =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

export const formatDate = (value: number): string =>
  Intl.DateTimeFormat('pt-BR').format(value);
