import { test as base } from "@playwright/test";
import { marketConfig } from "../config/markets";
import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";

type PageFixtures = {
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  marketData: { name: string; url: string };
};

export const test = base.extend<PageFixtures>({
  marketData: async ({}, use, testInfo) => {
    const market = marketConfig.find((market) =>
      testInfo.title.includes(market.name)
    );

    if (!market) {
      throw new Error(
        `No market configuration found for test: ${testInfo.title}`
      );
    }

    await use({ name: market.name, url: market.url });
  },

  homePage: async ({ page, marketData }, use) => {
    const homePage = new HomePage(page, marketData.name, marketData.url);
    await use(homePage);
  },

  productPage: async ({ page, marketData }, use) => {
    const productPage = new ProductPage(page, marketData.name, marketData.url);
    await use(productPage);
  },

  cartPage: async ({ page, marketData }, use) => {
    const cartPage = new CartPage(page, marketData.name, marketData.url);
    await use(cartPage);
  },
});

export { expect } from "@playwright/test";
