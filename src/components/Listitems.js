//File for making reusable items compnent.
import placeholder from '../assets/placeholder1.png';
import carticon from "../assets/R```.png";
import {useState} from "react";

import "../index.scss"
//Defiinig "Component"
const Listitems = ({item, updateItemTitle, key}) => { //We use paranthesis in props bacause here it is an object passing the data of the items.
    const [counter, setCounter]= useState(0);
    const descreaseCounterByOne = () =>{
        if(counter<=0){
        return counter;
         }
        setCounter(counter-1);
    }
    const increaseCounterByOne = () =>{
        if(counter===5){
        alert("Max capacity exceeded for an single item")
        return counter;
         }
        setCounter(counter+1);
    }

     return(
        <span className={"item-card"}>
            <img className={"img-fluid"}src={placeholder} alt={item.title} height="200vh" />
            <div className={"item-card__information"}>
                <div>
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
            <button onClick={() =>updateItemTitle(item.id)}>Update Title</button>
           { counter<1?
               <button className={'cart-add'} onClick={increaseCounterByOne} >
               <span><b>Add To Cart</b></span>
               <img src={carticon} alt="carticon" height="20vh"/>
             </button>
             :
             <div className={"cart-addon"}>
             <button onClick={descreaseCounterByOne}><span>-</span></button>
             <span className={"counter"}>{counter}</span>
             <button onClick={increaseCounterByOne}><span>+</span></button>
            </div>
           }
     
    </span>
     )
};
export default Listitems;