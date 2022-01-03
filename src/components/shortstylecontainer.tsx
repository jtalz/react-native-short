import * as React from 'react'
import { ShortStyleContainerProps } from '../interface'
import { defaultshortstyles } from '../styles/defaults'

const ShortStyleContext = React.createContext({
  shortstyles: defaultshortstyles
})

const ShortStyleContainer: React.FC<ShortStyleContainerProps> = ({
  customshortstyles = {},
  children
}) => {
  return (
    <ShortStyleContext.Provider
      value={{ shortstyles: { ...defaultshortstyles, ...customshortstyles } }}
    >
      {children}
    </ShortStyleContext.Provider>
  )
}

export { ShortStyleContainer, ShortStyleContext }
