import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  newProductImages,
  deleteNewProductImages,
} from "../product/productsSlice";

const initialState = {
  imageUrls: [],
  error: null,
  loading: false,
  filesCount: 0,
};

const uploadImages = createAsyncThunk(
  "images/upload",
  (images, { dispatch, rejectWithValue }) => {
    return fetch("/api/image/upload/multiple", {
      method: "POST",
      body: images,
    })
      .then((response) => response.json())
      .then((data) => {
        // dispatch(newProductImages(data.imageUrls));
        return data;

        // if (data.success === true) {
        //   return data;
        // } else {
        //   rejectWithValue(data);
        // }
      })
      // .catch((error)=>rejectWithValue(error));
  }
);
const removeImage = createAsyncThunk("images/remove", (id, { dispatch }) => {
  console.log(id);
  return fetch(`/api/image/remove/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(deleteNewProductImages({ id }));
      return data;
    });
});
const imagesSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    emptyImages: (state) => {
      state.imageUrls = [];
      state.filesCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadImages.fulfilled, (state, action) => {
      (state.loading = false),
        // (state.imageUrls = [...state.imageUrls, ...action.payload.imageUrls]);
        (state.filesCount = state.imageUrls.length);
    });
    builder.addCase(uploadImages.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(removeImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeImage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // state.imageUrls = state.imageUrls.filter(
      //   (image) => image._id !== action.meta.arg
      // );
      // state.filesCount = state.imageUrls.length;
    });
    builder.addCase(removeImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default imagesSlice.reducer;
export { uploadImages, removeImage };
export const { emptyImages, setImages } = imagesSlice.actions;
