import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'NEW':
            return action.payload
        case 'DELETE': 
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const CounterContextProvider = (props) => {
    const [notification,  notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{notification, notificationDispatch}}>
            {props.children}
        </NotificationContext.Provider>
    )

}
export default NotificationContext