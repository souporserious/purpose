import purpose from './purpose'
import { Container, Media } from './react-matches'
import htmlTagNames from 'html-tag-names'
import svgTagNames from 'svg-tag-names'

const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1)
const domElements = htmlTagNames
  .concat(svgTagNames)
  .filter((tag, index, array) => array.indexOf(tag) === index)

/*
 * repurposed from Glamorous:
 * https://github.com/paypal/glamorous/blob/master/src/index.js#L26-L45
 *
 * This creates a purpose component for each DOM element so you can simply do:
 * <purpose.Div
 *   css={{
 *     color: 'green'
 *   }}
 * >
 *   I'm green!
 * </purpose.Div>
 *
 */
Object.assign(
  purpose,
  domElements.reduce((components, tag) => {
    const capitalTag = capitalize(tag)
    components[capitalTag] = purpose(tag)()
    components[capitalTag].displayName = `purpose.${capitalTag}`
    return components
  }, {})
)

export { purpose as default, Container, Media }
