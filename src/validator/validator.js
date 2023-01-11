const isValidName = function (name) {
    if (/^[a-zA-Z ]+$/.test(name)) {
      return true;
    }
  };

  
const isValidDecimalNumber = function (decimal) {
    return /^(\d+\.?\d*)$/.test(decimal);
  }

  module.exports = {isValidName, isValidDecimalNumber}