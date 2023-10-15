/*This file is used to save all the products displays in the page.*/
import Listitems from "../Listitems";
import {useState, useEffect} from 'react';
 import axios from 'axios';
import Loader from "../UI/Loader";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Form from "./Form";

const Product = () => {

 const [items, setItems]=useState([]);//Used to store all the products in the array object.
 const [loader, setLoader] = useState(true);//Initially loader will be displayed
 const params = useParams();
 const navigate = useNavigate();
 const {search} =useLocation();
 const queryParams = new URLSearchParams(search).get("search"); // Searches the parameters given to the "search" attibtion
 
const handleNotFound = () => {
  navigate("/404");
  
}


// console.log(params);
 useEffect(() => {
  // fetch("https://e-commerce-app-01-f2eae-default-rtdb.firebaseio.com/items.json")
  // .then((response) => {response.json()
  // .then((data)=> { console.log(data) })
  //    });
 
 async function fetchItems(){
  try{
 
    let slug = "items.json";
    if(params.category){
      slug = "items-"+params.category+".json";//slug= items-category-1.json
    }
    if(queryParams){
      slug += "?search="+queryParams; //Searches for items searched in url search params.
    }
    const response=await axios.get("https://e-commerce-app-01-f2eae-default-rtdb.firebaseio.com/"+slug);
     //console.log(response);
     const data = response.data;//Getting data from response
     if(!data){ // If there is no data available to the server for the req.
      handleNotFound();
      return;
     }
     const transformedData = data.map((item, index) => {
     
       return{ //Returned by every item call 
         ...item, 
        //  quantity:0, //Creating the quantity attribute and setting the quantity to '0'.
         id: index //Set id att. value as index in every data item.
       }
     })
      setItems(transformedData);
       }
      catch(error){
       console.log("Error: " + error);
       alert("An error occurred: " + error);
      }
      finally{
        setLoader(false);//When the asynchronous loading is done(failed/success) set the loader to false.
      }
    }
  
    fetchItems();
    return () => {
      setItems([]);
      setLoader(true);
    }
   }, [params.category, queryParams]); 

const updateItemTitle= async (itemID) => {
      
      //  console.log("Item with the ID  {itemID}");
       console.log(itemID);
       try{
      await axios.patch('https://e-commerce-app-01-f2eae-default-rtdb.firebaseio.com/items/'+(itemID)+'.json', {
        title:"Crunchy Fruit & Nut Cookies"
      });
    }
    catch(error){
      console.log("Error:", error);
      alert("An error occured!!");
    }
}


  return (
    <>
      <div className={"product-wrapper"}>
              <div className="product-list--wrapper">
                {
                
                items.map(item =>{
                  return( <Listitems  item={item} key={item.id} updateItemTitle={updateItemTitle} /> );
                        })
                }
              </div>
      </div>
      {loader && <Loader/>}
      </>

  )
}

export default Product;
