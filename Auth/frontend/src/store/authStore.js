/* 
zustand is a state management library 
which is basically used to manage all states and api routes to backend through this.
this is similar to redux 
global state management solution

*/

import { create } from "zustand"
import axios from "axios"

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:1972/api" : "/api"
const Customer_URL = "http://localhost:1972/api/consumer"

axios.defaults.withCredentials = true


export const useAuthStore = create((set) => ({
    user: {},
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
    mechanic: {},
    bill: [],
    shop: [],
    book: [],
    comments: [],
    customerDetail: [],
    nearShop: [],
    // mapDetail : {},



    customerRequests: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/mechanic/request`)

            set({
                book: response.data.customerRequest,
                customerDetail: response.data.customerDetail,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching customer data", // shop data?
                isLoading: false
            })
            throw error
        }

    },

    fetchNearByShops: async (userLong, userLat) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/consumer/nearbyShop`, { userLong, userLat })

            set({
                nearShop: response.data.shopDetail,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching customer data", // shop data?
                isLoading: false
            })
            throw error
        }
    },

    // fetchMapRoute : async(user,shop)=>{
    //     set({ isLoading: true, error: null , mapDetail : null })
    //     try {
    //         const response = await axios.post(`${API_URL}/consumer/get-route`,{user,shop})

    //         if (!response.data) {
    //             throw new Error("Invalid response format from server");
    //         }

    //         const routeData = response.data;

    //         set({
    //             mapDetail: routeData,
    //             isAuthenticated: true,
    //             isLoading: false,
    //             error: null
    //         });

    //         // return response.data.mapDetail;
    //         return routeData
    //     } catch (error) {
    //         const errorMessage = error.response?.data?.message || error.message || "Error in finding route";
    //         set({
    //             error: errorMessage,
    //             isLoading: false,
    //             mapDetail: null
    //         });
    //         throw new Error(errorMessage);
    //     }
    // },
    shopDetail: async () => {
        set({ isLoading: true, error: null })

        try {
            // const response = await axios.get(`http://localhost:1972/api/consumer/view-bill/${id}`)
            const response = await axios.get(`${API_URL}/consumer/shoplist`)

            set({
                shop: response.data.shopList,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching invoice data", // shop data?
                isLoading: false
            })
            throw error
        }

    },

    shopRegistration: async () => {
        set({ isLoading: true, error: null })

        try {
            // const response = await axios.get(`http://localhost:1972/api/consumer/view-bill/${id}`)
            const response = await axios.get(`${API_URL}/mechanic/getMechanicDeatil`)

            set({
                mechanic: response.data.mechanic,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching mechanic data", // shop data?
                isLoading: false
            })
            throw error
        }

    },
    updateAcceptButton: async (id) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.patch(`${API_URL}/mechanic/accept/${id}`)
            if (response.data && response.data.message) {
                set({
                    message: response.data.message,
                    isAuthenticated: true,
                    isLoading: false
                })
                return response.data
            }
            throw new Error('Invalid response format')
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Error accepting request"
            set({
                error: errorMessage,
                isLoading: false
            })
            throw new Error(errorMessage)
        }
    },
    getPendingList: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/mechanic/pending`)

            set({
                book: response.data.bookSlot,
                customerDetail: response.data.customerDetail,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching mechanic data", // shop data?
                isLoading: false
            })
            throw error
        }

    },
    getCompletedList: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/mechanic/completed `)

            set({
                book: response.data.bookSlot,
                customerDetail: response.data.customerDetail,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching mechanic data", // shop data?
                isLoading: false
            })
            throw error
        }

    },
    getBillData: async (id, bookslotId) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/mechanic/bill/${id}`, { bookslotId })

            set({
                shop: response.data.shopDetail,
                book: response.data.bookSlot,
                user: response.data.customerDetail,
                mechanic: response.data.mechanicDetail,
                bill: response.data.billForm,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching mechanic data", // shop data?
                isLoading: false
            })
            throw error
        }

    },

    addBillData: async (customerId, registerNumber, formData, bookslotId) => {
        set({ isLoading: true, error: null })

        try {
            const Decription = formData.description
            const totalAmount = formData.totalDue
            const response = await axios.post(`${API_URL}/mechanic/bill `, { customerId, Decription, totalAmount, registerNumber, bookslotId })

            set({
                message: response.data.message || "Bill created successfully",
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in creating bill",
                isLoading: false
            })
            throw error
        }
    },
    updateCompleteButton: async (id) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.patch(`${API_URL}/mechanic/completed/${id}`)

            set({
                message: response.data.message,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching mechanic data", // shop data?
                isLoading: false
            })
            throw error
        }

    },

    addshopRegistration: async (ownerName, mobileNumber, formData) => {
        set({ isLoading: true, error: null })

        try {
            const shopname = formData.shopname
            const description = formData.descaboutshop
            const serviceAvailable = []
            if (formData.bike) {
                serviceAvailable.push('Bike')
            }
            if (formData.car) {
                serviceAvailable.push('Car')
            }
            const address = formData.addr
            const timings = formData.workingHours
            const location = formData.location
            const response = await axios.post(`${API_URL}/mechanic/addShop`, { shopname, ownerName, mobileNumber, description, serviceAvailable, address, timings, location })

            set({
                message: response.data.message,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching mechanic data",
                isLoading: false
            })
            throw error
        }

    },
    shopDetailById: async (id) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/consumer/shoplist/${id}`)

            set({
                shop: response.data.shopList,
                comments: response.data.reviews,
                mechanic: response.data.mechanicDeatil,
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
    pendingShopList: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/consumer/pending`)
            set({
                shop: response.data.shopDetail,
                book: response.data.bookSlot,
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
    completedShopList: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/consumer/completed`)
            set({
                shop: response.data.shopDetail,
                book: response.data.bookSlot,
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
    getServiceHistoryCustomer: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/consumer/service-history`)
            set({
                shop: response.data.shopDetail,
                book: response.data.bookSlot,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching data",
                isLoading: false
            })
            throw error
        }

    },
    getServiceHistoryMechanic: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/mechanic/service-history`)
            set({
                book: response.data.bookSlot,
                customerDetail: response.data.customerDetail,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in fetching data",
                isLoading: false
            })
            throw error
        }

    },
    bookFormDetail: async (id) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/consumer/book-slot/${id}`)

            set({
                shop: response.data.shopDetail,
                user: response.data.customerDetail,
                mechanic: response.data.mechanicDetail,
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
    serviceFeedback: async (mechanicId, bookslotId) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/consumer/getfeedback`, { mechanicId, bookslotId })

            set({
                shop: response.data.shopDetail,
                user: response.data.customerDetail,
                book: response.data.bookFormDetail,
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

    updatePay: async (mechanicId, bookslotId) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.patch(`${API_URL}/consumer/updatePay`, { mechanicId, bookslotId })

            set({
                message: response.data.message,
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

    getFeedbacksForMechanic: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_URL}/mechanic/comments`)

            set({
                comments: response.data.comments,
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


    addServiceFeedback: async (mechanicId, customerName, feedback, registerNumber, vehicleType, bookslotId) => {
        set({ isLoading: true, error: null })

        try {
            const title = feedback.title
            const description = feedback.description
            const response = await axios.post(`${API_URL}/consumer/feedback`, { mechanicId, customerName, title, description, registerNumber, vehicleType, bookslotId })

            set({
                message: response.data.message,
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
    addBookFormDetail: async (mechanicId, customerName, formData,shopName) => {
        set({ isLoading: true, error: null })

        try {
            const vehicleType = formData.vehicle
            const registerNumber = formData.regno
            const complaintDescription = formData.complaint
            const bookDate = new Date(formData.regdate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Kolkata"
            })
            const bookTime = new Date(formData.regtime).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata"
            })

            const response = await axios.post(`${API_URL}/consumer/book-slot`, { mechanicId, customerName, vehicleType, registerNumber, complaintDescription, bookDate, bookTime,shopName})

            set({
                message: response.data.message,
                isAuthenticated: true,
                isLoading: false
            })

        } catch (error) {
            set({
                error: "Error in booking",
                isLoading: false
            })
            throw error
        }
    },

    invoice: async (mechanicId, bookslotId) => {
        set({ isLoading: true, error: null })

        try {
            // const response = await axios.get(`http://localhost:1972/api/consumer/view-bill/${id}`)
            const response = await axios.post(`${API_URL}/consumer/view-bill`, { mechanicId, bookslotId })

            set({
                user: response.data.customerDetail,
                mechanic: response.data.mechanicDetail,
                book: response.data.bookSlot,
                shop: response.data.shopDetail,
                bill: response.data.billDetail,
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

            if (role === mechanic) {
                set({
                    mechanic: response.data.user,
                    isAuthenticated: true,
                    isLoading: false
                })
            }
            else {
                set({
                    user: response.data.user,
                    isAuthenticated: true,
                    isLoading: false
                })
            }

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
                mechanic: response.data.user,
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

            // return response.data
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
                mechanic: response.data.user,
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