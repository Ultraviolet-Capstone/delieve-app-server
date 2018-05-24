const common = {
  checkParameters : function(parameters) {
    if (parameters.includes(undefined)) {
      return false;
    }
    return true;
  }
}
module.exports = common;