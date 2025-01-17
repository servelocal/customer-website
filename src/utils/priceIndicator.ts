import { Price } from '@/types';

export const createPriceIndicator = (prices: Price[]): string => {
  const priceToUse =
    prices.length === 1 ? prices[0] : prices.find((price) => price.type === 'General') || prices[0];

  let priceIndicator = '';

  if (priceToUse.amount === 0) {
    priceIndicator = 'Free';
  } else if (priceToUse.amount <= 10) {
    priceIndicator = '£';
  } else if (priceToUse.amount <= 20) {
    priceIndicator = '££';
  } else {
    priceIndicator = '£££';
  }

  return priceIndicator;
};
