//File for the user profile.

import { Fragment, useState } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import userImage from "./user_image.jpeg"

const UserProfile = () =>{
const [showUserP, setShowUserP] = useState(false);
const userDetails = useSelector((state) => state.auth);
const userLocalId = useSelector((state) => state.auth.localId);
const userEmail = localStorage.getItem("email");
console.log(userEmail);

const handleUserP = () =>{
     setShowUserP(!showUserP);
}


console.log();


    return(
        <Fragment>
                <button onClick={handleUserP}title="User Profile" className="material-icons">account_circle</button>
                 {  showUserP &&
                 <Modal onClose={handleUserP}>
                    <div className="user-profile">
                        <span className="user-image">
                            <img src={userImage} alt="user-profile-image" />
                        </span>
                    <span className="user-details">
                        <h2>User Details </h2>
                        </span>
                    <bold>
                        <h3>  Email:  </h3>
                        </bold>
                           <span> 
                            <h4>
                                {userEmail}
                            </h4>
                            </span>
                            <bold>
                        <h3>  Local ID:  </h3>
                        </bold>
                           <span> 
                            <h4>
                                {userLocalId}
                            </h4>
                            </span>
                    </div>
                    </Modal>
                 }
        </Fragment>
    );
};

export default UserProfile;