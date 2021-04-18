
// Initial State
import {createSlice} from "@reduxjs/toolkit";

const uiInitialState = {
    sidebarShow: 'responsive'
};

//Reducer
const uiSlice = createSlice({
    //slice name -> all the actions dispatched to reducers of this slice will accompany this name i.e ui/[action.type]
    name: "ui",
    //slice initial state
    initialState : uiInitialState,
    //slice reducers
    reducers: {
        toggleSidebarAction: (state, action) => {
            state.sidebarShow = action.payload
        },
    },
})

//getting actions from uiSlice
export const { toggleSidebarAction } = uiSlice.actions

//getting reducers from uiSlice
const uiReducer = uiSlice.reducer


export default uiReducer;
