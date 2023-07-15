module.exports.checkURL = (url) => {
  let regURL = /^((https?|http)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/
  return regURL.test(url);
};