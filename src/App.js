import { useEffect } from "react";
import Auth from "./components/Auth";
import Header from "./components/Layouts/Header";
import Subheader from "./components/Layouts/Subheader";
import Products from "./components/Products/Product";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoggedIn } from "./actions/auth";
import { ToastContainer } from "react-toastify";

const App = () => {

const dispatch = useDispatch();
useEffect(() =>{
     dispatch(checkIsLoggedIn(() =>{}))
},
[]);
const authState = useSelector(state => state.auth); // because the redux store contains user ID yoken in auth

  return (
    <div >
      <ToastContainer position="top-center" newestOnTop/>
      <Header  />
      <Subheader/>
      <Routes>  {/* Now used as <Switch> on updated versions. */}
      {
        !authState.idToken &&
        <>
        <Route path="/login"  element={<Auth />}  />
        <Route path="/signup"  element={<Auth />}  /> 
        </>
        }
        <Route  path="/login"element ={<Navigate to='/' />} />
        <Route  path="/signup"element ={<Navigate to='/' />} />
        <Route path="/404"   
        element={
          <h1>Not Found !!!</h1>
        }
                 />
       <Route path="/:category?"  element={<Products  />} />
       <Route  path="*"element ={<Navigate to='/404' />} />
      </Routes>
    </div>
  );
}

export default App;
