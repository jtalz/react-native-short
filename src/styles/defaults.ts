import { Dimensions } from "react-native"

const defaultshortstyles = {
  Around: 'space-around',
  Center: 'center',
  Btwn: 'space-between',
  Start: 'flex-start',
  End: 'flex-end',
  Abs: 'absolute',
  Full: '100%',
  Sh: Dimensions.get('screen').height,
  Sw: Dimensions.get('screen').width,
  XXS: 5,
  XS: 10,
  S: 15,
  M: 20,
  L: 25,
  XL: 30,
  XXL: 35,
}

export { defaultshortstyles }