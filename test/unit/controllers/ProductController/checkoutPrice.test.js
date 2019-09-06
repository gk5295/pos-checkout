require('chai').should();

describe('checkoutPrice API', () => {
  it('should return final price without any discounts applied for customer without any offers', async () => {
    const payload = {
      customer: 'abcd',
      items: [{ type: 'medium', qty: 6 }]
    };

    const res = await request.post('/api/v1/products/price').send(payload);

    res.statusCode.should.equal(200);
    res.body.should.be.a('object').with.keys('finalPrice');
    res.body.finalPrice.should.equal(322.99 * 6);
  });

  it('should return final price without any discounts applied for customer without any offers', async () => {
    const payload = {
      customer: 'abcd',
      items: [{ type: 'small', qty: 1 }, { type: 'medium', qty: 1 }, { type: 'large', qty: 1 }]
    };

    const res = await request.post('/api/v1/products/price').send(payload);

    res.statusCode.should.equal(200);
    res.body.should.be.a('object').with.keys('finalPrice');
    res.body.finalPrice.should.equal(269.99 * 1 + 322.99 * 1 + 394.99 * 1); // 987.97
  });

  it('should apply discount for Infosys', async () => {
    const payload = {
      customer: 'Infosys',
      items: [{ type: 'small', qty: 3 }, { type: 'large', qty: 1 }]
    };

    const res = await request.post('/api/v1/products/price').send(payload);

    res.statusCode.should.equal(200);
    res.body.should.be.a('object').with.keys('finalPrice');
    res.body.finalPrice.should.equal(269.99 * 2 + 394.99 * 1); // 934.97
  });

  it('should apply discount for Amazon', async () => {
    const payload = {
      customer: 'Amazon',
      items: [{ type: 'medium', qty: 3 }, { type: 'large', qty: 1 }]
    };

    const res = await request.post('/api/v1/products/price').send(payload);

    res.statusCode.should.equal(200);
    res.body.should.be.a('object').with.keys('finalPrice');
    res.body.finalPrice.should.equal(322.99 * 3 + 299.99 * 1); // 1,268.96
  });

  it('should apply discount for Facebook', async () => {
    const payload = {
      customer: 'Facebook',
      items: [{ type: 'medium', qty: 5 }, { type: 'large', qty: 1 }]
    };

    const res = await request.post('/api/v1/products/price').send(payload);

    res.statusCode.should.equal(200);
    res.body.should.be.a('object').with.keys('finalPrice');
    res.body.finalPrice.should.equal(322.99 * 4 + 389.99 * 1); // 1,681.95
  });
});
