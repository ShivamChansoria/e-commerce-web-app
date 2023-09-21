//COMPONENT for managing the order success.

import Modal from "../UI/Modal";
import OrderSuccessImage from "../UI/OrderSuccessImage.jpeg";

//COMPONENT for managing the success of the order.
const Order = ({ onClose, totalAmount }) =>{
    return(
        <Modal onClose={onClose}>
           <div className="order-container">
            <div className="order-container--success">
                <img src={OrderSuccessImage} alt="OrderSuccefullImage" className="img-fluid" />
            <div>
                <h1>Your Order is Sucessfully Placed!</h1>
                <span>OrderID #{Math.random().toString(32).slice(2)} </span>
            </div>
            </div>
           </div>
        </Modal>
    );
}
export default Order;