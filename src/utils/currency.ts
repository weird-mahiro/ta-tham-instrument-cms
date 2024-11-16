const PRICE_REGEX = /[^0-9]/g

const TEST_PRICE_REGEX = /^\d+$/

export const validatePriceString = (str: string) => {
  if (!str || !TEST_PRICE_REGEX.test(str) || Number(str) <= 0) {
    return false
  }
  return true
}

export const cleanedFormat = (str: string) => {
  if (!str) {
    return ''
  }
  return str.replace(PRICE_REGEX, '')
}

export const VNDFormat = (str: string) => {
  return Number(cleanedFormat(str)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
