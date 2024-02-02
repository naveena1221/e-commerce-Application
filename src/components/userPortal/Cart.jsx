import React, { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { DeleteFromCart, decrementCreator, incrementCreator } from "../../redux/ActionCreator/ActionCreator";


export default function Cart() {
    const dispatch=useDispatch();
  const CartStore = useSelector((state) => state);
  console.log("Redux State:", CartStore);

  const DeleteHandle=(id)=>{
    console.log("Deleting item with id:", id);
    dispatch(DeleteFromCart(id));
  }
  const incrementHandle=(productId,currentQuantity)=>{
    dispatch(incrementCreator(productId,currentQuantity + 1));
  };
  const decrementHandle=(productId,currentQuantity)=>{
    dispatch(decrementCreator(productId,currentQuantity - 1));
  }
  const productTotals = CartStore.shoppingFeature.AddToCart.map(
    (product) => product.price * product.quantity
  );

  
  const grandTotal = productTotals.reduce((total, amount) => total + amount, 0);


  return (
    <>
      <Header />
      
      <div style={{margin:'50px'}}>
      <h2 style={{ textAlign: "center" }}>Shopping Cart</h2>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {CartStore.shoppingFeature.AddToCart.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td>
                <div style={{ display: "flex", gap: "20px" }}>
                  <img
                    style={{ width: "5rem", height: "5rem" }}
                    src={item.image}
                    alt="product image"
                  />
                  <div>
                    <p>{item.title}</p>
                    <br />
                    
                  </div>
                </div>
              </td>

              <td>${item.price}</td>

           
              <td>
              <Button
        type="primary"
        onClick={() => incrementHandle(item.id,item.quantity)}
        style={{fontSize:'10px',padding:'5px'}}
      >
        +
      </Button>
      <span style={{margin:'3px',fontSize:'12px'}}>{item.quantity}</span>
     
      <Button
        type="primary"
        onClick={() => decrementHandle(item.id,item.quantity)}
        style={{fontSize:'10px',padding:'6px'}}
      >
        -
      </Button>
              </td>

            
              <td>${item.price * item.quantity}</td>

              <td>
                <Button
                  type="primary"
                  danger
                  onClick={() => DeleteHandle(item.id)} style={{fontSize:'12px'}}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <span><strong>Grand Total: ${grandTotal}</strong></span>
        
      </div>
      </div>
    </>
  );
}
