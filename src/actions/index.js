//FIle is used to create action handlers by dispatching diff. actions.

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