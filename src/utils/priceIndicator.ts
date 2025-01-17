import { Price } from '@/types';

export const createPriceIndicator = (prices: Price[]): string => {
  const priceToUse =
    prices.length === 1 ? prices[0] : prices.find((price) => price.type === 'General') || prices[0];

  const priceIndicator = '£'.repeat(Math.floor(priceToUse.amount / 10));
  return priceIndicator;
};
