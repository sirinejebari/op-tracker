import {ACTION_FILTER_UPDATE, ACTION_SHOW_MESSAGE, ACTION_HIDE_MESSAGE} from './actionTypes'
import {MessageInterface} from '../interfaces';
export function updateFilters(filters: object) {
    return {
        type: ACTION_FILTER_UPDATE,
        filters: filters
    }
}
export function addMessage(message: MessageInterface) {
    return {
        type: ACTION_SHOW_MESSAGE,
        message: message
    }
}
export function hideMessage(message: MessageInterface) {
    return {
        type: ACTION_HIDE_MESSAGE,
        message: message
    }
}