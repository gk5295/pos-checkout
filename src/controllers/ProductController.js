/**
 *  Calculate the final price of all the items
 *  with the provided price for each product type
 * @param {*} items
 * @param {*} productPriceMapping
 * @returns final price of the items
 */
function getFinalPrice(items, productPriceMapping) {
  let finalPrice = 0;

  items.forEach(item => {
    const price = Number(productPriceMapping[item.type]) * item.qty;

    finalPrice += price;
  });

  return finalPrice;
}

/**
 *  Calculate the deals on the items if the customer
 *  has some deals and the items fall under the deal criteria
 * @param {*} items
 * @param {*} deals
 * @returns items after the deals applied
 */
function calculateDeals(items, deals) {
  const dealValue = deals.value;

  items.forEach(item => {
    // if the deal is for the type we are looking for and the qty is more than
    // the required qty for the deals to be applied
    if (item.type === dealValue.product && item.qty >= dealValue.qty) {
      const itemsUnderDeal = Math.floor(item.qty / dealValue.qty);
      const itemsNotUnderDeal = item.qty % dealValue.qty;

      const newQty = itemsUnderDeal * dealValue.finalQty + itemsNotUnderDeal;
      item.qty = newQty; // eslint-disable-line
    }
  });

  return items;
}

module.exports = {
  /**
   *  Find all the products available
   * @param {*} req
   * @param {*} res
   * @returns all the products available
   */
  find: async (req, res) => {
    try {
      const products = await models.Product.findAll();

      return res.ok(products);
    } catch (e) {
      return res.serverError(e);
    }
  },

  /**
   *  Calculate the final price of all the items selected by a customer
   * @param {*} req
   * @param {*} res
   * @returns final price of the items
   */
  checkoutPrice: async (req, res) => {
    try {
      /**
       * req.body is expected to have these fields
       *
       * customer: String
       * items: [Object]
       * items.type: String, one of ['small', 'medium', 'large']
       * items.qty: Number
       */
      const { customer, items } = req.body;
      let finalPrice = 0;

      // early checks to validate the data
      if (!customer || !items || !Array.isArray(items) || !items.length) return res.badRequest();

      // Fetch all the products we serve
      const productDetails = await models.Product.findAll({ attributes: ['type', 'price'] });

      // mapping between product and its corresponding price
      const productPriceMapping = {};

      productDetails.forEach(product => {
        productPriceMapping[product.type] = product.price;
      });

      // fetch all the offers for the given customer
      const offersForCustomer = await models.Offer.findAll({ where: { customer } });

      /** if there are no offers, calculate the total price without any discount */
      if (!offersForCustomer.length) {
        finalPrice = getFinalPrice(items, productPriceMapping);

        return res.ok({ finalPrice });
      }

      /** if the customer has offers, calculate the total price including the discount */
      const discountOffer = offersForCustomer.find(offer => offer.type === 'discount');
      const dealOffer = offersForCustomer.find(offer => offer.type === 'deal');

      let itemsCopy = [...items];

      // if the customer has discounts, update the prices as per the discounts
      if (discountOffer) {
        productPriceMapping[discountOffer.value.product] = discountOffer.value.finalPrice;
      }

      // if the customer has deals, update the items qty as per the deal
      if (dealOffer) {
        itemsCopy = calculateDeals(items, dealOffer);
      }

      // calculate the final price of all the items with updated qty and price
      finalPrice = getFinalPrice(itemsCopy, productPriceMapping);

      return res.ok({ finalPrice });
    } catch (e) {
      return res.serverError(e);
    }
  }
};
