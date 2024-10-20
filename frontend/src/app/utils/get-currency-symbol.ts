export const getCurrencySymbol = (currency: string): string => {
  const symbol = Intl.NumberFormat('en', {
    style: 'currency',
    currency,
  })
    .formatToParts()
    .find((part) => part.type === 'currency')!.value;

  return symbol;
};
