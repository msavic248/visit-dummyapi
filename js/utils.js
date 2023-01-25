export function formatDate(date) {
    return new Date(date).toLocaleString('en-UK', {
      timeZone: "GMT",
    })
}

export function formatTitle(title) {
    return `${title.charAt(0).toUpperCase()}${title.slice(1)}.`
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}