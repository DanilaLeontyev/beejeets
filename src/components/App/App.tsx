import React from 'react';
import './App.css';
import TaskList from '../../containers/TaskList';
import Auth from '../../containers/Auth';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TaskList />
                <Auth />
            </div>
        );
    }
}

export default App;
