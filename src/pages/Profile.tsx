import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { request } from "../Requests/Requests";
import { loadUser } from "../features/profile/store/user";
import ProfileComponent from "../features/profile/components/ProfileList";
import React from "react";


const ProfilePage = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        try {
            request.get('/profile')
            .then((res) => dispatch(loadUser(res.data)))
            .catch(error => {
                console.log(error); 
            })
        } catch(error) {
            throw new Error ('Error')
        }
        /* eslint-disable-next-line */
    }, [])

    return (
        <ProfileComponent />
    )
}

export default ProfilePage;