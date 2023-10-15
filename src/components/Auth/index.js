// API Key: AIzaSyCyBBWyXKRzJszYfCtTfigy6-nVKmyZ18Q
import React from "react";
import { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import Loader from "../UI/Loader";
import { loginWithEP, signupWithEP } from "../../actions/auth";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Auth = () =>{
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const location= useLocation();
    const [loader, setLoader] = useState(false);
    const [details, setDetails] = useState({
        email:"",
        password:""
    })
   
    
    const handleInput = (e) =>{
             setDetails({
                ...details,
                [e.target.name] : e.target.value
             })
    }

useEffect(() =>{
  return () =>{
    setLoader(false);
    setDetails({
        email:"",
        password:""
    })
  }
},[]);

const notify = (message) =>{
    toast(message);
}

    const handeSubmission = (e) => {
        e.preventDefault();
        console.log(details);
        if(location.pathname === "/signup"){
            setLoader(true);
            dispatch(signupWithEP(details, data=>{
                if(data.error){
                    // console.log(data.response.data.error.message);
                //    alert(data.response.data.error.message || "Something went wrong!!");
                   notify(data.response.data.error.message || "Something went wrong!!"); 
            }
                else{
                    notify("Successfully Signed Up !");
                    console.log("Successfully Signed Up !");
                    navigate("/", {replace: true});
                }
                setLoader(false);
            }));
        }      
        if(location.pathname === "/login"){
            setLoader(true);
            dispatch(loginWithEP(details, data=>{
                if(data.error){
                //    alert(data.response.data.error.message || "Something went wrong!!");
                   notify(data.response.data.error.message || "Something went wrong!!");
                }
                else{
                    notify("Successfully Logged In !");
                    console.log("User Successfully Logged In !");
                    navigate("/", {replace: true});
                }
                setLoader(false);
            }));
        }
    }

    

    return(
        <Fragment>
        <div className="auth-container">
            <div className="auth-container--box">
                <div className="tab-selector">
                  <NavLink  exact to={"/login"}>  <h3>Login</h3> </NavLink>
                  <NavLink  exact to={"/signup"}> <h3>SignUp</h3> </NavLink>
                </div>
                <form onSubmit={handeSubmission} >
                    <div className="input-wrap" >
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter Email" onChange={handleInput}/>
                    </div>
                    <div className="input-wrap">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter Password" onChange={handleInput} />
                    </div>
                    <div className="button-wrap">
                        { location.pathname==="/signup"? 
                        <>
                            <button type="submit" className="login-btn" >
                            Signup
                            </button>
                           </>
                            :
                            <>
                            <button  type="submit" className="login-btn" >
                            Login
                        </button>
                        </>  }
                        
                    </div>
                    
                </form>
            </div>
        </div>
        { loader && <Loader /> }
        </Fragment>
    )

};

export default Auth;