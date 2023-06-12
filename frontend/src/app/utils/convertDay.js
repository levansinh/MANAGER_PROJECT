function convertToDay(dateString) {
  const date = new Date(dateString);

  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default convertToDay
