import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class Header extends React.Component {
    render() {
        let btn_style = {}

        if(this.props.isAddFormShow) {
            btn_style = {
                backgroundColor: '#ee0000',
                text: 'Close'
            }
        }
        else {
            btn_style = {
                backgroundColor: 'Green',
                text: 'Add'
            }
        }

        return (
            <Router>
                <header className='header'>
                    <h1>Task Tracker</h1>
                    <Routes>
                        <Route exact path='/' element={
                            <button 
                                className='btn'
                                style={btn_style} 
                                onClick={this.props.onToggleForm} 
                            >
                                {btn_style.text}
                            </button>
                        } />
                    </Routes>
                </header>
            </Router>
        );
    }
}

export default Header;