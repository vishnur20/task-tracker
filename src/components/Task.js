import React from "react";

import { FaTimes } from 'react-icons/fa';

const Task = (props) => {
    return (
        <div className={props.isReminderSet ? 'task reminder' : 'task'} onDoubleClick={()=>{props.onToggleReminder(props.task.id)}}>
            <h3>
                {props.task.text} 
                <FaTimes 
                    style={{color:'red', cursor:'pointer'}}  
                    onClick={()=>{props.onDelete(props.task.id)}} 
                />
            </h3>
            <small>{props.task.day}</small>
        </div>
    );
}

export default Task;