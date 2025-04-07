import {toast} from 'react-hot-toast'

import { settingsEndpoints } from '../apis';
import { apiConnector } from '../apiConnector';
import { setUser } from "../../slices/profileSlice"
import { logout } from './authAPI';


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints

// Update the user's display picture on the server.
export function updateDisplayPicture(token, formData){
    // A FormData object containing the file (image) to upload as the new display picture.

    return async (dispatch) => {

        // The toastId is stored for later use to dismiss the toast when the operation completes.
        const toastId = toast.loading("Loading");

        try{
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API, //URL: UPDATE_DISPLAY_PICTURE_API (endpoint for updating the display picture).
                formData, //which contains the image file data.
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, //passes the user's token for API authentication.
                }
            )
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
            )

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Display Picture Upedated Successfully!!")
            dispatch(setUser(response.data.data)) //Dispatch the setUser action to update the Redux store with the updated user data (response.data.data).


        } catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }
}


export function updateProfile(token, formData){
    //token: The user's authentication token for verifying their identity.
    //formData: The updated profile details submitted by the user.

    //dispatch: Used to dispatch Redux actions to update the state.
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")

        try{

            const response = await apiConnector("PUT", UPDATE_PROFILE_API,formData, {
                Authorization: `Bearer ${token}`
            } )
            console.log("UPDATE_PROFILE_API API RESPONSE............", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            const userImage = response.data.updatedUserDetails.image 
            ? response.data.updatedUserDetails.image 
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
            //If the updated profile includes a new image (image field), it is used.
            // Otherwise, a default profile image is generated using the user's firstName and lastName via the Dicebear avatar API.

            dispatch(
                setUser({...response.data.updatedUserDetails, image: userImage})
            )
            //setUser: Redux action to update the user details in the application's state.
            // The updated user details from the server (response.data.updatedUserDetails) are merged with the profile image and dispatched to the store.

            toast.success("Profile Updated Successfully!")
        } catch(error){
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
    }
}


export async function changePassword(token, formData){
    const toastId = toast.loading("Loadin...")

    try{
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
            Authorization : `Bearer ${token}`,
        })
        console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Password Changed Successfully!")

    } catch(error){
        console.log("CHANGE_PASSWORD_API API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")

        try{

            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization : `Bearer ${token}`,
            })
            console.log("DELETE_PROFILE_API API RESPONSE............", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Profile Deleted Successfully!")
            dispatch(logout(navigate))

        } catch(error){
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }

        toast.dismiss(toastId)
    }
}

