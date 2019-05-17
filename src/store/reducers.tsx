import { combineReducers } from 'redux'
import { ACTION_FILTER_UPDATE, ACTION_SHOW_MESSAGE, ACTION_HIDE_MESSAGE } from './actionTypes';
import {FiltersInterface, MessageInterface} from '../interfaces'

function filters(state: FiltersInterface = {
    status: '',
    operator: '',
    reference: ''
}, action: 
{ type: string, filters: FiltersInterface }): FiltersInterface {
    switch (action.type) {
        case ACTION_FILTER_UPDATE: {
            return action.filters
        }
        default:
            {
                return state || null
            }

    }
}

function messages(state: MessageInterface[] = [], actions: { type: string, message: MessageInterface }): MessageInterface[] {
    switch (actions.type) {
        case ACTION_SHOW_MESSAGE: {
            actions.message.msgKey = `message${state.length}`
            let spare = state;
            spare.push(actions.message) 
            return Array.from(spare)
        }

        case ACTION_HIDE_MESSAGE: {
            let spare = state;
            return spare.filter(msg => {
                return msg.msgKey !== actions.message.msgKey
            })
        }
        default:
            return state
    }
}

const OpTrackerApp = combineReducers({
    filters,
    messages

})

export default OpTrackerApp