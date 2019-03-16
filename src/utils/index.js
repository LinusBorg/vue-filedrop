export const PROVIDE_KEY = '__vueFiledrop__'

const READ_AS_VALUES = ['ArrayBuffer', 'BinaryString', 'DataURL', 'Text']

export function validateReadAs(v) {
  const isValid = READ_AS_VALUES.includes(v)
  if (!isValid)
    console.warn(
      `[vue-droparea: ${v} is not a valid value for the 'readAs' prop.`
    )
  return isValid
}

export function processFiles(files, readAs = 'BinaryString') {
  if (!validateReadAs(readAs)) {
    throw new Error(`[vue-filedrop]: ${readAs} is not a valid FileReader mode.
  Expected one of ['ArrayBuffer', 'BinaryString', 'DataURL', 'Text']
    `)
  }

  const promises = [...files].map(file => {
    return readFile(file, readAs)
  })
  return Promise.all(promises)
}

function readFile(file, readAs) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = reject
    reader.onload = () => {
      resolve({
        name: file.name,
        size: file.size,
        type: file.type,
        data: reader.result,
      })
    }

    reader[`readAs${readAs}`](file)
  })
}

export function pick(object, keys = []) {
  return keys.reduce((acc, key) => {
    acc[key] = object[key]
    return acc
  }, {})
}
