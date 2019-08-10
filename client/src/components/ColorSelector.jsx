import React from 'react'
import { BlockPicker } from 'react-color'

const ColorSelector = (props) => {

  const { currentColor } = props

  return (

    <BlockPicker
      className="color_select"
      onChange={props.change}
      color={currentColor}
      triangle="hide"
      width="20rem"
      colors={['#FF8C70', '#FFEF89', '#94E89E', '#A6F3F4', '#CF95DB', '#C3C3C3']} />
      
  )
}

export default ColorSelector