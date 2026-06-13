
import { serverUrl } from "./baseUrl"
import { commonAPI } from "./commonApi"

//register


export const registerAPI =async(reqbody)=>{
 return await commonAPI('POST',`${serverUrl}/user/register`,reqbody,"")
}
//login
export const loginAPI = async(reqbody)=>{
    return await commonAPI('POST',`${serverUrl}/user/login`,reqbody,"")
}
//booking
export const bookAPI = async(reqbody,reqHeader)=>{
    return await commonAPI('POST',`${serverUrl}/user/booking`,reqbody,reqHeader)
}
//getbooking
export const getUserBookingAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${serverUrl}/user/my-bookings`,"",reqHeader)
}
//get-limited-bookings on service page
export const getLimitBookingAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${serverUrl}/limit/my-bookings`,"",reqHeader)
}
//to delete or cancel booking
export const deleteBookingAPI =async(id,reqHeader)=>{
     return await commonAPI('DELETE',`${serverUrl}/delete-booking/${id}`,{},reqHeader)
}
//to update a profile
export const updateProfileAPI = async(reqbody,reqHeader)=>{
    return await commonAPI('PUT',`${serverUrl}/update-profile`,reqbody,reqHeader)
}
//complaint
export const complaintAPI=async(reqbody,reqHeader)=>{
    return await commonAPI('POST',`${serverUrl}/complaint`,reqbody,reqHeader)
}
//ai
export const askAIAPI = async(reqbody)=>{
    return await commonAPI('POST',`${serverUrl}/ask-ai`,reqbody)
}