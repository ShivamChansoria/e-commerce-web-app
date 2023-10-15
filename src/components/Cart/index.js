//THis file is created for handling the Cart functionalities.

import { Fragment, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Order from "./Order";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemHandler,
  clearCartHandler,
  placeOrderHandler,
  removeItemHandler,
} from "../../actions";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  // let totalAmount=0;
  const [showModal, setShowModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const totalAmount = useSelector((state) => state.cart.totalAmount); // Will take total amount from central store.
  const items = useSelector((state) => state.cart.items); //State of the items is passed to the useSelector now when the item state is changed it will be triggered!!
  const dispatch = useDispatch(); //Based on condtional statements on types it will dispatches the new states.

  const dispatchEvents = (type, item) => {
    //This function handles the cart ADD/REMOVE events.
    if (type === 1) {
      dispatch(addItemHandler(item));
    } else if (type === -1) {
      dispatch(removeItemHandler(item));
    }
  };
  const notify = (message) => {
    toast(message);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleOrderModal = () => {
    setShowModal(false);
    // dispatch(clearCartHandler()) //Will clear the cart after placing successfull order.
    setOrderModal(!orderModal);
  };
  const handleOrder = () => {
    setShowModal(false);
    // dispatch(clearCartHandler());
    dispatch(
      placeOrderHandler((response) => {
        console.log(response);
        if (response.error) {
          notify(response.data.error || "Something went wrong!!");
        } else {
          setOrderId(response.data.name);
          setOrderModal(!orderModal);
        }
      })
    );
  };

  return (
    <Fragment>
      <div className="cart-container">
        <button onClick={handleModal}>
          <span data-items={items.length}>Cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-shopping-cart-plus"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
            <path d="M15 6h6m-3 -3v6" />
          </svg>
        </button>
      </div>
      {showModal && (
        <Modal onClose={handleModal}>
          <div className="checkout-modal">
            <h2>Checkout Modal</h2>
            {items.length > 0 ? (
              <div className="checkout-modal_list">
                {items.map((item) => {
                  // totalAmount+=item.discountedPrice*item.quantity;
                  return (
                    <CartItem
                      data={item}
                      key={item.id}
                      onEmitDecreaseItem={(item) => dispatchEvents(-1, item)}
                      onEmitIncreaseItem={(item) => dispatchEvents(1, item)}
                    />
                  );
                })}
                <div className="checkout-modal_footer">
                  <div className="totalAmount">
                    <h4>Total Amount :</h4>
                    <h4>₹{totalAmount} (INR)</h4>
                  </div>
                  <div>
                    <button onClick={handleOrder}>Order Now</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-cart">
                {notify("Please Add Something to your Cart!!")}
                Please Add Something to your Cart!!
              </div>
            )}
          </div>
        </Modal>
      )}
      {orderModal && (
        <Order
          orderId={orderId}
          onClose={handleOrderModal}
          totalAmount={totalAmount}
        />
      )}
    </Fragment>
  );
};

export default Cart;
