import React, {Component}  from 'react';
import './AddButton.css'

class TodoForm extends Component {
  
  state = {
    initialValue :''
  }

  handleInputChange = (e) => {
    this.setState({initialValue: e.target.value} , ()=> { this.sendData()})
  }

  sendData = () =>{
    const tasks = {
      title : this.state.initialValue,
      addedDate : new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      completed : false,
      id: new Date().getTime()
    }
    this.props.handleForm(tasks);
  }

  addTask = (e) => {
    e.preventDefault()
    this.props.handleSubmit();
    this.setState({
      initialValue :''
    })
  }
  render(){
    return ( 
        <form className="ui form">
          <div className="field" style={{display:'flex'}}>
            <input type="text" id="task" placeholder="Add tasks" value={this.state.initialValue} onChange={(e)=>this.handleInputChange(e)}/> 
            <div className={`ui bottom attached button ${this.props.disable ? 'disabled' : ''}`} onClick={(e)=>this.addTask(e)} >Submit</div>
          </div>
        </form>
    )
  }
}
export default TodoForm;