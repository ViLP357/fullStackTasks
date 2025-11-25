import { createSlice }  from '@reduxjs/toolkit'

const initialState = 'hello!'
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        changeNotification(state, action) {
            const message = action.payload
            return message
        }
    }
})

export default notificationSlice.reducer