export const sumProducts =(products)=>{
   return products.reduce((counter,product)=> counter + product.quantity,0)
   
   
}

export const totalPrice =(products)=>{
    const regularPrice= products.reduce((total,product)=> total + product.regularPrice*product.quantity,0).toFixed(2)
    const discountedPrice= products.reduce((total,product)=> total + (product.regularPrice*(100-product.discount)/100)*product.quantity,0).toFixed(2)
  return{
    regularPrice,discountedPrice
  }
}

export const productQuantity=(state,id)=>{
    const index= state.selectedItems.findIndex(item=>item._id===id)
    if(index === -1){
        return 0
    }else{
        return state.selectedItems[index].quantity
    }
}

export const getCategories=async()=>{
  const response = await fetch("/api/category/getAll");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status
    }`);
    const data= await response.json();
    return data.categories
}