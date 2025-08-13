# Playwright Shops Testing Framework

## Project Overview

This project provides automated end-to-end tests for Ploom shop functionality across different regional markets. It uses the Page Object Model pattern and fixtures for maintainable and scalable test automation.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Luki1235512/Playwright-Shops.git
cd Playwright-Shops
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run tests for specific browser

```bash
npx playwright test --project chromium
```

### Run tests with UI mode

```bash
npx playwright test --ui
```

## Test Cases

The framework includes three main test scenarios for each configured market:

1. **Add Product to Cart**: Tests the ability to add a Ploom X Advanced product to the shopping cart
2. **Remove Product from Cart**: Tests adding a product and then removing it from the cart during checkout
3. **Verify Links and Images**: Validates that all links and images on the product page are functional
