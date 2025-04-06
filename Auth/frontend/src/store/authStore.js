/* 
zustand is a state management library 
which is basically used to manage all states and api routes to backend through this.
this is similar to redux 
global state management solution

*/

import { create } from "zustand"
import axios from "axios"


const API_URL = import.meta.env.MODE === "development" ? "http://localhost:1972/api" : "/api/auth"
const Customer_URL = "http://localhost:1972/api/consumer"

axios.defaults.withCredentials = true


export const useAuthStore = create((set) => ({
    user: {},
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
    mechanic : {},
    bill : [],
    shop : [],
    book : [],


    shopDetail : async()=>{
        set({ isLoading: true, error: null })

        try {
            // const response = await axios.get(`http://localhost:1972/api/consumer/view-bill/${id}`)
            const response = await axios.get(`${API_URL}/consumer/shoplist`)

            set({
                shop : response.data.shopList,
                isAuthenticated: true,
                isLoading: false
            })
            
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching invoice data",
                isLoading: false
            })
            throw error
        }

    },
    shopDetailById : async(id)=>{
        set({ isLoading: true, error: null })

        try {
            // const response = await axios.get(`http://localhost:1972/api/consumer/view-bill/${id}`)
            const response = await axios.get(`${API_URL}/consumer/shoplist/${id}`)

            set({
                shop : response.data.shopDetail,
                book : response.data.bookSlot,
                isAuthenticated: true,
                isLoading: false
            })
            
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching invoice data",
                isLoading: false
            })
            throw error
        }

    },

    invoice : async(id)=>{
        set({ isLoading: true, error: null })

        try {
            // const response = await axios.get(`http://localhost:1972/api/consumer/view-bill/${id}`)
            const response = await axios.get(`${API_URL}/consumer/view-bill/${id}`)

            set({
                user: response.data.customerDetail,
                mechanic : response.data.mechanicDetail,
                book : response.data.bookSlot,
                shop : response.data.shopDetail,
                bill : response.data.billDeatil,
                isAuthenticated: true,
                isLoading: false
            })
            
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching invoice data",
                isLoading: false
            })
            throw error
        }
    },

    signup: async (email, password, name, role, mobileNumber) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/auth/signup`, { email, password, name, role, mobileNumber })

            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response.data.message || "Error in signing up",
                isLoading: false
            })
            throw error
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password })

            set({
                user: response.data.user,
                isLoading: false,
                isAuthenticated: true,
                error: null
            })
        } catch (error) {
            set({
                error: error.response.data.message || "Error in logging in",
                isLoading: false
            })
            throw error
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/auth/logout`)
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            })
            return response.data
        } catch (error) {
            set({
                error: error.response.data.message || "Error in logging out",
                isLoading: false
            })
            throw error
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/auth/verify-email`, { code })

            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            })

            return response.data
        } catch (error) {
            set({
                error: error.response.data.message || "Error in signing up",
                isLoading: false
            })
            throw error
        }
    },

    checkAuth: async () => {
        // await new Promise((resolve)=>setTimeout(resolve,5000))
        set({ isCheckingAuth: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/auth/check-auth`)

            set({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false
            })
        } catch (error) {
            set({
                error: error.response.data.message || "Error in signing up",
                isCheckingAuth: true,
                isAuthenticated: false,
                isLoading: false
            })
            throw error
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password`, { email })

            set({
                message: response.data.message,
                isLoading: false
            })
        } catch (error) {
            set({
                error: error.response.data.message || "Error in sending forgot password mail",
                isLoading: false
            })
            throw error
        }
    },
    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password })

            set({
                message: response.data.message,
                isLoading: false
            })
        } catch (error) {
            set({
                error: error.response.data.message || "Error in sending reset password mail",
                isLoading: false
            })
            throw error
        }
    }


}))