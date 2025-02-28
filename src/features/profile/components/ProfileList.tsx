import { useSelector } from "react-redux"
import { User } from "../types/user"
import React from "react"

interface user {
    user: {
        defaultState: User
    }
}

const ProfileComponent = () => {
    const user = useSelector((state: user) => state.user.defaultState)
    console.log(user);
    
    return (
        <>
            {
                user && 
                <div>
                    <div>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <p>{user.lastName}</p>
                    </div>
                    <div>
                        <p>{user.phone}</p>
                    </div>
                    <span>{user.email}</span>
                </div>
            }
        </>
    )
}

export default ProfileComponent;