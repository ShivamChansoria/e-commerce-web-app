//THis file is created for handling the Cart functionalities.

import { Fragment, useState } from "react";
import Modal from "../UI/Modal";
import placeholder from "./placeholder1.png"

const Cart = ( {count} ) =>{
 
    const [showModal, setShowModal] = useState(false);
    const handleModal = () =>{
        setShowModal(!showModal);
    }

    return(
        <Fragment>
        <div className="cart-container">
            <button onClick={handleModal}>
                <span data-items={count}>Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="6" cy="19" r="2" />
                    <circle cx="17" cy="19" r="2" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                    <path d="M15 6h6m-3 -3v6" />
                </svg>
            </button>
        </div>
        {
            showModal && 
            <Modal onClose={handleModal}>
                <div className="checkout-modal">
                    <h2>Checkout Modal</h2>
                { count>0? <div className="checkout-modal_list">
                    <div className="checkout-modal_list-item">
                        <div className="img-wrap">
                           <img src={placeholder} alt="placeholder" className="img-fluid" height="100vh"/>
                        </div>
                        <div className="information">
                            <h4>Title of the product</h4>
                            <div className="pricing">
                                <span>2000Rs</span>
                                <small>
                                    <strike>2500Rs</strike>
                                </small>
                            </div>
                        </div>
                        <div className="cart-addon cart-addon__modal">
                            <button>-</button>
                            <span className="counter">{0}</span>
                            <button>+</button>
                        </div>
                    </div>
                     <div className="checkout-modal_footer">
                        <div className="totalAmount">
                            <h4>Total Amount</h4>
                            <h4>2000 INR</h4>
                        </div>
                        <div>
                            <button>Order Now</button>
                        </div>
                    </div>
                    </div>
                        :
                        <div className="empty-cart">Please Add Something to your Cart!!</div>         
                        }
                </div> 
            </Modal>
        }
        </Fragment>
    )
};

export default Cart;