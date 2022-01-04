<img src="https://github.com/jtalz/react-native-short/blob/master/src/assets/logo.svg?sanitize=true" width="300" />

# react-native-short
A react-native library designed to streamline UI implementation. 

## Table of contents
- [react-native-short](#react-native-short)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Quick start](#quick-start)
  - [Usage](#usage)
    - [shortstyle](#shortstyle)
  - [Components](#components)
    - [Row](#row)
      - [use case](#use-case)
    - [Column](#column)
      - [use case](#use-case-1)
    - [ShortStyleContainer (required)](#shortstylecontainer-required)
      - [use case](#use-case-2)
      - [CustomShortStyles](#customshortstyles)
      - [DefaultShortStyles](#defaultshortstyles)
  - [Shortstyle reference guide](#shortstyle-reference-guide)
    - [Literary pairs](#literary-pairs)
    - [Numerical pairs](#numerical-pairs)
    - [Combinatory pairs](#combinatory-pairs)
    - [Full table](#full-table)
      - [Literary:](#literary)
      - [Numeric](#numeric)
      - [Combinatory](#combinatory)
    - [Tips and tricks](#tips-and-tricks)
      - [Template literals](#template-literals)
      - [Sizing](#sizing)
      - [Wrappers and containers](#wrappers-and-containers)
    - [Motivation](#motivation)
    - [Contributing](#contributing)
## Installation
Add `react-native-short` to your expo or bare react native project:

```
yarn add react-native-short
npm install react-native-short
expo install react-native-short
```

## Quick start
Use `react-native-short` in your code like so:
```
import { ShortStyleContainer, Row, Column } from 'react-native-short'

// First wrap your app with ShortStyleContainer

<ShortStyleContainer>
  <App />
</ShortStyleContainer>

// Then use Row's and Columns to your liking!

<Row shortstyle='h50 w100 br10 phL bw1'>{children}</Row>
```

## Usage
`react-native-short` exposes 3 react-native components. The most crucial are `Row` and `Column`. They're unique because they accept a `shortstyle` prop. Before moving on, let's review what a `shortstyle` is. 

### shortstyle
A `shortstyle` is essentially a string to be converted into a style object upon rendering. In other words, it can be used to style components more quickly during development and with less code. Let's look at an example.

Suppose we're creating some component similar to this one:  

<img src="https://user-images.githubusercontent.com/31594943/147765961-30f4cb2f-361e-4778-a4f4-3df47a2de1c3.png" width="400" />


Using traditional react-native implementation, we might write it like so: 
```
import { View, Text } from 'react-native'

const Item = () => (
  <View style={{ 
    flexDirection: 'row', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    justifyContent: 'space-between', 
    width: 300, 
    height: 50, 
    }}
  >
    <View style={{ 
      flexDirection: 'column', 
      justifyContent: 'flex-start', 
      alignItems: 'flex-start' 
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginRight: 10 }}>Sports</Text>
        <Text>- Live</Text>
      </View>
      <Text>Fans wish Lebron James a happy birthday</Text>
    </View>
    <View style={{ height: '100%' }}>
      <ListImage ... />
    </View>
  </View>
)
```

However, using react-native-short we could speed up the writing process, minimize the code load, and still understand what we've written like so: 
```
import { Row, Column, Text } from 'react-native-short'

const Item = () => (
  <Row shortstyle='ph15 pv10 jcBtwn w300 h50'>
    <Column shortstyle='jcStart aiStart'>
      <Row>
        <Text style={{ marginRight: 10 }}>Sports</Text>
        <Text>- Live</Text>
      </Row>
      <Text>Fans wish Lebron James a happy birthday</Text>
    </Column>
    <Column shortstyle='hFull'>
      <ListImage ... />
    </Column>
  </Row>
)
```

Did you catch that?

```
'ph15 pv10 jcBtwn w300 h50'
```
becomes
```
{ paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'space-between', width: 300, height: 50 }
```

Note: Refer to [Shortstyle Reference Guide](#shortstyle-reference-guide) for a full reference on how to *shortstyle* components

## Components

### Row 
A component that inherets properties from `View` and also accepts a `shortstyle` prop. It's `flex-direction` is inherently set to `row`.
#### use case
```
import { Row } from 'react-native-short'

const Button = ({ name, icon }) => {
  return (
    <Pressable>
      <Row shortstyle="w100 h50 bcBlue br10 bw1 bocWhite">
        <Text>{ name }</Text>
        <Icon source={icon} />
      </Row>
    </Pressable>
  )
}
```


### Column
A component that inherets properties from `View` and also accepts a `shortstyle` prop. It's `flex-direction` is inherently set to `column`.
#### use case
```
import { Column } from 'react-native-short'

const Card = ({ name, icon, width }) => {
  return (
    <Pressable>
      <Column shortstyle={`h30 w${width} bcBlue bw1 br10`}>
        <Text>{ name }</Text>
        <Icon source={icon} />
      </Column>
    </Pressable>
  )
}
```
Note: `shortstyle` works with template literals



### ShortStyleContainer (required)
Wrap your app or other container with `ShortStyleContainer` in order to begin using `Column` and `Row` within it. This declares any custom and/or default shortstyle values to be used within. It's useful for setting things like sizing patterns.

#### use case
```
import { ShortStyleContainer } from 'react-native-short'

const customshortstyles = {
  XS: 10,
  S: 15,
  M: 20,
  L: 25,
  XL: 30,
  Full: '100%',
  Half: '50%',
  Q: '25%'
}

const App = () => {
  <ShortStyleContainer { ...{ customshortstyles } } >
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  </ShortStyleContainer>
}
```

#### CustomShortStyles

[`ShortStyleContainer`](#shortstylecontainer-(required)) accepts a prop called `customshortstyles`. 

This should be an object and is a useful opportunity to set theme-like values such as sizes like `XXS, XS, S, M...`. Although, you may set it as anything you like. These may be used later in any
type of key/value pairs. 

**Note: All keys MUST begin with a capital letter or they wont work!**

#### DefaultShortStyles
The package starts out with some default shortstyles which can be used right away.

```
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
  XXL: 35
}
```

## Shortstyle reference guide

As mentioned above, *a shortstyle is essentially a string to be converted into a style object upon rendering*. 

Intuitive style key/value pairs are found within a `shortstyle` string and should be implemented in the following manner:
```
keyValue
```

There are 3 different types of keyValue pairs: Literary, Numerical, and Combinatory.

### Literary pairs

Literary pairs reference react-native styles that accept **only** a string value (ex. `justifyContent`, `alignItems`, `position`...). 

They rely on camelCase and can be used in one of two ways:

1. Using custom values defined in [Default short styles](#defaultshortstyles) or [Custom short styles](#customshortstyles).

    ```
    "jcBtwn" becomes { justifyContent: 'space-between' }
    "aiCenter"
    "posAbs"
    ```
2. Using any string value deemed acceptabled by react-native for that style property.
    ```
    "bcRed" becomes { backgroundColor: 'red' }
    "fwWrap" becomes { flexWrap: 'wrap' }
    ```
    Note: the first letter of the string value becomes lowercase upon rendering so 'Red' → 'red' and 'Wrap' → 'wrap' 

### Numerical pairs

Numerical pairs reference react-native styles that accept **only** number values (ex. `flex`, `fontSize`...)

They can be used in one of two ways:

1. Using numbers following their `shortstyle` key.  
   
    ```
    "f1"
    "fs20"
    ```

2. Using custom values defined in [Default short styles](#defaultshortstyles) or [Custom short styles](#customshortstyles) that represent a numerical value.
    ```
    "fsL"
    "fsS"
    ```

### Combinatory pairs

Combinatory pairs are the most common and reference react-native styles that accept **both** number and string values (`width`, `height`, `margin`, `top`, `borderWidth`...)

They can be used in one of two ways:

1. Using numbers or any string value deemed acceptabled by react-native for that style property following their `shortstyle` key
   
    ```
    "w500" becomes { width: 500 }
    "w50%" becomes { width: '50%' }
    "m30"
    "bw1"
    "bwThick"
    ```
2. Using custom values defined in [Default short styles](#defaultshortstyles) or [Custom short styles](#customshortstyles).
   
    ```
    "mL"
    "phXXS"
    "wFull"
    ```

Note: Number and Combinatory pairs also accept minus '-' signs and decimals '.' 

### Full table
Below is a table of all the `shortstyle` keys available for use. 

#### Literary:
| key | style property |
|----|----------------|
| ac | alignContent |
| ai | alignItems |
| as | alignSelf |
| bc | backgroundColor |
| boc | borderColor |
| d | display |
| dir | direction |
| fd | flexDirection |
| fw | flexWrap |
| he | height |
| jc | justifyContent |
| of | overflow |
| pos | position |
| wi | width |

#### Numeric
| key | style property |
|----|----------------|
| ar | aspectRatio |
| bblr | borderBottomLeftRadius |
| bbrr | borderBottomRightRadius |
| bbw | borderBottomWidth |
| bew | borderEndWidth |
| blw | borderLeftWidth |
| br | borderRadius |
| brw | borderRightWidth |
| bsw | borderStartWidth |
| btlr | borderTopLeftRadius |
| btrr | borderTopRightRadius |
| btw | borderTopWidth |
| bw | borderWidth |
| e | elevation |
| f | flex |
| fg | flexGrow |
| fs | flexShrink |
| z | zIndex |

#### Combinatory
| key | style property |
|----|----------------|
| b | bottom |
| en | end |
| fb | flexBasis |
| h | height |
| l | left |
| m | margin |
| maxh | maxHeight |
| maxW | maxWidth |
| mb | marginBottom |
| mh | marginHorizontal |
| minH | minHeight |
| minW | minWidth |
| ml | marginLeft |
| mr | marginRight |
| ms | marginStart |
| mt | marginTop |
| mv | marginVertical |
| o | opacity |
| p | padding |
| pb | paddingBottom |
| ph | paddingHorizontal |
| pl | paddingLeft |
| pr | paddingRight |
| pt | paddingTop |
| pv | paddingVertical |
| r | right |
| t | top |
| w | width |


### Tips and tricks

#### Template literals

#### Sizing

#### Wrappers and containers
### Motivation
The motive behind react-native short is to reduce time spent on writing out style objects. 

### Contributing
Please reach out to me at josh.tal27@gmail.com if you're interested in contributing to this project.