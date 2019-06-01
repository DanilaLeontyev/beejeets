import React from 'react';
import './App.css';
import TaskList from '../../containers/TaskList';
import Auth from '../../containers/Auth';

const App: React.FC = () => {
  return (
    <div className="App">
      <TaskList />
      <Auth />
    </div>
  );
}

export default App;
