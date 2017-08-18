module.exports = date => {
  var month = date.getMonth() + 1; //months from 1-12
  var day = date.getDate();
  var year = date.getFullYear();
  return day + "/" + month + "/" + year;
}
