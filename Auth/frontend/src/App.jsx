import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { LocationProvider } from './context/LocationContext'

import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import DashBoardPage from "./pages/DashBoardPage"
import ForgetPasswordPage from "./pages/ForgetPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"

import { useAuthStore } from "./store/authStore.js"
import Homepage from "./pages/Homepage.jsx"
import Bill from "./pages/Mechanic/Bill.jsx"
import BookingForm from "./pages/Customer/BookForm.jsx"
import CustomerDashboard from "./pages/Customer/Dashboard.jsx"
import MechanicDashboard from "./pages/Mechanic/Dashboard.jsx"
import Invoice from "./pages/Customer/Invoice.jsx"
import MechanicRegistration from "./pages/Mechanic/MechanicRegister.jsx"
import ShopDetails from "./pages/Customer/ShopDetails.jsx"
import ServiceFeedback from "./pages/Customer/ServiceFeedback.jsx"
import MechanicFeedback from "./pages/Mechanic/MechanicFeedback.jsx"
import PaymentPage from "./pages/Customer/PaymentPage.jsx"

//protecting routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user.isverified) {
    return <Navigate to="/verify-email" replace />
  }

  return children
}


//redirecting the authenticated user to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />
  // }
  // else
   if (isAuthenticated && user && user.isverified && user.role.toLowerCase() === "customer") {
    return <Navigate to="/dashboardcustomer" replace />
  }
  else if (isAuthenticated && user && user.isverified && user.role.toLowerCase() === "mechanic") {
    return <Navigate to="/dashboardmechanic" replace />
  }

  return children
}


function App() {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <LocationProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-700 to-slate-700 flex items-center justify-center relative overflow-hidden">
        <Routes>
          <Route path="/" element={
            <RedirectAuthenticatedUser>
              <Homepage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/bookform/:mechanicId" element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          } />
          <Route path="/user-profile" element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboardcustomer" element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/invoice/:invoiceId" element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          } />
          <Route path="/shopdetails/:mechanicId" element={
            <ProtectedRoute>
              <ShopDetails />
            </ProtectedRoute>
          } />
          <Route path="/servicefeedback/:mechanicId" element={
            <ProtectedRoute>
              <ServiceFeedback />
            </ProtectedRoute>
          } />

          <Route path="/paymentPage/:mechanicId" element={
            <ProtectedRoute>
              <PaymentPage/>
            </ProtectedRoute>
          } />

          <Route path="/billmechanic/:customerId" element={
            <ProtectedRoute>
              <Bill />
            </ProtectedRoute>
          } />
          <Route path="/dashboardmechanic" element={
            <ProtectedRoute>
              <MechanicDashboard />
            </ProtectedRoute>
          } />
          <Route path="/mechanicregestration" element={
            <MechanicRegistration />
          } />
          <Route path="/mechanicfeedback" element={
            <ProtectedRoute>
              <MechanicFeedback />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/login" element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/verify-email" element={
            <RedirectAuthenticatedUser>
              <EmailVerificationPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/forgot-password" element={
            <RedirectAuthenticatedUser>
              <ForgetPasswordPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
        <Toaster />
      </div>
    </LocationProvider>
  )
}

export default App
