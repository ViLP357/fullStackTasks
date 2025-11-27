import { createSlice }  from '@reduxjs/toolkit'

const initialState = 'hello!'

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

export const { changeNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer