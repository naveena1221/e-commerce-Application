import { Action_Types } from "../redux/ActionType/ActionType";

const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const globalState={
    AllProducts:null,
    ProductID:null,
    ProductDetials:null,
    AddToCart:savedCartItems,
    categorySelector:null,
    productBasedOnCategory:[],
}

export const ProductReducer=(state=globalState,action)=>{
    console.log(state);
    console.log(action);
    switch(action.type){
        case Action_Types.ALLPRODUCTS: return {...state,AllProducts:action.payload};

        case Action_Types.PRODUCTID: return {...state,ProductID:action.payload};

        case Action_Types.PRODUCTDETAILS: return {...state,ProductDetials:action.payload};

        case Action_Types.ADDTOCART:
      const details = action.payload.data; 
      const existingProductIndex = state.AddToCart.findIndex((product) => product.id === details.id);
      if (existingProductIndex !== -1) {
       
        const updatedCart = state.AddToCart.map((product, index) =>
          index === existingProductIndex
            ? { ...product, quantity: product.quantity + details.quantity }
            : product
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        return { ...state, AddToCart: updatedCart };
      } else {

        const updatedAddToCart = [...state.AddToCart, details];
        localStorage.setItem('cartItems', JSON.stringify(updatedAddToCart));
        return { ...state, AddToCart: updatedAddToCart };
      }


    case Action_Types.DELETEFROMCART:
      const productIdToRemove = action.payload;
      const updatedCart = state.AddToCart.filter(
        (product) => product.id !== productIdToRemove
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { ...state, AddToCart: updatedCart };


      case Action_Types.INCREMENT:
      const incProductId = action.payload.productId;
      const incrementedCart = state.AddToCart.map((product) =>
        product.id === incProductId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      localStorage.setItem('cartItems', JSON.stringify(incrementedCart));
      return { ...state, AddToCart: incrementedCart };


    case Action_Types.DECREMENT:
      const decProductId = action.payload.productId;
      const decrementedCart = state.AddToCart.map((product) =>
        product.id === decProductId
          ? { ...product, quantity: Math.max(product.quantity - 1, 1) }
          : product
      );
      localStorage.setItem('cartItems', JSON.stringify(decrementedCart));
      return { ...state, AddToCart: decrementedCart };


      case Action_Types.CATEGORYSELECT: console.log('Previous State:', state);
      console.log('Action Payload:', action.payload);
      const newState = { ...state, categorySelector: action.payload };
      console.log('New State:', newState);
      return newState;


      case Action_Types.PRODUCTSBASEDONCATEGORY: 
      console.log("payload", action.payload);
      return{...state,productBasedOnCategory:action.payload}


      
        default:
            return state
    }
}