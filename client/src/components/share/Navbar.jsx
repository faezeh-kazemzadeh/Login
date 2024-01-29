import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Header, Layout, PrivateRoute, ProductDetail, UnAuthorized } from "../index";
import { Home, SignIn, SignUp, About, Profile ,Products} from "../../pages/index";
import {
  ContentAdd, 
  AllProducts,
  RemoveProduct,
  AddProduct,
  Dashboard,
  UpdateProduct,
} from "../admin/index";

const ROLES = {
  Admin: "Admin",
  Editor: "Editor",
  User: "User",
};
export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            element={<PrivateRoute allowedRoles={[ROLES.User, ROLES.Admin]} />}
          >
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route
            path="sign-in"
            element={
              currentUser ? <Navigate to="/" replace={true} /> : <SignIn />
            }
          />
          <Route
            path="sign-up"
            element={
              currentUser ? <Navigate to="/" replace={true} /> : <SignUp />
            }
          />
          <Route path="products" element={<Products />} />
          <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin/dashboard/*" element={<Dashboard />}>
            <Route index element={<AddProduct />} />
              <Route path="product/add" element={<AddProduct />} />
              <Route path="product/update/:id" element={<UpdateProduct />} />
              <Route path="product/delete" element={<RemoveProduct />} />
              <Route path="product/getAll" element={<AllProducts />} />
            <Route path="content/add" element={<ContentAdd/>}/>

            </Route>
          </Route>
          
          <Route path="/about" element={<About />} />

            <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/*" element={<UnAuthorized />} />
        </Route>
      </Routes>
    </>
  );
}
