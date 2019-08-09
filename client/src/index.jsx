import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { FiXCircle, FiPlusCircle, FiCheckCircle } from 'react-icons/fi'
import { BlockPicker } from 'react-color'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      completed: [],
      input: '',
      color: '#ff8c70'
    }
    this.getTodos = this.getTodos.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.handleColorSelect = this.handleColorSelect.bind(this)
  }

  componentDidMount() {
    this.getTodos()
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    if(!this.state.input) {
      return
    }
    this.addTodo(this.state.input, this.state.color, () => {
      this.setState({input: ''}, () => {
        this.getTodos()
      })
    })
  }

  addTodo(description, color, callback) {
    let todo = {
      description: description,
      color: color
    }
    axios.post('/todos/', todo)
    .then(callback())
    .catch(err => {
      console.log('error occurred submitting todo!')
    })

  }

  markTodoComplete(id) {
    axios.put(`/todos/complete/${id}`)
      .then(results => {
        this.getTodos()
      })
      .catch(err => {
        console.log('error marking todo complete')
      })
  }

  markTodoIncomplete(id) {
    axios.put(`/todos/incomplete/${id}`)
      .then(this.getTodos())
      .catch(err => {
        console.log('error marking todo incomplete')
      })
  }

  deleteTodo(id) {
    axios.delete(`/todos/${id}`)
      .then(this.getTodos())
      .catch(err => {
        console.log('error deleting todo')
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
        console.log('error occurred retrieving todos')
      })
  }

  render() {
    return (
      <div className="wrapper">

        <div className="input_wrapper">
          <input type="text" value={this.state.input}
          placeholder="what do we need to do?"
          onChange={this.handleChange.bind(this)} />

          <input type="submit" value="add" onClick={this.handleSubmit.bind(this)} />

          <BlockPicker className="color_select" onChange={this.handleColorSelect}
          color={this.state.color} triangle="hide"
          width="20rem"
          colors={['#FF8C70', '#FFEF89', '#94E89E', '#A6F3F4', '#CF95DB']} />
        </div>

        <div className="todos">

          <h2>TO DO: </h2>

          {this.state.todos && this.state.todos.map(item => {
            return (
              <ul className="item" key={item.id} style={{backgroundColor: item.color}}>
              {item.description}
              <FiXCircle className="close" onClick={()=>{this.deleteTodo(item.id)}} />
              <FiCheckCircle className="check" onClick={()=>this.markTodoComplete(item.id)} />
              </ul>
              )
          })}

          <h2>COMPLETED: </h2>

          {this.state.completed && this.state.completed.map(item => {
            return (
              <ul className="item" key={item.id} style={{backgroundColor: item.color}}>
              {item.description}
              <FiXCircle className="close" onClick={()=>{this.deleteTodo(item.id)}} />
              <FiCheckCircle className="check" onClick={()=>this.markTodoIncomplete(item.id)} /></ul>
            )
            })}
        </div>

      </div>
    )
  }
}

ReactDOM.render(<Todo />, document.getElementById('todo'))