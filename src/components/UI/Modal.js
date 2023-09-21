//FOr implementing the Modal(display) of the items
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {Backdrop} from "./Loader";

const Modal= ({ onClose, children }) => {
    return(
        <Fragment>{
        ReactDOM.createPortal(
           <Fragment>
            <Backdrop props={onClose}/>
            <div className='modal'>
              <button type="close" className='' onClick={onClose}>X</button>
              <div className='content'>{children}</div> {/*  Here "children" are the data provided under the chil component b/w closing and the opening tag. */}
            </div>
           </Fragment>
                ,
            document.getElementById("modal-root")
        )
        }  </Fragment>
        
    )
};

export default Modal;
