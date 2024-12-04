import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  register: [],
  error: null,
};

const regSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    startLoading(state) {
      (state.isLoading = true), (state.error = null);
    },
    registerSuccess(state, action) {
      state.register.push(action.payload);
      state.isLoading = false;
    },
    hadError(state, action) {
      (state.isLoading = false), (state.error = action.payload);
    },
  },
});


export default regSlice.reducer;
export const {startLoading,hadError,registerSuccess}=regSlice.actions;

export const registerUser=(userData)=>async(dispatch,getState)=>{
dispatch(startLoading());
try {
    console.log("userSice",userData);
    dispatch(registerSuccess(userData))
    console.log("User successfully registered:",userData);

    const currentState=getState();
    console.log("currentRegiserData:", currentState);

    
} catch (error) {
    dispatch(hadError("Failed to register user. Please try again!"))
    console.log("Registration error:", error);
}
}