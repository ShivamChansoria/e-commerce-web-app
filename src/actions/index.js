//FIle is used to create action handlers by dispatching diff. actions.

import axios from "axios"

export const addItemHandler = item =>{
    return dispatch =>
    dispatch({
        type: 'ADD_ITEM',
        payload: {
            stateItem: item
        }
    })
}
export const removeItemHandler = item =>{
    return dispatch =>
    dispatch({
        type: 'REMOVE_ITEM',
        payload: {
            id: item.id
        }
    })
}
export const clearCartHandler = () =>{
    return dispatch =>
    dispatch({
        type: 'CLEAR_CART',
    })
}

export const placeOrderHandler = (callback) =>{ //"callback" will be function rendered when a fucntion is returning having the data provdided!
    return async(dispatch, getState) =>{
        try{
            const { auth, cart } = getState();
            const localId = auth.localId;
            const token = auth.idToken;
            // console.log(localId);
            if(!token){ //If token is not present means that the user is not logged in.
                return callback({
                    error: true,
                    data:{
                        error: "Please login to place the order!!!"
                    }
                })
            }
            const response= await axios.post("https://e-commerce-app-01-f2eae-default-rtdb.firebaseio.com/orders/"+ localId+".json?auth="+token,
            {...cart});//Giving the database access within the auth token and user local id. And also fetching the cart.
            dispatch({
                type: "CLEAR_CART"
            })//Clearing the cart after successful authentication and placing the order.
            return callback({
                error: false,
                data: response.data
            })
        }
        catch(error){
            return callback({error: true,
                ...error.response
            });
        }
    }
}