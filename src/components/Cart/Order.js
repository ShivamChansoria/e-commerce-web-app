//COMPONENT for managing the order success.

import Modal from "../UI/Modal";
import OrderSuccessImage from "../UI/OrderSuccessImage.jpeg";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

//COMPONENT for managing the success of the order.
const Order = ({ onClose, orderId }) =>{

    const notify = (message) =>{
        toast(message);
    }
    return(
        <Modal onClose={onClose}>
           <div className="order-container">
            <div className="order-container--success">
                <img src={OrderSuccessImage} alt="OrderSuccefullImage" className="img-fluid" />
            <div>
                {notify("Your Order is Sucessfully Placed!")}
                <h1>Your Order is Sucessfully Placed!</h1>
                <span>OrderID {orderId} </span>
            </div>
            </div>
           </div>
        </Modal>
    );
}
export default Order;