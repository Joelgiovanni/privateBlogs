// Func to return a date format in the way that I want it
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newDate = month + '/' + day + '/' + year;

module.exports = newDate;
