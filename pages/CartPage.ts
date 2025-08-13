import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly itemsCounter: Locator;
  readonly itemName: Locator;
  readonly removeItemButton: Locator;
  readonly confirmRemovalButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page, marketName: string, marketUrl: string) {
    super(page, marketName, marketUrl);
    this.checkoutButton = page.locator(
      this.selectors.cart.proceedToCheckoutButton
    );
    this.itemsCounter = page.locator(this.selectors.cart.itemsCounter);
    this.itemName = page.locator(this.selectors.cart.itemName);
    this.removeItemButton = page.locator(this.selectors.cart.removeItemButton);
    this.confirmRemovalButton = page.locator(
      this.selectors.cart.confirmRemovalButton
    );
    this.emptyCartMessage = page.locator(this.selectors.cart.emptyCartMessage);
  }

  async verifyItemAdded(expectedItemName: string): Promise<void> {
    await this.waitForVisible(this.checkoutButton);
    await expect(this.checkoutButton).toBeEnabled();

    const basketCount = await this.itemsCounter.textContent();
    expect(basketCount?.trim(), "Cart should contain 1 item").toBe("1");

    const cartItemName = await this.itemName.textContent();
    expect(expectedItemName.trim(), "Product name should match cart item").toBe(
      cartItemName?.trim()
    );
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async removeItem(): Promise<void> {
    await this.waitForVisible(this.removeItemButton);
    await expect(this.removeItemButton).toBeEnabled();
    await this.removeItemButton.click();
    await this.confirmRemovalButton.click();
  }

  async verifyEmptyCart(): Promise<void> {
    const emptyMessage = await this.emptyCartMessage.textContent();
    expect(emptyMessage?.trim(), "Cart should show empty message").toBe(
      this.messages.emptyCart
    );
    await expect(
      this.itemsCounter,
      "Cart count should not be visible when empty"
    ).not.toBeVisible();
  }

  async navigateToCheckoutPage(context: BrowserContext): Promise<Page> {
    const [newPage] = await Promise.all([
      context.waitForEvent("page", { timeout: 5000 }).catch(() => null),
      this.page
        .waitForURL("**/checkout**", { timeout: 5000 })
        .catch(() => null),
    ]);

    return newPage || this.page;
  }
}
