import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly cookiesCloseButton: Locator;
  readonly modalCloseButton: Locator;
  readonly shopMenuItem: Locator;

  constructor(page: Page, marketName: string, marketUrl: string) {
    super(page, marketName, marketUrl);
    this.cookiesCloseButton = page.locator(this.selectors.cookies.closeButton);
    this.modalCloseButton = page.locator(this.selectors.modal.closeButton);
    this.shopMenuItem = page.locator(this.selectors.header.shopNavigationLink);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.marketUrl);
  }

  async acceptCookiesAndCloseModals(): Promise<void> {
    await this.waitForVisible(this.modalCloseButton);
    await this.cookiesCloseButton.click();
    await this.modalCloseButton.click();
  }

  async navigateToShop(): Promise<void> {
    await this.waitForVisible(this.shopMenuItem);
    await this.shopMenuItem.click();
    await this.page.hover("body");
    await this.page.mouse.click(0, 0);
  }
}
