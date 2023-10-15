//File for making reusable product items compnent.
import carticon from "./Cart/R```.png";
import {Fragment, useState} from "react";
import Modal from "./UI/Modal";
import {useDispatch, useSelector} from "react-redux";
import "../index.scss"
import { addItemHandler, removeItemHandler } from '../actions';

//Definig "Component"
const Listitems = ({item }) => { //We use paranthesis in props bacause here it is an object passing the data of the items.
    // const [counter, setCounter]= useState(0);
    const [showModal, setShowModal] = useState(false);
    const stateItem = useSelector(state =>state.cart.items.find(stateItem => stateItem.id ===item.id) );//It will extract the current item from the Redux store according to the 'item-id'.
    const dispatch = useDispatch();

    const increaseCounterByOne = (e) =>{
        e.stopPropagation();//For stopping the execution of the other clicking events on the target element.
        dispatch(addItemHandler(item))
        //  onAdd(item.id);
        // setCounter(counter+1);

    }
    const descreaseCounterByOne = (e) =>{
        e.stopPropagation();//For stopping the execution of the other clicking events on the target element used in their parent element.
        // console.log(stateItem.quantity);
        dispatch(removeItemHandler(item));
        //  if(item.quantity===1)onRemove(item.id);
        // onRemove(item.id);//Call the onRemove method by using the 'id' of the item.
        // setCounter(counter-1);
    }
    const handleModal = () =>{
        setShowModal(!showModal);
    }

     return(
        <Fragment>
        <div onClick={handleModal} className={"item-card"}>
            <img className={"img-fluid"} src={item.thumbnail} alt={item.title} height="200vh" />
            <div className={"item-card__information"}>
                <div className='pricing'>
                   <span> ₹{item.discountedPrice}</span>
                   <small> ₹
                        <del>
                        {item.price}
                        </del>
                </small>
                </div>
                <div className={"title"}> 
                   <h3>{item.title}</h3>
                </div>
            </div>
            {/* <button onClick={() =>updateItemTitle(item.id)}>Update Title</button> */}
           {
           !stateItem || stateItem.quantity<1 ?
               <button className={'cart-add'} onClick={increaseCounterByOne} >
               <span><b>Add To Cart</b></span>
               <img src={carticon} alt="carticon" height="20vh"/>
             </button>
             :
             <div className={"cart-addon"}>
             <button onClick={descreaseCounterByOne}><span>-</span></button>
             <span className={"counter"}>{stateItem.quantity}</span>
             <button onClick={increaseCounterByOne}><span>+</span></button>
            </div>
           }
     
           </div>
        {showModal && <Modal onClose={handleModal}>
            {/* Providng the child elements to the Modal Component under the tag declaration. */}
            <div className='item-card--modal'>
                <div className='img-wrap'>
                <img className={"img-fluid"}src={item.thumbnail} alt={item.title} height="200vh" />
                </div>
                <div className='meta'>
                    <h3>{item.title}</h3>
                    <div className='pricing'>
                   <span> ₹{item.discountedPrice}</span>
                   <small> ₹
                        <del>
                        {item.price}
                        </del>
                </small>
                </div>
                <p>{item.description}</p>
                </div>
                {
           !stateItem || stateItem.quantity<1 ?
               <button className={'cart-add'} onClick={increaseCounterByOne} >
               <span><b>Add To Cart</b></span>
               <img src={carticon} alt="carticon" height="20vh"/>
             </button>
             :
             <div className={"cart-addon"}>
             <button onClick={descreaseCounterByOne}><span>-</span></button>
             <span className={"counter"}>{stateItem.quantity}</span>
             <button onClick={increaseCounterByOne}><span>+</span></button>
            </div>
           }
            </div>
        </Modal > }
    </Fragment>
     )
};
export default Listitems;