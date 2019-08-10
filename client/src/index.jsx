import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BlockPicker } from 'react-color'
import Item from './components/Item.jsx'
import ColorSelector from './components/ColorSelector.jsx'
import InputForm from './components/InputForm.jsx'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      completed: [],
      input: '',
      color: '#94E89E'
    }
    this.getTodos = this.getTodos.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.handleColorSelect = this.handleColorSelect.bind(this)
    this.markTodoComplete = this.markTodoComplete.bind(this)
    this.markTodoIncomplete = this.markTodoIncomplete.bind(this)
  }

  componentDidMount() {
    this.getTodos()
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    if(this.state.input !== '') {
      this.addTodo(this.state.input, this.state.color, () => {
        this.getTodos()
        this.setState({input: ''})
      })
    }
  }

  addTodo(description, color, callback) {
    let todo = {
      description: description,
      color: color
    }
    axios.post('/todos/', todo)
      .then(results => {
        callback()
      })
      .catch(err => {
        console.error('Could not submit todo.')
      })

  }

  markTodoComplete(id) {
    axios.put(`/todos/complete/${id}`)
      .then(results => {
        this.getTodos()
      })
      .catch(err => {
        console.error('Could not complete todo.')
      })
  }

  markTodoIncomplete(id) {
    axios.put(`/todos/incomplete/${id}`)
      .then(results => {

        this.getTodos()
      })
      .catch(err => {
        console.error('Could not revert todo.')
      })
  }

  deleteTodo(id) {
    axios.delete(`/todos/${id}`)
      .then(this.getTodos())
      .catch(err => {
        console.error('Could not delete todo.')
      })
  }

  handleColorSelect(e) {
    this.setState({color: e.hex})
  }

  getTodos() {
    axios.get('/todos/')
      .then(results => {

        let todos = results.data.filter(todo => !todo.completed)
        let completed = results.data.filter(todo => todo.completed)

        this.setState({todos: todos}, () => {
          this.setState({completed: completed})
        })
      })
      .catch(err => {
        console.error('Could not retrieve todos.')
      })
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