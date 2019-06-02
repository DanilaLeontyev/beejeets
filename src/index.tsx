import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { initialState as taskInitialState } from './store/task/reducer';
import { initialState as authInitialState } from './store/auth/reducer';
import { initialState as addTaskInitialState } from './store/addTask/reducer';

const store = configureStore({
    task: taskInitialState,
    auth: authInitialState,
    addTask: addTaskInitialState
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
