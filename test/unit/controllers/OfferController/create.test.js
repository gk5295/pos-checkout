require('chai').should();
// customer, description, type, value
describe('create API', () => {
  it('should return 401 if user is not authenticated', async () => {
    const payload = {
      customer: 'abc',
      description: 'some desc',
      type: 'discount',
      value: { product: 'small', finalPrice: '299.99' }
    };

    const res = await request.post('/api/v1/offers').send(payload);

    res.statusCode.should.equal(401);
  });

  it('should return 403 if user is not an admin', async () => {
    const payload = {
      customer: 'abc',
      description: 'some desc',
      type: 'discount',
      value: { product: 'small', finalPrice: '299.99' }
    };

    const res = await request.post('/api/v1/offers?auth=true').send(payload);

    res.statusCode.should.equal(403);
  });

  it('should create new offer', async () => {
    const payload = {
      customer: 'abc',
      description: 'some desc',
      type: 'discount',
      value: { product: 'small', finalPrice: '299.99' }
    };

    const res = await request.post('/api/v1/offers?auth=true&admin=true').send(payload);

    res.statusCode.should.equal(201);
  });
});
