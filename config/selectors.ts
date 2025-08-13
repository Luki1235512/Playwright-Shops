export interface MarketSelectors {
  cookies: {
    closeButton: string;
  };
  modal: {
    closeButton: string;
  };
  header: {
    infoBannerIcon: string;
    shopMenuItem: string;
  };
  product: {
    ploomXAdvanced: string;
    addToCartButton: string;
    title: string;
    price: string;
    description: string;
  };
  cart: {
    checkoutButton: string;
    header: string;
    loginButton: string;
    cartItem: string;
    removeButton: string;
    removeSubmitButton: string;
    emptyCartMessage: string;
  };
}

export const MARKET_SELECTORS: Record<string, MarketSelectors> = {
  UK: {
    cookies: {
      closeButton: "//div[@id='onetrust-close-btn-container']",
    },
    modal: {
      closeButton:
        "(//div[@class='modal__mainContent']//span[@data-testid='customButton'])[1]",
    },
    header: {
      infoBannerIcon: "//button[@data-testid='infoBannerIcon']",
      shopMenuItem: "//a[@data-testid='headerItem-0']",
    },
    product: {
      ploomXAdvanced: "//div[@data-sku='ploom-x-advanced']",
      addToCartButton: "//button[@data-testid='pdpAddToProduct']",
      title: "//h1",
      price: "//span[@data-testid='productPrice']",
      description: "//div[@data-testid='productDescription']",
    },
    cart: {
      checkoutButton: "//button[@data-testid='miniCartCheckoutButton']",
      header: "//button[@data-testid='cartIcon']//span",
      loginButton: "//button[@data-testid='loginCheckoutButton']",
      cartItem: "//div[@data-testid='item']//strong",
      removeButton:
        "//div[@data-testid='regular-cart-list']//button[@data-testid='cartRemoveButton']",
      removeSubmitButton: "//button[@data-testid='remove-item-submit-button']",
      emptyCartMessage:
        "//div[@id='one-page-checkout']//div[@data-testid='emptyCartContainer']",
    },
  },
  Poland: {
    cookies: {
      closeButton: "//div[@id='onetrust-close-btn-container']",
    },
    modal: {
      closeButton: "//button[@data-testid='confirm-button']",
    },
    header: {
      infoBannerIcon: "//button[@data-testid='infoBannerIcon']",
      shopMenuItem: "(//ul)[1]//li[2]",
    },
    product: {
      ploomXAdvanced: "//div[@data-sku='16355381']",
      addToCartButton: "//button[@data-testid='pdpAddToProduct']",
      title: "//h1",
      price: "//span[@data-testid='productPrice']",
      description: "//div[@data-testid='productDescription']",
    },
    cart: {
      checkoutButton: "//button[@data-testid='miniCartCheckoutButton']",
      header: "//button[@data-testid='cartIcon']//span",
      loginButton: "//button[@data-testid='loginCheckoutButton']",
      cartItem: "//div[@data-testid='item']//strong",
      removeButton:
        "//div[@data-testid='regular-cart-list']//button[@data-testid='cartRemoveButton']",
      removeSubmitButton: "//button[@data-testid='remove-item-submit-button']",
      emptyCartMessage:
        "//div[@id='aem-checkout']//div[@data-testid='emptyCartContainer']",
    },
  },
};
