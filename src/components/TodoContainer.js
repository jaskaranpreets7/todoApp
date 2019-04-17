import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import firebase from 'firebase';
import { DB_CONFIG } from '../firebase';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      disable : true,
    };
    this.obj = [];
  }
  
  componentDidMount(){
    this.getTodoList();
    firebase.initializeApp(DB_CONFIG);
    this.realTimeUpdate()
  }

  getTodoList = async () => {
    await axios.get("https://todolist-1dbbf.firebaseio.com/data.json")
      .then( response => {
        this.setState({
          tasks: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleForm = (data) => {
  
    if(data.title.length >=1){
      this.setState({
        disable : false,
      })
    }else{
      this.setState({
        disable : true
      })
    }
    this.obj = data;
  }
 
  handleSubmit = async () => {
    if(!this.state.disable){
      if(this.obj){
        await axios.post("https://todolist-1dbbf.firebaseio.com/data.json", this.obj)
      }
    }
    this.setState({
      disable: true
    })
  }


  realTimeUpdate = () =>{
    const database = firebase.database();
    const ref = database.ref('data');
    ref.on('value', (snapshot) => {
      const taskList = snapshot.val();
      this.setState({
        tasks: taskList
      })
    })
  }

  deleteTask = async(key) => {
    await axios.delete(`https://todolist-1dbbf.firebaseio.com/data/${key}.json`)
  }

  handleCheck = async(key) => {
    const {tasks} = this.state;
    const newObj = {...tasks};
    for(let i in newObj){
      if( i === key){
        let obj = newObj[i]
        obj['completed'] = !newObj[i].completed;
      }
    }
    await axios.put(`https://todolist-1dbbf.firebaseio.com/data.json`,newObj)
  }


  render() {

    const {tasks} = this.state;
    const title = "Todo's";

    return (
      <div className="ui container">
        <div className="ui menu item" style={{marginTop:'5px',marginBottom:'10px'}}>
          <div className="item active"><span><i><b>{title}</b></i></span></div>
        </div>
        <br/>
        <div>
          <TodoForm  handleForm={this.handleForm}  disable={this.state.disable} handleSubmit={this.handleSubmit} />
        </div>
        <br/>
        <div>
          <TodoList tasks={tasks} deleteTask={this.deleteTask} handleCheck={this.handleCheck}/>
        </div>
      </div>
    );
  }
}

export default App;
