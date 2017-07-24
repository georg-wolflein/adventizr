Template.registerHelper('formatDate', function(date) {
  if (moment(date).isBefore(moment().add(24, 'days')))
    return moment(date).fromNow();
  else
    return moment(date).format('MMM Do YYYY');
});

Template.registerHelper('divisible', function(dividend, divisor) {
  if (dividend == 0) return false;
  return ((dividend % divisor) == 0);
});