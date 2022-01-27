module.exports = {
  mySidebar: [
    "intro",
    "using-yearn",
    {
      type: "category",
      label: "Products",
      items: [
        {
          type: "category",
          label: "yVaults",
          items: [
            "products/yvaults/overview",
            "products/yvaults/vaults-and-strategies",
            "products/yvaults/vault-tokens",
            "products/yvaults/yvault-advantages",
          ],
        },
        {
          type: "category",
          label: "Iron Bank",
          items: [
            "products/iron-bank/collateral-and-reserve-factor",
            "products/iron-bank/interest-rate-model",
            "products/iron-bank/iron-bank",
            "products/iron-bank/price-oracle",
            "products/iron-bank/delist-standard",
            "products/iron-bank/faq",
          ],
        },
        "products/woofy",
      ],
    },
    {
      type: "category",
      label: "Guides",
      items: [
        "guides/how-boost-works",
        "guides/how-to-add-a-custom-token-to-metamask",
        "guides/how-to-understand-yvault-roi",
        "guides/how-to-understand-yveCRV",
      ],
    },
  ],
};
