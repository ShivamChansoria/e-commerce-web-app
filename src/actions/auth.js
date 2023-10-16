import axios from "axios";
const API_KEY = "AIzaSyCyBBWyXKRzJszYfCtTfigy6-nVKmyZ18Q";

export const signupWithEP = ( details, callback ) => {
   
   return async(dispatch) =>{
    try{
      const response= await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+API_KEY,{
      email: details.email,
      password: details.password,
      returnSecureToken: true //Always needed to be true.
        });
        console.log(response);
        dispatch({
            type: "SIGNUP",
            payload: response.data
        })
        localStorage.setItem("token", response.data.idToken);
        return callback(response.data);
    }
    catch(error){
        console.log(error.response);
        return callback({
          error: true, 
          response: error.response
        });
    }
  }    
}

export const loginWithEP = ( details, callback ) => {
   
  return async(dispatch) =>{
   try{
     const response= await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+API_KEY,{
     email: details.email,
     password: details.password,
     returnSecureToken: true //Always needed to be true.
       });
       console.log(response);
       dispatch({
           type: "LOGIN",
           payload: response.data
       })
       localStorage.setItem("token", response.data.idToken);
       return callback(response.data);
   }
   catch(error){
       console.log(error.response);
       return callback({
         error: true, 
         response: error.response
       })
   }
 }    
}

export const checkIsLoggedIn = (callback) =>{
  return async(dispatch) => {
    try{
      let token = localStorage.getItem("token");//Gettingn the token from localStorage!1
      if(!token){
        return; //If user is not logged in, not data is saved into local storage.
      }
      const response= await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key="+API_KEY,{
      idToken: token //Always needed to be true.
        });
        console.log(response);
        dispatch({
            type: "LOGIN",
            payload: {
              idToken:token,
              localId: response.data.users[0].localId,
              ...response.data
            }
        })
        return callback(response.data);
    }
    catch(error){
        console.log(error.response);
        return callback({
          error: true, 
          response: error.response
        })
    }
  }    
}


export const logout = () => {
     return dispatch =>{
      localStorage.removeItem("token");
      dispatch({
        type: "LOGOUT"
      })
     }
}     