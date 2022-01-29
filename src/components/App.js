import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from './Header';
import AddForm from './AddForm';
import TaskList from './TaskList';
import Footer from './Footer';
import About from './About';

class App extends React.Component {
    state = {
        tasks: [],
        isAddFormShow: false
    };

    componentDidMount = async () => {
        await fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    tasks: data
                });
            });
    }

    deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        });

        this.setState(()=>{
            let updatedTasks = this.state.tasks.filter((task) => {
                if(task.id === id)
                    return null;
                return task;
            });

            return ({
                ...this.state,
                tasks: updatedTasks
            });
        });
    }

    toggleReminder = async (id) => {
        /* updating the UI and DB separately */

        // fetching the particular task form DB
        let updatedTask;
        await fetch(`http://localhost:5000/tasks/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                updatedTask = {
                    ...data,
                    reminder: !data.reminder
                };
            });      

        // updating the task in the DB with the updated task
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
            
        // updating the UI
        this.setState((preState) => {
            let updatedTasks = this.state.tasks.map((task) => {
                if(task.id === id) {
                    return {
                        ...task,
                        reminder: !task.reminder
                    };
                }
                return task;
            });
            return {
                ...preState,
                tasks: updatedTasks
            };
        });
    }

    toggleShow = () => {
        this.setState((preState) => {
            return ({
                ...preState,
                isAddFormShow: !preState.isAddFormShow
            });
        });
    }

    saveTask = async (newTask) => {
        await fetch(`http://localhost:5000/tasks`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(response => response.json())
            .then(data => {
                this.setState((preState) => {
                    return ({
                        ...preState,
                        tasks: [
                            data,
                            ...this.state.tasks
                        ]
                    });
                });
            });
        
    }

    render() {
        return (
            
            <div className='container'>
                <Header 
                    isAddFormShow={this.state.isAddFormShow} 
                    onToggleForm={this.toggleShow}
                />

                <Router>
                    <Routes>                        
                        <Route exact path='/' element={
                            <>
                                <AddForm 
                                    onSave={this.saveTask} 
                                    isAddFormShow={this.state.isAddFormShow} 
                                />
                                <TaskList tasks={this.state.tasks} 
                                    onDelete={this.deleteTask} 
                                    onToggleReminder={this.toggleReminder}
                                />
                            </>
                        } />

                        <Route exact path='/about' element={<About />} />
                    </Routes>

                    <Footer />
                </Router>
            </div>
            
        );
    }
}

export default App;