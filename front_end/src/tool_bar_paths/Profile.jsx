import React from "react";
import './styles/Profile.css'



function Profile(){
    return(
        <div className="profile-body">
            <div className="user-details-body">
                <div className="user-details">
                    <div className="profile-photo">
                        IMAGE HERE
                    </div>
                    <div className="user-information">
                        <div className="user-inf-row1">
                            <p className="username">Username</p>
                            <p className="followers">followers: 532</p>
                            <p className="following">following: 739</p>
                        </div>
                        <div className="user-inf-row2">
                            <p>alkthlkahope kslf lkaj. lksjtl nlsut lsi sl
                             l;joiew slk sld els oiwyh sow owjsalkdhf woa owjsl
                             al alskdhla laskj ow slkw woiuesd olasdlk awoih slkd 
                             </p>
                        </div>
                        <div className="user-inf-row3">
                            <div className="edit-profile">edit profile</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line-body">
                <hr className="line"/>
            </div>
            <div className="user-content">
                This is something else
            </div>
        </div>
    )
}

export default Profile;