import { expect, test } from "@playwright/test";
import { MESSAGES } from "../config/messages";
import { MARKET_SELECTORS } from "../config/selectors";

const markets = [
  { name: "UK", url: "https://www.ploom.co.uk" },
  { name: "Poland", url: "https://www.ploom.pl" },
];

markets.forEach((market) => {
  test.describe(`Ploom Shop Tests - ${market.name}`, () => {
    const selectors = MARKET_SELECTORS[market.name];
    const messages = MESSAGES[market.name];

    test.beforeEach(async ({ page }) => {
      await page.goto(market.url);

      page.locator(selectors.modal.closeButton).waitFor({ state: "visible" });

      await page.click(selectors.cookies.closeButton);
      await page.click(selectors.modal.closeButton);
    });

    const goToProductPage = async (page: any) => {
      await page.waitForSelector(selectors.header.shopMenuItem, {
        state: "visible",
      });

      await page.click(selectors.header.shopMenuItem);
      await page.hover("body");
      await page.mouse.click(0, 0);

      await page.waitForSelector(selectors.product.ploomXAdvanced, {
        state: "visible",
      });

      await page.click(selectors.product.ploomXAdvanced);

      await page.waitForSelector(selectors.product.title, {
        state: "visible",
      });
      await page.waitForLoadState("domcontentloaded");
    };

    const addProductToCart = async (page: any) => {
      await goToProductPage(page);

      await page.waitForSelector(selectors.product.addToCartButton, {
        state: "visible",
      });
      const addToCartButton = page.locator(selectors.product.addToCartButton);
      await expect(addToCartButton).toBeEnabled({ timeout: 5000 });
      await addToCartButton.click();

      const checkoutButton = page.locator(selectors.cart.checkoutButton);
      const miniCartHeaderElement = page.locator(selectors.cart.header);
      const itemName = await page
        .locator(selectors.product.title)
        .textContent();

      await checkoutButton.waitFor({ state: "visible" });
      await expect(checkoutButton).toBeEnabled();

      const basketCount = await miniCartHeaderElement.textContent();
      expect(basketCount).toBe("1");

      const cartItem = await page
        .locator(selectors.cart.cartItem)
        .textContent();
      expect(itemName).toBe(cartItem);
    };

    test(`Test Case 1: Add product to cart - ${market.name}`, async ({
      page,
    }) => {
      await addProductToCart(page);
    });

    test(`Test Case 2: Remove product from cart - ${market.name}`, async ({
      page,
      context,
    }) => {
      await addProductToCart(page);
      await page.click(selectors.cart.checkoutButton);

      const pagePromise = context.waitForEvent("page");
      page = await Promise.race([
        pagePromise.then((newPage) => newPage),
        page.waitForURL("**/checkout**").then(() => page),
        page.waitForTimeout(5000).then(() => page),
      ]);

      const removeItemButton = page.locator(selectors.cart.removeButton);
      await removeItemButton.waitFor({ state: "visible" });
      await expect(removeItemButton).toBeEnabled();

      await page.click(selectors.cart.removeButton);
      await page.click(selectors.cart.removeSubmitButton);
      const cartItem = await page
        .locator(selectors.cart.emptyCartMessage)
        .textContent();
      expect(cartItem).toBe(messages.emptyCart);
      const cartCount = page.locator(selectors.cart.header);
      expect(await cartCount.isVisible()).toBe(false);
    });

    test(`Test Case 3: Verify links and images on product page - ${market.name}`, async ({
      page,
      request,
    }) => {
      await goToProductPage(page);
      await page.waitForLoadState("load");
      const links = await page
        .locator("//div[@data-testid='all_skus']//a")
        .all();
      for (const link of links) {
        const href = await link.getAttribute("href");
        if (!href || href.startsWith("/content")) {
          continue;
        }
        const urlToCheck = href?.startsWith("http")
          ? href
          : `${market.url}${href}`;
        const response = await request.head(urlToCheck);
        expect(response.status()).toBe(200);
      }

      // Verify all images load correctly
      const images = await page
        .locator("//div[@data-components='Image']//img")
        .all();
      for (const image of images) {
        const src = await image.getAttribute("src");
        if (src) {
          const urlToCheck = src?.startsWith("http")
            ? src
            : `${market.url}${src}`;
          const response = await request.head(urlToCheck);
          expect(response.status()).toBe(200);
        }
      }
    });
  });
});
