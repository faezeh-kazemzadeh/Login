import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    isLoading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.isLoading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.isLoading=false,
            state.error=null
        },
        signInFailure:(state,action)=>{
            state.error=action.payload,
            state.isLoading=false
        },
        updateUserStart:(state)=>{
            state.isLoading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.isLoading=false,
            state.error=null
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload,
            state.isLoading=false
        },
        deleteUserStart:(state)=>{
            state.isLoading=true
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null,
            state.error=null,
            state.isLoading=false
        },
        deleteUserFailure:(state,action)=>{
            state.isLoading=false,
            state.error=action.payload
        },
        signOutUserStart:(state)=>{
            state.isLoading=true
        },
        signOutUserSuccess:(state)=>{
            state.currentUser=null,
            state.error=null,
            state.isLoading=false
        },
        signOutUserFailure:(state,action)=>{
            state.isLoading=false,
            state.error=action.payload
        }
    }
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
}=userSlice.actions;
export default userSlice.reducer;