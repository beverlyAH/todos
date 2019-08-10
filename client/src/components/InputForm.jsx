import React from 'react'

const InputForm = (props) => {

  const { input } = props

  return (

    <React.Fragment>

      <input type="text" value={input}
        maxLength="500"
        placeholder="what do we need to do?"
        onChange={props.change} />

      <input type="submit" value="add" onClick={props.submit} />

    </React.Fragment>
    
  )
}

export default InputForm