export const getCurrencySymbol = (currency: string): string => {
  const symbol = Intl.NumberFormat('en', {
    style: 'currency',
    currency,
  })
    .formatToParts()
    .find((part) => part.type === 'currency')!.value;

  return symbol;
};

export const getEmojiFromCountryCode = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127462 + char.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
};
