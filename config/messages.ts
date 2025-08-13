export interface MarketMessages {
  emptyCart: string;
}

export const MESSAGES: Record<string, MarketMessages> = {
  UK: {
    emptyCart: "You have no items in your shopping cart at the moment.",
  },
  Poland: {
    emptyCart: "W tym momencie Twój koszyk jest pusty.",
  },
};
