const { expect } = require('chai');
const server = require('../server');

describe('/docs', () => {
  it('should be readable under /docs/static/index.html', async () => {
    const res = await server.inject({ method: 'GET', url: '/docs/static/index.html' });
    expect(res.statusCode).to.be.equal(200);
  });
  it('one should be redirected to the docs by calling "/" or "/docs"', async () => {
    const docsRes = await server.inject({ method: 'GET', url: '/docs' });
    expect(docsRes.statusCode).to.be.equal(302);
    const rootRes = await server.inject({ method: 'GET', url: '/' });
    expect(rootRes.statusCode).to.be.equal(302);
  });
});
