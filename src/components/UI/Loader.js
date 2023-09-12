//Using this component to create Loading state components.

import  ReactDOM  from "react-dom";

export const Backdrop = ({props}) =>{ //Having background overlay.

  const handleClick = () =>{
    if(props.onClose){
      props.onClose();
    }
  }
  return(
  <div onClick={handleClick} className="loader-overlay"></div>
  )
}

const Loader = () => {
  
   return( 
    ReactDOM.createPortal(<>  
    <Backdrop /> 
    <div className="loading-dots">
      <div>Loading</div>
      <div className="loading-dots--dot"></div>
      <div className="loading-dots--dot"></div>
      <div className="loading-dots--dot"></div>
      <div className="loading-dots--dot"></div>
    </div>
   
   </>,
      document.getElementById("loader-root")
      )
     )
    };

export default Loader;