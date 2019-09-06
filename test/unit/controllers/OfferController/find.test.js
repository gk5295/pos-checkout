require('chai').should();

describe('find API', () => {
  it('should return all the available offers for the given customer', async () => {
    const res = await request.get('/api/v1/offers?customer=Facebook');

    res.statusCode.should.equal(200);
    res.body.should.be.an('array').with.length(2);
  });

  it('should return all the available offers for the given customer', async () => {
    const res = await request.get('/api/v1/offers?customer=Infosys');

    res.statusCode.should.equal(200);
    res.body.should.be.an('array').with.length(1);
  });
});
