import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        isLoggedIn:false,
        isLoading:false,
        error:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        removeUser:(state)=>{
            state.user = {};
            state.isLoggedIn = false;
        },  
        isLoggedIn:(state,action)=>{
            state.isLoggedIn = action.payload;
        },
        setError:(state,action)=>{
            state.error = action.payload;
        }
    }
})

export const {setUser,removeUser,isLoggedIn,setError} = userSlice.actions;
export default userSlice.reducer