import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  hasUpdate: true,
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
    const images = product.imageUrls.map((image) => image._id);
    return fetch("/api/product/update", {
      method: "POST",
      body: JSON.stringify({ ...product, imageUrls: images }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setHasUpdate()); // Dispatch the setHasUpdate action after adding the product
        return data;
      });
  }
);
const addProduct = createAsyncThunk("products/add", (product, { dispatch }) => {
  return fetch("/api/product/add", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success === true) {
        dispatch(setHasUpdate());
        return data;
      }
    });
});
const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setHasUpdate: (state) => {
      state.hasUpdate = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.products = action.payload),
        (state.hasUpdate = false),
        (state.error = "");
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
      (state.hasUpdate = false), (state.isLoading = false);
    });
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.products = [...state.products, action.payload.product]),
        (state.error = ""),
        (state.hasUpdate = false);
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
      (state.hasUpdate = false), (state.error = "");
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});
export const { setHasUpdate } = productsSlice.actions;
export default productsSlice.reducer;
export { fetchProducts, updateProduct, addProduct  };
