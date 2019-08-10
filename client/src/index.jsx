import React from 'react'
import ReactDOM from 'react-dom'
import Item from './components/Item.jsx'
import ColorSelector from './components/ColorSelector.jsx'
import InputForm from './components/InputForm.jsx'
import uuidv4 from 'uuid'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      completed: [],
      input: '',
      color: '#94E89E'
    }
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.handleColorSelect = this.handleColorSelect.bind(this)
    this.markTodoComplete = this.markTodoComplete.bind(this)
    this.markTodoIncomplete = this.markTodoIncomplete.bind(this)
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    if(this.state.input !== '') {
      this.addTodo(this.state.input, this.state.color, () => {
        this.setState({input: ''})
      })
    }
  }

  addTodo(description, color, callback) {
    let item = {
      id: uuidv4(),
      description: description,
      color: color, 
      completed: false
    }
    let todos = this.state.todos.slice()
    todos.push(item)
    this.setState({todos: todos})
    callback()
  }

  markTodoComplete(id) {
    let todos = this.state.todos.slice()
    let completed = this.state.completed.slice()
    for (let i = 0; i < todos.length; i++) {
      if(todos[i].id === id) {
        let temp = todos[i]
        temp.completed = true
        todos.splice(i, 1)
        completed.push(temp)
        break
      }
    }
    this.setState({todos: todos}, () => {
      this.setState({completed: completed})
    })
  }

  markTodoIncomplete(id) {
    let todos = this.state.todos.slice()
    let completed = this.state.completed.slice()
    for (let i = 0; i < completed.length; i++) {
      if(completed[i].id === id) {
        let temp = completed[i]
        temp.completed = false
        completed.splice(i, 1)
        todos.push(temp)
        break
      }
    }
    this.setState({completed: completed}, () => {
      this.setState({todos: todos})
    })
  }

  deleteTodo(completed, id) {
    if(completed) {
      let completed = this.state.completed.slice()
      for(let i = 0; i < completed.length; i++) {
        if(completed[i].id === id) {
          completed.splice(i, 1)
          break
        }
      }
      this.setState({completed: completed})
    } else {
      let todos = this.state.todos.slice()
      for (let i = 0; i < todos.length; i++) {
        if(todos[i].id === id) {
          todos.splice(i, 1)
          break
        }
      }
      this.setState({todos: todos})
    }
  }

  handleColorSelect(e) {
    this.setState({color: e.hex})
  }

  render() {
    return (
      <div className="wrapper">
    
        <div className="input_wrapper">
        <h1>let's do this</h1>
          <InputForm 
            input={this.state.input} 
            submit={this.handleSubmit.bind(this)}
            change={this.handleChange.bind(this)} />
          <ColorSelector
            currentColor={this.state.color}
            change={this.handleColorSelect} />
        </div>

        <div className="todos">

          <h2>TO DO: </h2>

          { this.state.todos && this.state.todos.length !== 0 ? 
              this.state.todos.map(item => {
                return (
                  <Item item={item} key={item.id}
                  delete={this.deleteTodo} 
                  complete={this.markTodoComplete}
                  incomplete={this.markTodoIncomplete} />
                )
              })  :  <p>Nothing to do! Lucky you!</p> }

          <h2>COMPLETED: </h2>

          { this.state.completed && this.state.completed.length !== 0 ?
              this.state.completed.map(item => {
                return (
                  <Item item={item} key={item.id}
                  delete={this.deleteTodo} 
                  complete={this.markTodoComplete}
                  incomplete={this.markTodoIncomplete} />
                )
              })  : <p>Nothing's done? Add some tasks to get started.</p> }
        </div>

      </div>
    )
  }
}

ReactDOM.render(<Todo />, document.getElementById('todo'))