import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../store';
import { Action } from 'redux';

export type CustomThunkDispatch = ThunkDispatch<ApplicationState, undefined, Action>
