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

export function shorten(_text = '', maxlen = 50, points = true) {
  if (typeof _text !== 'string') return ''

  const text = _text.slice(0, maxlen)

  return points && text !== _text ? `${text}...` : text
}
