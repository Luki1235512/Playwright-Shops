import { APIRequestContext, expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  readonly ploomXAdvanced: Locator;
  readonly title: Locator;
  readonly addToCartButton: Locator;
  readonly allVariantLinks: Locator;
  readonly images: Locator;

  constructor(page: Page, marketName: string, marketUrl: string) {
    super(page, marketName, marketUrl);
    this.ploomXAdvanced = page.locator(this.selectors.product.ploomXAdvanced);
    this.title = page.locator(this.selectors.product.title);
    this.addToCartButton = page.locator(this.selectors.product.addToCartButton);
    this.allVariantLinks = page.locator(this.selectors.product.allVariantLinks);
    this.images = page.locator(this.selectors.product.images);
  }

  async selectPloomXAdvanced(): Promise<void> {
    await this.waitForVisible(this.ploomXAdvanced);
    await this.ploomXAdvanced.click();
    await this.waitForVisible(this.title);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async addToCart(): Promise<void> {
    await this.waitForVisible(this.addToCartButton);
    await expect(this.addToCartButton).toBeEnabled({ timeout: 5000 });
    await this.addToCartButton.click();
  }

  async getProductTitle(): Promise<string> {
    return (await this.title.textContent()) || "";
  }

  async verifyLinksAndImages(request: APIRequestContext): Promise<void> {
    await this.page.waitForLoadState("networkidle");

    // Verify links
    const links = await this.allVariantLinks.all();
    for (const link of links) {
      const href = await link.getAttribute("href");
      if (!href || href.startsWith("/content")) continue;

      const urlToCheck = href.startsWith("http")
        ? href
        : `${this.marketUrl}${href}`;

      try {
        const response = await request.head(urlToCheck);
        expect(
          response.status(),
          `Link ${urlToCheck} should be accessible`
        ).toBe(200);
      } catch (error) {
        console.warn(`Failed to check link: ${urlToCheck}`, error);
      }
    }

    // Verify images
    const images = await this.images.all();
    for (const image of images) {
      const src = await image.getAttribute("src");
      if (!src) continue;

      const urlToCheck = src.startsWith("http")
        ? src
        : `${this.marketUrl}${src}`;

      try {
        const response = await request.head(urlToCheck);
        expect(
          response.status(),
          `Image ${urlToCheck} should be accessible`
        ).toBe(200);
      } catch (error) {
        console.warn(`Failed to check image: ${urlToCheck}`, error);
      }
    }
  }
}
