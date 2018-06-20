module.exports.policies = {
  '*': 'authenticated',
  // whitelist the auth controller
  auth: {
    '*': true
  }
};
