/*This file is used to save all the products displays in the page.*/
import Listitems from "../Listitems";
import {useState, useEffect} from 'react';
 import axios from 'axios';
import Loader from "../UI/Loader";
// import Form from "./Form";

const Product = ({onAddItems, onRemoveItems}) => {

 const [items, setItems]=useState([]);
 const [loader, setLoader] = useState(true);//Initially it will be displayed
 const [presentItems, setPresentItems] = useState([]);

  
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
         quantity:0, //Creating the quantity attribute and setting the quantity to '0'.
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

const handleAddItmes= id =>{
    //  if(presentItems.indexOf(id)> -1){
    //   return;
    //  }
    //  setPresentItems([...presentItems, id]);//Adds the item to the list of present items
    //  onAddItems();//Increases the count of present items on add cart button
    let data=[...items];
    let index=data.findIndex(item => item.id===id)
    data[index].quantity+=1;

    setItems([...data]);//Setting up updated att. to the items.
    onAddItems(data[index]);//Calling the add to cart fun. along with item itself.

  }
const handleRemoveItmes= id =>{
    //  let index= presentItems.indexOf(id);//"indexOf" returns the index of the argument given.
    //  if(index>-1){//If index is 0 or above means item was added to the cart
    //   let items=[...presentItems];
    //   items.splice(index, 1);
    //   setPresentItems(items);
    //   onRemoveItems();
    //  }
    let data=[...items];
    let index=data.findIndex(item => item.id===id)
    if(data[index].quantity!== 0){ data[index].quantity-=1;

    setItems([...data]);
    onRemoveItems(data[index]);//Calling the add to cart fun. along with item itself.
    }
  }
  return (
    <>
      <div className={"product-wrapper"}>
              <div className="product-list--wrapper">
                {
                //  <Listitems  key={items} item={items} />,
                //   <Listitems key={items}  item={items} />,
                //   <Listitems key={items}  item={items} />
                items.map(item =>{
                  return( <Listitems onAdd={handleAddItmes} onRemove={handleRemoveItmes} item={item} key={item.id} updateItemTitle={updateItemTitle} /> );
                        })
                }
              </div>
      </div>
      {loader && <Loader/>}
      </>

  )
}

export default Product;
