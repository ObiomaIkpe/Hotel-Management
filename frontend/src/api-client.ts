import { SingInFormData } from './components/SignIn';
import {registerFormData} from './pages/Register';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async(formData: registerFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message)
    }
};


export const signIn = async (formData: SingInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    });
    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message);
    };
    return body;
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });

if(!response.ok){
    throw new Error("token invalid");
};

return response.json();
};

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: 'include',
        method: "POST"
    });
    if(!response.ok){
        throw new Error("Error during sign out");
    };
};

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData
    });

    if(!response.ok){
        throw new Error("Failed to add hotel!")
    }

    return response.json();
}