import { createStore, Store, applyMiddleware } from 'redux';
import { ApplicationState, createRootReducer } from './store';
import thunk from 'redux-thunk';

export default function configureStore(initialState: ApplicationState): Store<ApplicationState> {
    const store = createStore(
        createRootReducer(),
        initialState,
        applyMiddleware(thunk),
    )
    return store;
}