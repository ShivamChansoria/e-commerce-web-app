//For having the Forms in our website
const Form= (props) =>{
    
    return(
   

        <form onSubmit={() =>{}}>
          <h2>Item Card Details</h2>
          <div className={"input-field"}>
            <input 
            name="title"
            type="text"
            placeholder="Enter title"
            value={props.item.title}
            onChange={props.onChangeInput}
            />
          </div>
          <div className={"input-field"}>
            <input 
            name="price"
            type="number"
            placeholder="Enter price"
            value={props.item.price}
            onChange={props.onChangeInput}
            />
          </div>
          <div className={"input-field"}>
            <input 
            name="disPrice"
            type="number"
            placeholder="Enter discounted price"
            value={props.item.disPrice}
            onChange={props.onChangeInput}
            />
          </div>
          <div className={"input-field"}>
            <input 
            name="thumbnail"
            type="text"
            placeholder="Enter Thumbnail"
            value={props.item.thumbnail}
            onChange={props.onChangeInput}
            />
          </div>
          <div className="submit-wrap">
            <button type="submit" >Update</button>
          </div>
        </form>
      
    )
};
export default Form;