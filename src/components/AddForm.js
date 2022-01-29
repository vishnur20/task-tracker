import React from 'react';

class AddForm extends React.Component {
    state = {
        id: Math.floor(Math.random() * 1000),
        text: '',
        day: '',
        reminder: false
    };

    handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        if(type === 'checkbox') {
            this.setState((preState) => {
                return ({
                    ...preState,
                    [name]: checked
                });                
            });
        }
        else {
            this.setState((preState) => {
                return ({
                    ...preState,
                    [name]: value
                });
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.text === '') {
            alert('Please, fill the task field');
            return;
        }

        let newTask = this.state;
        this.props.onSave(newTask);

        // resetting add-form state
        this.setState({
            id: Math.floor(Math.random() * 1000),
            text: '',
            day: '',
            reminder: false
        });
    }

    render() {
        if(!this.props.isAddFormShow){
            return <></>;
        }
        return (
            <form onSubmit={this.handleSubmit} className='add-form'>
                <div className='form-control'>
                    <label>Text:</label>
                    <input 
                        type='text' 
                        name='text'
                        value={this.state.text} 
                        placeholder='Add task'
                        onChange={this.handleChange}
                    />
                </div>
                <br/>

                <div className='form-control'>
                    <label>Day:</label>
                    <input 
                        type='text' 
                        name='day'
                        value={this.state.day} 
                        placeholder='Add day and time'
                        onChange={this.handleChange}
                    />
                </div>
                <br/>

                <div className='form-control form-control-check'>
                    <label>Reminder:</label>
                    <input 
                        type='checkbox' 
                        name='reminder'
                        checked={this.state.reminder} 
                        onChange={this.handleChange} 
                    />
                </div>
                <br/>

                <div className='form-control'>
                    <button 
                        className='btn btn-block' 
                    >
                        Save task
                    </button>
                </div>
                <br/>
                <hr/>
            </form>
        );
    }
}

export default AddForm;