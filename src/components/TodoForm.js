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
      <div>
        <form className="ui form">
          <div className="field">
            <input type="text" id="task" placeholder="Add tasks" value={this.state.initialValue} onChange={(e)=>this.handleInputChange(e)}/> 
          </div>
        </form>
        <div className="btn-position" style={{paddingTop:'30px'}}>
          {this.props.disable ? <div className="ui bottom disabled attached button" onClick={(e)=>this.addTask(e)} >
              Add 
              </div>:<div className="ui bottom attached button" onClick={(e)=>this.addTask(e)} >
              Add 
              </div>}
        </div> 
      </div>
    )

  }
  
}
export default TodoForm;