import React from 'react'
import ReactDOM from 'react-dom'

class Todo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>HELLO WORLD</div>
    )
  }
}

ReactDOM.render(<Todo />, document.getElementById('todo'))