/*This file is used to save all the products displays in the page.*/
import Listitems from "../Listitems";
import {useState, useEffect} from 'react';
 import axios from 'axios';
// import Form from "./Form";

const Product = () => {

 const [items, setItems]=useState([]);
  
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
         id: index //Set id att. value as index in every data item.
       }
     })
      setItems(transformedData);
       }
      catch(error){
       console.log("Error: " + error);
       alert("An error occurred: " + error);
      }
    }
  
    fetchItems();
   }, []); 

const updateItemTitle= async (itemID) => {
      let iD=itemID;
       console.log("Item with the ID ", {itemID});
       console.log(itemID);
      // await axios.patch("https://e-commerce-app-01-f2eae-default-rtdb.firebaseio.com/items/${itemID}.json");
}

  return (
      <div className={"product-wrapper"}>
              <div className="product-list--wrapper">
                {
                //  <Listitems  key={items} item={items} />,
                //   <Listitems key={items}  item={items} />,
                //   <Listitems key={items}  item={items} />
                items.map(item =>{
                  return( <Listitems item={item} key={item.id} updateItemTitle={updateItemTitle} /> );
                        })
                }
              </div>
      </div>
  )
}

export default Product;
