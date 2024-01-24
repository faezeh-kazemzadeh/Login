export const sumProducts =(products)=>{
   return products.reduce((counter,product)=> counter + product.quantity,0)
   
   
}

export const totalPrice =(products)=>{
    return products.reduce((total,product)=> total + product.regularPrice*product.quantity,0).toFixed(2)
  
}

export const productQuantity=(state,id)=>{
    const index= state.selectedItems.findIndex(item=>item._id===id)
    if(index === -1){
        return 0
    }else{
        return state.selectedItems[index].quantity
    }
}