import { get, has, isEmpty, isNil } from 'lodash'
import { StyleProp, ViewStyle } from 'react-native';

const fromEntries = (arr: any[]) => {
  return arr.reduce(function (acc, curr) {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});
};

const shortstylekeys = {
  numerics: {
    ar: 'aspectRatio',
    bblr: 'borderBottomLeftRadius',
    bbrr: 'borderBottomRightRadius',
    bbw: 'borderBottomWidth',
    bew: 'borderEndWidth',
    blw: 'borderLeftWidth',
    br: 'borderRadius',
    brw: 'borderRightWidth',
    bsw: 'borderStartWidth',
    btlr: 'borderTopLeftRadius',
    btrr: 'borderTopRightRadius',
    btw: 'borderTopWidth',
    bw: 'borderWidth',
    e: 'elevation',
    f: 'flex',
    fg: 'flexGrow',
    fs: 'flexShrink',
    z: 'zIndex',
  },
  literary: {
    ac: 'alignContent',
    ai: 'alignItems',
    as: 'alignSelf',
    bc: 'backgroundColor',
    boc: 'borderColor',
    d: 'display',
    dir: 'direction',
    fd: 'flexDirection',
    fw: 'flexWrap',
    he: 'height',
    jc: 'justifyContent',
    of: 'overflow',
    pos: 'position',
    wi: 'width',
  },
  combinatory: {
    b: 'bottom',
    en: 'end',
    fb: 'flexBasis',
    h: 'height',
    l: 'left',
    m: 'margin',
    maxh: 'maxHeight',
    maxW: 'maxWidth',
    mb: 'marginBottom',
    mh: 'marginHorizontal',
    minH: 'minHeight',
    minW: 'minWidth',
    ml: 'marginLeft',
    mr: 'marginRight',
    ms: 'marginStart',
    mt: 'marginTop',
    mv: 'marginVertical',
    o: 'opacity',
    p: 'padding',
    pb: 'paddingBottom',
    ph: 'paddingHorizontal',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    pt: 'paddingTop',
    pv: 'paddingVertical',
    r: 'right',
    t: 'top',
    w: 'width',
  }
}

/**
 * Converts a string into a style object
 * @param bootstrap
 * @returns {StyleProp<ViewStyle>} a literal object containing react-native style key/value pairs
 *
 * Notes: Some style properties such as "width" and "height" may be seperated into both numeric (w) and literary (wi) objects until a better solution is found. This is because these properties can accept both numbers and strings. Example: { width: 100 } and { width: '100%' } would be expressed as 'w100' and 'wi100%' accordingly.
 */
const convertshortstyles = (shortstylevalues: any) => (shortstyle?: string): StyleProp<ViewStyle> => {
  if (isEmpty(shortstyle) || isNil(shortstyle)) {
    return {}
  }
  const styles = shortstyle.split(' ').reduce((acc, style, i) => {
    // get everything that's NOT lowercase until the first non-lowercase-letter character
    const styleKey = get(style.match(/[a-z]*/), '[0]', '')

    // get everything after the first group of lowercase letters
    const styleValue = get(style.match(/[^a-z].*$/), '[0]', '')

    // if a shortstylevalues key was provided as a value such as Around(space-around) or L(25)
    if (has(shortstylevalues, styleValue)) {
      const entries = [[shortstylekeys.numerics[styleKey] || shortstylekeys.combinatory[styleKey] || shortstylekeys.literary[styleKey], shortstylevalues[styleValue]]]
      return { ...acc, ...fromEntries(entries), }
    }

    // if a combinatory key such as jc(justifyContent) or pos(Position) was provided
    if (has(shortstylekeys.combinatory, styleKey)) {
      const entries = [[shortstylekeys.combinatory[styleKey], isNaN(styleValue) ? styleValue.toLowerCase() : parseFloat(styleValue)]]
      return { ...acc, ...fromEntries(entries), }
    }

    // if a numerical key such as p(Padding) or w(Width) was provided
    if (has(shortstylekeys.numerics, styleKey)) {
      const entries = [[shortstylekeys.numerics[styleKey], parseFloat(styleValue)]]
      return { ...acc, ...fromEntries(entries), }
    }

    // if a literary key such as jc(justifyContent) or pos(Position) was provided
    if (has(shortstylekeys.literary, styleKey)) {
      const entries = [[shortstylekeys.literary[styleKey], styleValue.toLowerCase()]]
      return { ...acc, ...fromEntries(entries), }
    }

    return acc;
  }, {})
  return styles;
}

export { convertshortstyles, shortstylekeys }
