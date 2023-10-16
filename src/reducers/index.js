//This file is for the creating and managing of all the state reducer functions
import { combineReducers } from "redux";
import authReducer from "./auth";

const mainReducer = (state ={ items:[], totalAmount:0 }, action) => {
      const {type, payload} = action
        switch(type){
        case "ADD_ITEM":{
            let items= [...state.items]
            let index= items.findIndex(item => item.id===payload.stateItem.id)
            if(index>-1){
                items[index] ={...items[index],
                quantity: items[index].quantity+1
                }
            }
            else {
                items.push({
                    ...payload.stateItem,
                    quantity: 1
                })
            }
            // console.log(state.totalAmount);
            // console.log(payload.stateItem.discountedPrice);
            const totalAmount= state.totalAmount + payload.stateItem.discountedPrice;
            return {
                ...state,
                items: items,
                totalAmount: totalAmount
            }
        }
             case "REMOVE_ITEM":{
               let items= [...state.items]
               let index= items.findIndex(item => item.id===payload.id)
               let totalAmount= state.totalAmount - items[index].discountedPrice
               //Here state.totalAmount is the current totalAmount in curent state 

               if(items[index].quantity=== 1) {
                items[index] ={...items[index],
                    quantity: items[index].quantity-1
                    }
                items.splice(index, 1);
                  }

               else if(index>-1){
                items[index] ={...items[index],
                quantity: items[index].quantity-1
                }
               }
              
                return {
                ...state,
                items: items,
                totalAmount: totalAmount

                    }
             }
            case "CLEAR_CART":{
               return {
                items:[],
                totalAmount: 0
               }
            }
            default: return state;

        }      
    }
export default combineReducers({
    cart: mainReducer,
    auth: authReducer
});