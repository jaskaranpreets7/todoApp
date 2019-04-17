import React from 'react';
import './TodoList.css'

const TodoList = (props) =>{

  const handleDelete = (key) =>{
    props.deleteTask(key)
  }
  const handleCheck = (key) => {
    props.handleCheck(key)
  }

  const list = () => {

    if(!props.tasks){
      return <div style={{textAlign: 'center'}}>Add Some Task</div>
    }else{
      return Object.keys(props.tasks).map((fKey)=>{
      const val = props.tasks[fKey];
      return (
        <div className="item" key={val.id}>
          <div className="right floated content">
            <div className="ui icon button"  onClick={() => handleDelete(fKey)}>
              <i className="trash icon "></i>
            </div>
          </div>
          <div className="left floated content">
            <label className="cont">
                <input type="checkbox"  onClick={() => handleCheck(fKey)} defaultChecked={val.completed}/>
                <span className="checkmark"></span>
            </label>
          </div>
          <div className="content">
            <div className="header">
              {(val.completed)? 
                    <div className="checkedText">{val.title}</div> : <div className="uncheckedText">{val.title}</div>
              }</div>
            <div className="description">Added {val.addedDate}</div>
          </div>
        </div>
       )
      })
    }
    
  };

  return ( 
    <div className="ui relaxed divided list">
      {list()}
    </div>
  )
}
export default TodoList;