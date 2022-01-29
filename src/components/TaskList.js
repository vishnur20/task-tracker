import React from "react";

import Task from './Task';

const TaskList = (props) => {
    const taskListComponents = props.tasks.map((task) => {
        return (
            <Task 
                key={task.id} 
                task={task} 
                onDelete={props.onDelete} 
                onToggleReminder={props.onToggleReminder}
                isReminderSet={task.reminder}
            />
        );
    });

    if(props.tasks.length > 0) {
        return (
            <div>
                {taskListComponents}
            </div>
        );
    }
    else {
        return (
            <div>
                <h3>No tasks available</h3>
            </div>
        );
    }
}

export default TaskList;




