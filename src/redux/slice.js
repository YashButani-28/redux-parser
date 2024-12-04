import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  register: [],
  error: null,
};


export const fetchUsers=createAsyncThunk(
    "user/fetchUsers",
    async(_,{rejectWithValue})=>{
        try {
            const response=await fetch("https://fakestoreapi.com/users")
            if(!response.ok){
                throw new Error("Failed to fetch users data");
            }
            const data= await response.json();
            return data.slice(0, 5);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

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

  extraReducers:(builder)=>{
    builder
    .addCase(fetchUsers.pending,(state)=>{
        state.isLoading=true;
        state.error=null;
    })
    .addCase(fetchUsers.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.register=action.payload
    })
    .addCase(fetchUsers.rejected,(state,action)=>{
        state.isLoading=false,
        state.error=action.payload
    })
  }
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