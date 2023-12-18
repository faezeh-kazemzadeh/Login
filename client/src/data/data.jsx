import React from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";

export const links = [
  {
    title: "Product",
    links: [
      {
        name: "Add Product",
        url: "product/add",
        icon: <IoAddCircleOutline />,
      },
      {
        name: "Remove Product",
        url: "product/delete",
        icon: <IoRemoveCircleOutline />,
      },
      {
        name: "Update Product",
        url: "product/update",
        icon: <GrUpdate />,
      }
      ,
      {
        name: "All Products",
        url: "product/getAll",
        icon: <GrUpdate />,
      }
    ]
  },{
    title:'Users',
    links:[
      {
        name:'Users List',
        url:'users/getAll',
        icon: <GrUpdate />,
    }
    ]
  }
];