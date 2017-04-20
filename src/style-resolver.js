export const UNIQUE_KEY = '__style__'

export default function styleResolver(stylesToParse, theme) {
  return Object.keys(stylesToParse).reduce((parsedStyles, key) => {
    const value = stylesToParse[key]

    // spread styles over parsedStyles if key is coming from matchesMedia or matchesContainer
    if (key.indexOf(UNIQUE_KEY) > -1) {
      return { ...parsedStyles, ...styleResolver(value, theme) }
    }

    // we just skip over this rule and move onto the next if key is false
    if (key === 'false') {
      return parsedStyles
    }

    // take care of nested styles
    if (/^:/.test(key) || /^@/.test(key)) {
      return { ...parsedStyles, [key]: styleResolver(value, theme) }
    }

    // if we made it this far just pass the style through
    return { ...parsedStyles, [key]: value }
  }, {})
}
