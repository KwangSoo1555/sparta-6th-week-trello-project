module.exports = {
  generateRandomEmail: (userContext, events, done) => {
    const randomString = Math.random().toString(36).substring(7);
    userContext.vars.email = `test_${randomString}@example.com`;
    return done();
  }
};
