//To make reusable component to manage the cart items.

import placeholder from "./placeholder1.png"

const CartItem = ({data, onEmitDecreaseItem, onEmitIncreaseItem}) =>{

    return(
        <div className="checkout-modal_list-item">
        <div className="img-wrap">
           <img src={placeholder} alt="data.title" className="img-fluid" height="100vh"/>
        </div>
        <div className="information">
            <h4>{data.title}</h4>
            <div className="pricing">
                <span>{data.discountedPrice}₹</span>
                <small>
                    <strike>{data.price}₹</strike>
                </small>
            </div>
        </div>
        <div className="cart-addon cart-addon__modal">
            <button onClick={() => onEmitDecreaseItem(data)}>-</button>
            <span className="counter">{data.quantity}</span>
            <button onClick={() => onEmitIncreaseItem(data)}>+</button>
        </div>
    </div>
    );

}
export default CartItem;