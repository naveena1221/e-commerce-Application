import { Action_Types } from "../ActionType/ActionType"

export const allProductCreator= (data)=>{
    return ({
        type:Action_Types.ALLPRODUCTS,
        payload:data,

    }
    )
}

export const ProductIDCreator=(data)=>{
    return (
        {
            type:Action_Types.PRODUCTID,
            payload:data,
        }
    )
}
export const ProductDetailsCreator=(data)=>{
    return (
        {
            type:Action_Types.PRODUCTDETAILS,
            payload:data,
        }
    )
}

export const AddToCartCreator=(data)=>{
    const quantity = data.quantity || 1;
    return{
        type:Action_Types.ADDTOCART,
        payload:{data: { ...data, quantity }},
    }
}
export const DeleteFromCart=(data)=>{
    return{
        type:Action_Types.DELETEFROMCART,
        payload:data,
    }
}

export const incrementCreator=(productId, quantity = 1)=>{
    return{
        type:Action_Types.INCREMENT,
        payload:{ productId, quantity },
    }
}
export const decrementCreator=(productId,quantity = 1)=>{
    return{
        type:Action_Types.DECREMENT,
        payload:{ productId, quantity },
    }
    
}
export const categorySelectCreator=(categorySelect)=>{
    return{
        type:Action_Types.CATEGORYSELECT,
        payload:categorySelect,
    }
}

export const productsBasedOnCategoryCreator=(products)=>{
    return{
        type:Action_Types.PRODUCTSBASEDONCATEGORY,
        payload:products,
    }
}
