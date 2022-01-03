import * as React from 'react'
import { View } from 'react-native'
import { ShortViewProps } from '../interface'
import { convertshortstyles } from '../scripts/convertshortstyles'
import { defaultshortstyles } from '../styles/defaults'
import { ShortStyleContext } from './shortstylecontainer'


const Column: React.FC<ShortViewProps> = (props) => {

  const { shortstyles } = React.useContext(ShortStyleContext)

  return (
    <View style={[{ flexDirection: 'column' }, convertshortstyles(shortstyles)(props.shortstyle)]} {...{ ...props }}>
      { props.children }
    </View>
  )
}

export { Column }
