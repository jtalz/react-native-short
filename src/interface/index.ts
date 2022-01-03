import { ViewProps } from 'react-native'

type ShortViewProps = ViewProps & {
  shortstyle?: string
}

type ShortStyleContainerProps = {
  customshortstyles?: any
}

export { ShortViewProps, ShortStyleContainerProps }
