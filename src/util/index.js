export default function encodeUrlParams(data) {
  return Object.keys(data)
    .map(key => {
      return [key, data[key]].map(encodeURIComponent).join("=");
    })
    .join("&");
}
