const helpers = {};

helpers.random = () => {
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let random = 0;
  for(let i = 0;i < 5; i++) {
    random += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return random;
};

module.exports = helpers;
