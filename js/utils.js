export function formatDate(date) {
    return new Date(date).toLocaleString('en-UK', {
      timeZone: "GMT",
    })
}

export function formatTitle(title) {
    return `${title.charAt(0).toUpperCase()}${title.slice(1)}.`
}