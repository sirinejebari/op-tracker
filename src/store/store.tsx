import { createStore } from 'redux';
import OpTrackerApp from './reducers'
const initialState = {
    filters: {
        status: '',
        operator: '',
        reference: ''
    }, messages: []
}
export const store = createStore(OpTrackerApp, initialState)