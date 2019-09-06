require('chai').should();

describe('find API', () => {
  it('should return all the available products', async () => {
    const res = await request.get('/api/v1/products');

    res.statusCode.should.equal(200);
    res.body.should.be.an('array').with.length(3);
  });
});
