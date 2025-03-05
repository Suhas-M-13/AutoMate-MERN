/* 
zustand is a state management library 
which is basically used to manage all states and api routes to backend through this.
this is similar to redux 
global state management solution

*/

import {create} from "zustand"
import axios from "axios"


const API_URL = import.meta.env.MODE === "development" ? "http://localhost:1972/api/auth" : "/api/auth"

axios.defaults.withCredentials = true


export const useAuthStore = create((set) => ({
    user : null,
    isAuthenticated : false,
    error : null,
    isLoading : false,
    isCheckingAuth : true,
    message : null,

    signup : async(email,password,name,role,mobileNumber)=>{
        set({isLoading : true,error : null})

        try {
            const response = await axios.post(`${API_URL}/signup`,{email,password,name,role,mobileNumber})

            set({
                user : response.data.user,
                isAuthenticated : true,
                isLoading : false
            })

        } catch (error) {
            set({
                error : error.response.data.message || "Error in signing up",
                isLoading : false
            })
            throw error
        }
    },

    login : async(email,password)=>{
        set({isLoading : true,error : null})

        try {
            const response = await axios.post(`${API_URL}/login`,{email,password})

            set({
                user : response.data.user,
                isLoading : false,
                isAuthenticated : true,
                error : null
            })
        } catch (error) {
            set({
                error : error.response.data.message || "Error in logging in",
                isLoading : false
            })
            throw error
        }
    },

    logout : async()=>{
        set({isLoading : true,error : null})

        try {
            const response = await axios.post(`${API_URL}/logout`)
            set({
                user : null,
                isAuthenticated : false,
                isLoading : false,
                error : null
            })
            return response.data
        } catch (error) {
            set({
                error : error.response.data.message || "Error in logging out",
                isLoading : false
            })
            throw error
        }
    },

    verifyEmail : async(code)=>{
        set({isLoading : true,error : null})

        try {
            const response = await axios.post(`${API_URL}/verify-email`,{code})

            set({
                user : response.data.user,
                isAuthenticated : true,
                isLoading : false
            })

            return response.data
        } catch (error) {
            set({
                error : error.response.data.message || "Error in signing up",
                isLoading : false
            })
            throw error
        }
    },

    checkAuth : async()=>{
        // await new Promise((resolve)=>setTimeout(resolve,5000))
        set({isCheckingAuth : true,error : null})

        try {
            const response = await axios.get(`${API_URL}/check-auth`)

            set({
                user : response.data.user,
                isAuthenticated : true,
                isCheckingAuth : false
            })
        } catch (error) {
            set({
                error : error.response.data.message || "Error in signing up",
                isCheckingAuth : true,
                isAuthenticated : false,
                isLoading : false
            })
            throw error
        }
    },

    forgotPassword : async(email)=>{
        set({isLoading : true,error : null})

        try {
            const response = await axios.post(`${API_URL}/forgot-password`,{email})

            set({
                message : response.data.message,
                isLoading : false
            })
        } catch (error) {
            set({
                error : error.response.data.message || "Error in sending forgot password mail",
                isLoading : false
            })
            throw error
        }
    },
    resetPassword : async(token,password)=>{
        set({isLoading : true,error : null})

        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`,{password})

            set({
                message : response.data.message,
                isLoading : false
            })
        } catch (error) {
            set({
                error : error.response.data.message || "Error in sending reset password mail",
                isLoading : false
            })
            throw error
        }
    }


}))