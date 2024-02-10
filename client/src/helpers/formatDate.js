function formatDate(dateJSON, month = "long") {
  const date = new Date(dateJSON);
  const options = {
    year: "numeric",
    month: month,
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en", options);
}

export default formatDate;
