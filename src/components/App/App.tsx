import React from 'react';
import './App.css';
import TaskList from '../../containers/TaskList';
import Auth from '../../containers/Auth';
import AddTask from '../../containers/AddTask';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Auth />
                <AddTask />
                <TaskList />
            </div>
        );
    }
}

export default App;
