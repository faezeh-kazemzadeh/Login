import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageUrls:null,
    error:null,
    loading:false
}

const uploadImages=createAsyncThunk('images/upload',(images)=>{
   return fetch("/api/image/upload/multiple", {
        method: "POST",
        body: images,
      })
      .then(response=>response.json)
      .then(data=>data)
})
const imagesSlice = createSlice({
    name:'images',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(uploadImages.pending,state=>{
            state.loading=true
        });
        builder.addCase(uploadImages.fulfilled,(state,action)=>{
            state.loading=false,
state.imageUrls=action.payload
        })
        builder.addCase(uploadImages.rejected,(state, action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export default imagesSlice.reducer;
export {uploadImages}