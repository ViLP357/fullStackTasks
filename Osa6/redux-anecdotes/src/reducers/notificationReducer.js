import { createSlice }  from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        changeNotification(state, action) {
            const message = action.payload
            return message
        }, 
        deleteNotification() {//state, action
            //console.log(action.payload, state)
            return ''
        }
    }
})

const { changeNotification, deleteNotification} = notificationSlice.actions
export const setNotification = (text, time) => {
    return async (dispatch)=> {
        dispatch(changeNotification(text))
        setTimeout(()=> {
            dispatch(deleteNotification())
        }, time*1000)
    }
}

//export const { changeNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer