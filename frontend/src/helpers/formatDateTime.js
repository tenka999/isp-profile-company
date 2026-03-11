function formatDateTime(isoString) {
  const date = new Date(isoString);
  // Format: yyyy-mm-dd hh:mm:ss
  return date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default formatDateTime;