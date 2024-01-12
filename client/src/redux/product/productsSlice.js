import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { emptyImages } from "../upload/uploadFileSlice";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  hasUpdate: true,
  productTemp: {
    imageUrls: []
   },
};
const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
  return fetch("/api/product/getAll")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
});
const updateProduct = createAsyncThunk(
  "products/update",
  (product, { dispatch }) => {
    product &&
      product.imageUrls &&
      product.imageUrls.length &&
      (product = {
        ...product,
        imageUrls: product.imageUrls.map((item) => item._id),
      });
    return fetch("/api/product/update", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setHasUpdate(true));
        return data;
      });
  }
);
const addProduct = createAsyncThunk("products/add", (product, { dispatch , rejectWithValue  }) => {
  product &&
    product.imageUrls &&
    product.imageUrls.length &&
    (product = {
      ...product,
      imageUrls: product.imageUrls.map((item) => item._id),
    });

  return fetch("/api/product/add", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success === true) {
        dispatch(emptyImages());
        dispatch(emptyProductTemp())
        return data;
      }else{
        return rejectWithValue(data.message);
      }
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});
const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setHasUpdate: (state, action) => {
      state.hasUpdate = action.payload;
    },
    emptyProductTemp:(state)=>{
state.productTemp={
    imageUrls: [],
    // name: "",
    // description: "",
    // category: "گل سر",
    // regularPrice: 0,
    // discount: 0,
    // count: 0,
    // isPublished: false
}
    },
    newProductImages: (state, action) => {
      // state.productTemp.imageUrls = [
      //   ...state.productTemp.imageUrls,
      //   ...action.payload.map((item) => item._id),
      // ];
      state.productTemp.imageUrls = [
        ...state.productTemp.imageUrls,
        ...action.payload,
      ];
    },
    deleteNewProductImages: (state, action) => {
      state.productTemp.imageUrls = [
        ...state.productTemp.imageUrls.filter(
          (item) => item._id !== action.payload.id
        ),
      ];
    },
    setProductTemp: (state, action) => {
      state.productTemp = {
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.hasUpdate = false;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
      state.hasUpdate = false;
      state.isLoading = false;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.hasUpdate = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedProduct = action.payload.product;
      const index = state.products.findIndex(
        (product) => product._id === updatedProduct._id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
      state.hasUpdate = true;
      // state.productTemp = {};
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});
export const {
  setHasUpdate,
  newProductImages,
  deleteNewProductImages,
  setProductTemp,
  emptyProductTemp
} = productsSlice.actions;
export default productsSlice.reducer;
export { fetchProducts, updateProduct, addProduct };
