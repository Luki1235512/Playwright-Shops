import { Locator, Page } from "@playwright/test";
import { MarketMessages, MESSAGES } from "../config/messages";
import { MARKET_SELECTORS, MarketSelectors } from "../config/selectors";

export abstract class BasePage {
  readonly page: Page;
  readonly marketName: string;
  readonly marketUrl: string;
  readonly selectors: MarketSelectors;
  readonly messages: MarketMessages;

  constructor(page: Page, marketName: string, marketUrl: string) {
    this.page = page;
    this.marketName = marketName;
    this.marketUrl = marketUrl;
    this.selectors = MARKET_SELECTORS[marketName];
    this.messages = MESSAGES[marketName];
  }

  async waitForVisible(
    locator: Locator,
    timeout: number = 5000
  ): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
  }

  async waitForEnabled(
    locator: Locator,
    timeout: number = 5000
  ): Promise<void> {
    await locator.waitFor({ state: "attached", timeout });
  }
}
