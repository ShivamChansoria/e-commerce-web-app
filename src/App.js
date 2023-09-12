import { useState } from "react";
import Header from "./components/Layouts/Header";
import Subheader from "./components/Layouts/Subheader";
import Products from "./components/Products/Product";


const App = () => {
   const [cartItems, setCartItems] = useState([]);

   const handleAdd = (item) =>{
     let items= [...cartItems];
     let index = items.findIndex(e => item.id===e.id);
     console.log(index);
     console.log(item.id);
     if(index>-1){
      items[index] = item;
     }
     else{
      items.push(item);
     }
     setCartItems([...items]);
     console.log(cartItems);
  }
   const handleRemove = (item) =>{
    let items= [...cartItems];
    let index = items.findIndex(i => i.id===item.id);
    if(items[index].quantity===0){
      items.splice(index, 1);
    }
    else{
      items[index] = item;
    }
    setCartItems([...items]);
  }

  return (
    <div >
      <Header count={cartItems.length} />
      <Subheader/>
      <Products onAddItems={handleAdd} onRemoveItems={handleRemove}/>
    </div>
  );
}

export default App;
