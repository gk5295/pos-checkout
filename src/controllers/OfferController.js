module.exports = {
  /**
   *  Find all the offers available
   * @param {*} req
   * @param {*} res
   * @returns
   */
  find: async (req, res) => {
    const customer = req.query.customer;

    if (!customer) return res.ok([]);

    const offers = await models.Offer.findAll({ where: { customer } });

    return res.ok(offers);
  },

  /**
   *  Create new offer for the customer
   * @param {*} req
   * @param {*} res
   * @returns
   */
  create: async (req, res) => {
    const { customer, description, type, value } = req.body;

    // validate the provided data
    if (!customer || !description || !type || !value) return res.badRequest();

    // validate the type and value
    if (!['deal', 'discount'].includes(type) || typeof value !== 'object') return res.badRequest();

    let isDataValid = true;

    // validate the keys inside the value object
    const validDealKeys =
      type === 'deal' ? ['product', 'qty', 'finalQty'] : ['product', 'finalPrice'];
    const providedKeys = Object.keys(value);

    for (let i = 0; i < validDealKeys.length; i += 1) {
      const validKey = validDealKeys[i];

      if (!providedKeys.includes(validKey)) {
        isDataValid = false;
        break;
      }
    }

    if (!isDataValid) return res.badRequest();

    const result = await models.Offer.create({ customer, description, type, value });

    return res.created(result);
  }
};
