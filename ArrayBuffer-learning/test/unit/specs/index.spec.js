import Index from 'ex/index.js';

describe('test index', () => {

  it('测试Test功能是否能用', done => {

    expect(Index() === 1).to.be.true;
    done();
  });
});
