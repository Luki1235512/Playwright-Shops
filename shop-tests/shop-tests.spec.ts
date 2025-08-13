import { marketConfig } from "../config/markets";
import { test } from "../fixtures/pageFixtures";
import { CartPage } from "../pages/CartPage";

marketConfig.forEach((market) => {
  test.describe(`Ploom Shop Tests - ${market.name}`, () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.goto();
      await homePage.acceptCookiesAndCloseModals();
    });

    test(`Test Case 1: Add product to cart - ${market.name}`, async ({
      homePage,
      productPage,
      cartPage,
    }) => {
      await homePage.navigateToShop();
      await productPage.selectPloomXAdvanced();

      const productTitle = await productPage.getProductTitle();
      await productPage.addToCart();
      await cartPage.verifyItemAdded(productTitle);
    });

    test(`Test Case 2: Remove product from cart - ${market.name}`, async ({
      homePage,
      productPage,
      cartPage,
      context,
    }) => {
      await homePage.navigateToShop();
      await productPage.selectPloomXAdvanced();
      const productTitle = await productPage.getProductTitle();
      await productPage.addToCart();
      await cartPage.verifyItemAdded(productTitle);

      await cartPage.proceedToCheckout();
      const checkoutPage = await cartPage.navigateToCheckoutPage(context);

      const checkoutCartPage =
        checkoutPage === cartPage.page
          ? cartPage
          : new CartPage(checkoutPage, market.name, market.url);

      await checkoutCartPage.removeItem();
      await checkoutCartPage.verifyEmptyCart();
    });

    test(`Test Case 3: Verify links and images on product page - ${market.name}`, async ({
      homePage,
      productPage,
      request,
    }) => {
      await homePage.navigateToShop();
      await productPage.selectPloomXAdvanced();
      await productPage.verifyLinksAndImages(request);
    });
  });
});
