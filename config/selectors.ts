export interface MarketSelectors {
  cookies: {
    closeButton: string;
  };
  modal: {
    closeButton: string;
  };
  header: {
    shopNavigationLink: string;
  };
  product: {
    ploomXAdvanced: string;
    addToCartButton: string;
    title: string;
    price: string;
    description: string;
    allVariantLinks: string;
    images: string;
  };
  cart: {
    proceedToCheckoutButton: string;
    itemsCounter: string;
    itemName: string;
    removeItemButton: string;
    confirmRemovalButton: string;
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
      shopNavigationLink: "//a[@data-testid='headerItem-0']",
    },
    product: {
      ploomXAdvanced: "//div[@data-sku='ploom-x-advanced']",
      addToCartButton: "//button[@data-testid='pdpAddToProduct']",
      title: "//h1",
      price: "//span[@data-testid='productPrice']",
      description: "//div[@data-testid='productDescription']",
      allVariantLinks: "//div[@data-testid='all_skus']//a",
      images: "//div[@data-components='Image']//img",
    },
    cart: {
      proceedToCheckoutButton:
        "//button[@data-testid='miniCartCheckoutButton']",
      itemsCounter: "//button[@data-testid='cartIcon']//span",
      itemName: "//div[@data-testid='item']//strong",
      removeItemButton:
        "//div[@data-testid='regular-cart-list']//button[@data-testid='cartRemoveButton']",
      confirmRemovalButton:
        "//button[@data-testid='remove-item-submit-button']",
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
      shopNavigationLink: "(//ul)[1]//li[2]",
    },
    product: {
      ploomXAdvanced: "//div[@data-sku='16355381']",
      addToCartButton: "//button[@data-testid='pdpAddToProduct']",
      title: "//h1",
      price: "//span[@data-testid='productPrice']",
      description: "//div[@data-testid='productDescription']",
      allVariantLinks: "//div[@data-testid='all_skus']//a",
      images: "//div[@data-components='Image']//img",
    },
    cart: {
      proceedToCheckoutButton:
        "//button[@data-testid='miniCartCheckoutButton']",
      itemsCounter: "//button[@data-testid='cartIcon']//span",
      itemName: "//div[@data-testid='item']//strong",
      removeItemButton:
        "//div[@data-testid='regular-cart-list']//button[@data-testid='cartRemoveButton']",
      confirmRemovalButton:
        "//button[@data-testid='remove-item-submit-button']",
      emptyCartMessage:
        "//div[@id='aem-checkout']//div[@data-testid='emptyCartContainer']",
    },
  },
};
