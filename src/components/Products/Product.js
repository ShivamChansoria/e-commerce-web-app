/*This file is used to save all the products displays in the page.*/
import Listitems from "../Listitems";
import {useState, useEffect} from 'react';
 import axios from 'axios';
import Loader from "../UI/Loader";
// import Form from "./Form";

const Product = () => {

 const [items, setItems]=useState([]);
 const [loader, setLoader] = useState(true);//Initially it will be displayed

 

  
 useEffect(() => {
  // fetch("https://e-commerce-app-01-f2eae-default-rtdb.firebaseio.com/items.json")
  // .then((response) => {response.json()
  // .then((data)=> { console.log(data) })
  //    });
 
 async function fetchItems(){
  try{
    const response=await axios.get("https://e-commerce-app-01-f2eae-default-rtdb.firebaseio.com/items.json");
     //console.log(response);
     const data = response.data;//Getting data from response
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
        setLoader(false);
      }
    }
  
    fetchItems();
   }, []); 

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
