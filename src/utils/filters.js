const sizes = {
  kiB: 1000,
  MB: 1000000,
  GB: 1000000000,
}
function getSizeFactor(size) {
  if (size >= sizes.GB) {
    return [sizes.GB, 'GB']
  } else if (size >= sizes.MB) {
    return [sizes.MB, 'MB']
  } else if (size >= sizes.kiB) {
    return [sizes.kiB, 'kiB']
  } else {
    return [1, 'B']
  }
}
const defaultSize = [1000, 'kiB']

export function size(v, unit = 'auto') {
  const [factor, text] = unit === 'auto' ? getSizeFactor(v) : defaultSize
  return `${Math.round((v / factor) * 100, 2) / 100} ${text}`
}

export function shorten(text = '', maxlen = 20, points = true) {
  if (typeof text !== 'string') return ''

  text = text.slice(0, maxlen)

  return points ? `${text}...` : text
}
